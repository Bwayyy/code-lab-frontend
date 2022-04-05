import { message } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { firebaseStorage, fireStore } from "../../firebase/firebaseApp";
import { RootState } from "../../store";
import useFirebaseStoragePath from "../useFirebaseStoragePath";
import useFirestoreRefPath from "../useFirestoreRefPath";
import useUserData from "../useUserData";

export default function useAssignmentUpload() {
  const { getAssignmentSubmissionFolderPath } = useFirebaseStoragePath();
  const { getAssignmentSubmissionPath } = useFirestoreRefPath();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const { userData } = useUserData();
  const submitFiles = async () => {
    if (workspace && assignment && userData) {
      await removeExistingFiles();
      const folderPath = getAssignmentSubmissionFolderPath(
        workspace.id,
        assignment.id,
        userData.id
      );
      const promises = [];
      for (const file of files) {
        const storageRef = ref(firebaseStorage, folderPath + "/" + file.name);
        promises.push(uploadBytes(storageRef, file.originFileObj as Blob));
      }
      const responses = await Promise.all(promises).catch((err) => {
        message.error("Upload failed, please try again later.");
        removeExistingFiles();
      });
      if (responses) {
        await writeSubmissionRecordToDb(folderPath);
      }
      message.success("Submission Success!");
    }
  };
  const removeExistingFiles = async () => {
    if (workspace && assignment && userData) {
      const path = getAssignmentSubmissionFolderPath(
        workspace.id,
        assignment.id,
        userData?.id
      );
      const desertRef = ref(firebaseStorage, path);
      const listAllResult = await listAll(desertRef);
      const promises: Promise<void>[] = [];
      listAllResult.items.forEach((item) => {
        promises.push(deleteObject(item));
      });
      await Promise.all(promises);
    }
  };
  const writeSubmissionRecordToDb = async (folderPath: string) => {
    if (assignment && userData) {
      const submissionPath = getAssignmentSubmissionPath(assignment?.ref.path);
      const submissionDoc = doc(fireStore, submissionPath, userData.id);
      await setDoc(submissionDoc, {
        userName: userData.displayName,
        submitted_at: Timestamp.now(),
        folderPath,
      });
    }
  };
  return { files, setFiles, submitFiles };
}
