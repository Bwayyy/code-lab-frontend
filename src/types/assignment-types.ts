import { Timestamp } from "firebase/firestore";
import { Moment } from "moment";
import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type Assignment = {
  deadline: Timestamp | Moment;
  maxScore: number;
  objective: string;
} & EntityBase &
  FirestoreEntity;

export type AssignmentSubmission = {
  id: string;
  userName: string;
  submitted_at: Timestamp;
  folderPath: string;
  graded?: boolean;
  score: number;
} & FirestoreEntity;
