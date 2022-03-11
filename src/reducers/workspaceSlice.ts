import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace, WorkspaceRole } from "../types/workspace-types";
type InitialState = {
  workspaces: Workspace[];
  currentWorkspace?: Workspace;
  roles: WorkspaceRole[];
  userRole?: WorkspaceRole;
};
const initialState: InitialState = {
  workspaces: [],
  roles: [],
};

export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<Workspace[]>) => {
      state.workspaces = action.payload;
    },
    setCurrentWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.currentWorkspace = action.payload;
    },
    setWorkspaceRoles: (state, action: PayloadAction<WorkspaceRole[]>) => {
      state.roles = action.payload;
    },
    setWorkspaceRoleForUser: (state, action: PayloadAction<WorkspaceRole>) => {
      state.userRole = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWorkspaces,
  setCurrentWorkspace,
  setWorkspaceRoles,
  setWorkspaceRoleForUser,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
