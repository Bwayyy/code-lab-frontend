import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  setDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { fireStore } from "../../firebase/firebaseApp";
import { RootState } from "../../store";
import { LiveCodingRoom } from "../../types/live-coding-types";
import useFirestoreRefPath from "../useFirestoreRefPath";
export default function useLiveCodingMutation() {
  const { getLiveCodingCollectionPath, getLiveCodingRepositoryCollectionPath } =
    useFirestoreRefPath();
  const currentWorkspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const create = async (entity: LiveCodingRoom) => {
    if (currentWorkspace) {
      const liveCodingCollection = collection(
        fireStore,
        getLiveCodingCollectionPath(currentWorkspace?.ref.path)
      );
      const docRef = await addDoc(liveCodingCollection, entity);
      const repoCollection = collection(
        fireStore,
        getLiveCodingRepositoryCollectionPath(docRef.path)
      );
      const newRepo = doc(repoCollection, "0");
      await setDoc(newRepo, {
        json: JSON.stringify([]),
      });
    }
  };
  const update = async (entity: LiveCodingRoom) => {
    if (currentWorkspace) {
      await setDoc(entity.ref, {
        name: entity.name,
        description: entity.description,
      });
    }
  };
  const remove = async (ref: DocumentReference) => {
    if (currentWorkspace) {
      await deleteDoc(ref);
    }
  };
  return { create, update, remove };
}
