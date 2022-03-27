import { doc } from "firebase/firestore";
import { useMemo } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { fireStore } from "../../firebase/firebaseApp";
import { RootState } from "../../store";
import { AssignmentSubmission } from "../../types/assignment-types";
import useFirestoreRefPath from "../useFirestoreRefPath";
import useUserData from "../useUserData";

export default function useAssignmentSubmission() {
  const { getAssignmentSubmissionPath } = useFirestoreRefPath();
  const { userData } = useUserData();

  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const submissionDocRef = doc(
    fireStore,
    getAssignmentSubmissionPath(assignment?.ref.path ?? "") + "/" + userData?.id
  );
  const [value, loading, _error] = useDocumentData(submissionDocRef, {
    idField: "id",
    refField: "ref",
  });
  const submission: AssignmentSubmission | undefined = useMemo(
    () =>
      value
        ? {
            id: value.id,
            ref: value.ref,
            folderPath: value.folderPath,
            graded: value.graded,
            score: value.score,
            submitted_at: value.submitted_at,
            userName: value.userName,
          }
        : undefined,
    [value]
  );

  return { submission, loading };
}
