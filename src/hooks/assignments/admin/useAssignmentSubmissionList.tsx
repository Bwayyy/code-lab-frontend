import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { fireStore } from "../../../firebase/firebaseApp";
import { RootState } from "../../../store";
import { AssignmentSubmission } from "../../../types/assignment-types";
import useRoomName from "../../collaborative-editing/useRoomName";
import useFirestoreRefPath from "../../useFirestoreRefPath";

export default function useAssignmentSubmissionList() {
  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const { getAssignmentSubmissionPath } = useFirestoreRefPath();
  const [value, loading, error] = useCollectionData(
    query(
      collection(
        fireStore,
        getAssignmentSubmissionPath(assignment?.ref.path ?? "")
      )
    ),
    { idField: "id", refField: "ref" }
  );
  const submissions = value?.map(
    (x) =>
      ({
        folderPath: x.folderPath,
        id: x.id,
        ref: x.ref,
        score: x.score,
        submitted_at: x.submitted_at,
        graded: x.graded,
        userName: x.userName,
      } as AssignmentSubmission)
  );
  return { submissions };
}
