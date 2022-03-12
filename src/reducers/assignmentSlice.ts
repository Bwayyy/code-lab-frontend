import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "../types/assignment-types";
type InitialState = {
  currentAssignment?: Assignment;
};
const initialState: InitialState = {};

export const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setCurrentAssignment: (state, action: PayloadAction<Assignment>) => {
      state.currentAssignment = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentAssignment } = assignmentSlice.actions;

export default assignmentSlice.reducer;
