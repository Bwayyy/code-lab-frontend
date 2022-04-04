import { Timestamp } from "firebase/firestore";
import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type Workspace = {
  createdAt: Timestamp;
  createdBy: string;
  description: string;
} & EntityBase &
  FirestoreEntity;

export type WorkspaceRole = {
  id: string;
  role: "admin" | "normal";
  userId: string;
  workspaceId: string;
} & FirestoreEntity;

export type WorkspaceAndMembership = {
  workspace: Workspace;
  membership: WorkspaceRole;
};
