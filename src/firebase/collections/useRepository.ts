import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { Snapshot } from "yjs";
import useFirestoreRefPath from "../../hooks/useFirestoreRefPath";
import { Repository } from "../../types/file-repository-types";
import { fireStore } from "../firebaseApp";

export default function useRepository() {
  const { workspaceId, liveCodingId } = useParams();
  const { getLiveCodingFileCollectionPath, getLiveCodingRepoItemPath } =
    useFirestoreRefPath();
  const [snapshot, loading, error] = useDocument(
    doc(
      fireStore,
      getLiveCodingRepoItemPath(workspaceId ?? "", liveCodingId ?? "")
    )
  );
  const repository: Repository = useMemo(
    () => (snapshot ? JSON.parse(snapshot?.data()?.json) : []),
    [snapshot]
  );
  const addFile = async () => {
    if (workspaceId && liveCodingId) {
      const fileCollectionPath = getLiveCodingFileCollectionPath(
        workspaceId,
        liveCodingId
      );
      const doc = await addDoc(collection(fireStore, fileCollectionPath), {
        content: "",
      });
      return doc;
    }
    return Promise.resolve();
  };
  const deleteFile = async (fileId: string) => {
    if (workspaceId && liveCodingId) {
      const collectionPath = getLiveCodingFileCollectionPath(
        workspaceId,
        liveCodingId
      );
      await deleteDoc(doc(fireStore, collectionPath, fileId));
    }
  };
  const saveRepository = async (repo: Repository) => {
    if (workspaceId && liveCodingId && snapshot) {
      await setDoc(snapshot.ref, { json: JSON.stringify(repo) });
    }
  };
  return { repository, loading, error, addFile, saveRepository, deleteFile };
}
