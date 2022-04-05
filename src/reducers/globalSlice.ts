import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../components/common/user-data";
type InitialState = {
  signupVisible: boolean;
  loginVisible: boolean;
  userData?: UserData;
};
const initialState: InitialState = {
  signupVisible: false,
  loginVisible: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    showSignUp: (state) => {
      state.signupVisible = true;
    },
    closeSignup: (state) => {
      state.signupVisible = false;
    },
    showLogin: (state) => {
      state.loginVisible = true;
    },
    closeLogin: (state) => {
      state.loginVisible = false;
    },
    setUserData: (state, action: PayloadAction<UserData | undefined>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  showSignUp,
  closeSignup,
  closeLogin,
  showLogin,
  setUserData,
  clearUserData,
} = globalSlice.actions;

export default globalSlice.reducer;
