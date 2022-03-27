import { collection, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { fireStore } from "../../firebase/firebaseApp";
import { RootState } from "../../store";
import { Assignment } from "../../types/assignment-types";
import useFirestoreRefPath from "../useFirestoreRefPath";

export default function useAssignments() {
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const { getAssignmentPath } = useFirestoreRefPath();
  const [snapshot] = useCollectionData(
    collection(fireStore, getAssignmentPath(workspace?.id ?? "")),
    { idField: "id", refField: "ref" }
  );
  const assignments = useMemo(
    () =>
      snapshot?.map((x) => {
        return {
          deadline: moment((x.deadline as Timestamp).toMillis()),
          id: x.id,
          name: x.name,
          ref: x.ref,
          maxScore: x.maxScore,
          objective: x.objective,
        } as Assignment;
      }),
    [snapshot]
  );
  return { assignments };
}
