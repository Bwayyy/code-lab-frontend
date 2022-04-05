import { message } from "antd";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getErrorMessages } from "../firebase/error-handling/getErrorMessages";
import { auth } from "../firebase/firebaseApp";
import { clearUserData } from "../reducers/globalSlice";
import { appPaths } from "../utils/path";

export default function useAuthActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const signIn = ({ email, password }: any, callback?: () => void) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => callback?.())
      .catch((err) => {
        message.error(getErrorMessages(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const signout = async () => {
    setLoading(true);
    await signOut(auth);
    dispatch(clearUserData());
    setLoading(false);
    navigate(appPaths.login);
  };
  return { signIn, signout, loading };
}
