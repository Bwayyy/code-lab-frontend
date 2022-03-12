import { Timestamp } from "firebase/firestore";
import { Moment } from "moment";
import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type Assignment = {
  deadline: Timestamp | Moment;
  maxScore: number;
  objective: string;
} & EntityBase &
  FirestoreEntity;
