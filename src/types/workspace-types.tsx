import { Timestamp } from "firebase/firestore";
import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type Workspace = {
  createdAt: Timestamp;
  createdBy: string;
  description: string;
} & EntityBase &
  FirestoreEntity;

export type WorkspaceRole = WorkspaceRoleBody & FirestoreEntity;
export type WorkspaceRoleBody = {
  role: "admin" | "normal";
  userId: string;
  workspaceId: string;
};
export type WorkspaceAndMembership = {
  workspace: Workspace;
  membership: WorkspaceRole;
};
