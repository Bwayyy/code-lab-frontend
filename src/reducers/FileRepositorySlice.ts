import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepositoryFile } from "../types/file-repository-types";
type InitialState = {
  tabFiles: RepositoryFile[];
  activeFile?: RepositoryFile;
  activeTabKey?: number;
};
const initialState: InitialState = {
  tabFiles: [],
};

export const fileRepositorySlice = createSlice({
  name: "fileRepository",
  initialState,
  reducers: {
    addFileToTab: (state, action: PayloadAction<RepositoryFile>) => {
      if (!state.tabFiles.some((x) => x.key === action.payload.key)) {
        state.tabFiles.push(action.payload);
      }
    },
    removeTab: (state, action: PayloadAction<number>) => {
      if (state.activeFile?.key === action.payload) {
        state.activeFile = undefined;
        state.activeTabKey = undefined;
      }
      state.tabFiles = state.tabFiles.filter((f) => f.key !== action.payload);
    },
    setActiveTabKey: (state, action: PayloadAction<number>) => {
      state.activeTabKey = action.payload;
      state.activeFile = state.tabFiles.find((x) => x.key === action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFileToTab, removeTab, setActiveTabKey } =
  fileRepositorySlice.actions;

export default fileRepositorySlice.reducer;
