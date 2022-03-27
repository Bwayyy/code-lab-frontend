import { listAll, ref, StorageReference } from "firebase/storage";
import { useEffect, useState } from "react";
import { firebaseStorage } from "../../firebase/firebaseApp";
import { AssignmentSubmission } from "../../types/assignment-types";

export default function useAssignmentSubmissionFiles(
  submission?: AssignmentSubmission
) {
  const [submissionFiles, setSubmissionFiles] = useState<StorageReference[]>(
    []
  );
  useEffect(() => {
    const getFiles = async () => {
      if (submission?.folderPath) {
        const folderRef = ref(firebaseStorage, submission?.folderPath);
        const listAllResult = await listAll(folderRef);
        setSubmissionFiles(listAllResult.items);
      }
    };
    getFiles();
  }, [submission?.folderPath]);
  return { submissionFiles };
}
