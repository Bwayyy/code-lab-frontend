import { Timestamp } from "firebase/firestore";
import { EntityBase } from "../components/common/shared-types";

export type Assignment = {
  deadline: Timestamp;
  maxScore: number;
  objective: string;
} & EntityBase;
