import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace, WorkspaceRole } from "../types/workspace-types";
type InitialState = {
  workspaces: Workspace[];
  currentWorkspace?: Workspace;
  roles?: WorkspaceRole[];
};
const initialState: InitialState = {
  workspaces: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { setWorkspaces, setCurrentWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
