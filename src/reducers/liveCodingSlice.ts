import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LiveCodingRoom,
  LiveCodingUser,
  UserRoomPerimission,
} from "../types/live-coding-types";
type InitialState = {
  currentRoom?: LiveCodingRoom;
  roomPermission?: UserRoomPerimission;
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
    setRoomPermission: (state, action: PayloadAction<UserRoomPerimission>) => {
      state.roomPermission = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentLiveCodingRoom, setRoomPermission } =
  liveCodingSlice.actions;

export default liveCodingSlice.reducer;
