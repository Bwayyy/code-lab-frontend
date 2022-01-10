import { Timestamp } from "firebase/firestore";
import { EntityBase } from "../components/common/shared-types";

export type Workspace = {
  createdAt: Timestamp;
  createdBy: string;
  description: string;
} & EntityBase;
