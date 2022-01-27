import { message } from "antd";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getErrorMessages } from "../firebase/error-handling/getErrorMessages";
import { auth } from "../firebase/firebaseApp";
import { clearUserData, setUserData } from "../reducers/globalSlice";
import { appPaths } from "../utils/path";

export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUserData({
            id: user.uid,
            username: user.displayName ?? "",
            email: user.email ?? "",
          })
        );
        navigate(appPaths.workspaces);
      } else {
        navigate(appPaths.login);
      }
    });
    return unsubscribe;
  }, [dispatch]);
  const signIn = async ({ email, password }: any) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setloading(false);
        navigate(appPaths.workspaces);
      })
      .catch((err: FirebaseError) => {
        setloading(false);
        message.error(getErrorMessages(err));
      });
  };
  const signout = async () => {
    await signOut(auth);
    dispatch(clearUserData());
    navigate(appPaths.login);
  };
  return { signIn, signout, loading };
}
