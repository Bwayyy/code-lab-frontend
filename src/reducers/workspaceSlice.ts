import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace, WorkspaceRole } from "../types/workspace-types";
type InitialState = {
  workspaces: Workspace[];
  currentWorkspace?: Workspace;
  memeberships: WorkspaceRole[];
};
const initialState: InitialState = {
  workspaces: [],
  memeberships: [],
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
    setMemberships: (state, action: PayloadAction<WorkspaceRole[]>) => {
      state.memeberships = action.payload;
    },
  },
});

export const { setWorkspaces, setCurrentWorkspace, setMemberships } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
