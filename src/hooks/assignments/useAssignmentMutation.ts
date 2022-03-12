import {
  addDoc,
  collection,
  deleteDoc,
  DocumentReference,
  setDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { fireStore } from "../../firebase/firebaseApp";
import { RootState } from "../../store";
import { Assignment } from "../../types/assignment-types";
import useFirestoreRefPath from "../useFirestoreRefPath";

export default function useAssignmentMutation() {
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const { getAssignmentPath } = useFirestoreRefPath();
  const create = async (data: Assignment) => {
    if (workspace) {
      const assignmentCol = collection(
        fireStore,
        getAssignmentPath(workspace.id)
      );
      const docRef = await addDoc(assignmentCol, data);
      return docRef;
    }
  };
  const update = async (data: Assignment) => {
    if (workspace) {
      await setDoc(data.ref, {
        name: data.name,
        objective: data.objective,
        deadline: data.deadline,
        maxScore: data.maxScore,
      });
    }
  };
  const remove = async (ref: DocumentReference) => {
    if (workspace) {
      await deleteDoc(ref);
    }
  };
  return { create, update, remove };
}
