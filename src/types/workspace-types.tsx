import { Timestamp } from "firebase/firestore";
import { FirestoreEntity } from "../components/common/shared-types";

export type Workspace = WorkspaceBody & FirestoreEntity;
export type WorkspaceBody = {
  name: string;
  createdAt: Timestamp;
  createdBy: string;
  description: string;
};
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
