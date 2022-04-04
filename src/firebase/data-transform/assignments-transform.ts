import { DocumentData, Timestamp } from "firebase/firestore";
import moment from "moment";
import { Assignment, AssignmentSubmission } from "../../types/assignment-types";

export const transformAssignment = (data: DocumentData) => {
  return {
    deadline: moment((data.deadline as Timestamp).toMillis()),
    id: data.id,
    name: data.name,
    ref: data.ref,
    maxScore: data.maxScore,
    objective: data.objective,
  } as Assignment;
};

export const transformAssignmentSubmission = (data: DocumentData) => {
  return {
    folderPath: data.folderPath,
    id: data.id,
    ref: data.ref,
    score: data.score,
    submitted_at: data.submitted_at,
    graded: data.graded,
    userName: data.userName,
  } as AssignmentSubmission;
};
