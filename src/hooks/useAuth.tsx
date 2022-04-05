import { message } from "antd";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../firebase/database/users-collection";
import { getErrorMessages } from "../firebase/error-handling/getErrorMessages";
import { auth } from "../firebase/firebaseApp";
import { clearUserData, setUserData } from "../reducers/globalSlice";
import { appPaths } from "../utils/path";

export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, loadingUser] = useAuthState(auth);
  const [signInWithEmailAndPassword, _user, isLoggingIn] =
    useSignInWithEmailAndPassword(auth);
  useEffect(() => {
    const initUser = async () => {
      if (!loadingUser && user) {
        const userRecord = await fetchUser(user.uid);
        dispatch(
          setUserData({
            id: user.uid,
            displayName: userRecord?.displayName,
            email: user.email ?? "",
          })
        );
      }
    };
    initUser();
  }, [user, loadingUser]);
  const signIn = async ({ email, password }: any, callback?: () => void) => {
    await signInWithEmailAndPassword(email, password);
  };
  const signout = async () => {
    await signOut(auth);
    dispatch(clearUserData());
    navigate(appPaths.login);
  };
  return { signIn, signout, loading: isLoggingIn };
}
