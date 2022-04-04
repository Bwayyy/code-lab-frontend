import { DocumentData } from "firebase/firestore";
import { Workspace, WorkspaceRole } from "../../types/workspace-types";

export const transformMembership = (data: DocumentData) => {
  return {
    id: data.id,
    role: data.role,
    userId: data.userId,
    workspaceId: data.workspaceId,
    ref: data.ref,
  } as WorkspaceRole;
};

export const transformWorkspace = (data: DocumentData) => {
  return {
    createdAt: data.createdAt,
    createdBy: data.createdBy,
    description: data.description,
    id: data.id,
    name: data.name,
    ref: data.ref,
  } as Workspace;
};
