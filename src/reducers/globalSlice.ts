import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../components/common/user-data";
type InitialState = {
  userData?: UserData;
};
const initialState: InitialState = {};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | undefined>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, clearUserData } = globalSlice.actions;

export default globalSlice.reducer;
