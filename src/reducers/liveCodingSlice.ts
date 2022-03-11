import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LiveCodingRoom } from "../types/live-coding-types";
type InitialState = {
  currentRoom?: LiveCodingRoom;
};
const initialState: InitialState = {};

export const liveCodingSlice = createSlice({
  name: "liveCoding",
  initialState,
  reducers: {
    setCurrentLiveCodingRoom: (
      state,
      action: PayloadAction<LiveCodingRoom>
    ) => {
      state.currentRoom = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentLiveCodingRoom } = liveCodingSlice.actions;

export default liveCodingSlice.reducer;
