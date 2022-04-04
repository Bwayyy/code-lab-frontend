import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workspace, WorkspaceRole } from "../types/workspace-types";
type InitialState = {
  currentWorkspace?: Workspace;
  currentMembership?: WorkspaceRole;
};
const initialState: InitialState = {};

export const workspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.currentWorkspace = action.payload;
    },
    setCurrentMembership: (state, action: PayloadAction<WorkspaceRole>) => {
      state.currentMembership = action.payload;
    },
  },
});

export const { setCurrentWorkspace, setCurrentMembership } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
