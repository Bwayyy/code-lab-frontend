import { signOut } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseApp";
import { clearUserData } from "../reducers/globalSlice";
import { appPaths } from "../utils/path";

export default function useAuthActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);
  const signIn = async ({ email, password }: any, callback?: () => void) => {
    await signInWithEmailAndPassword(email, password);
  };
  const signout = async () => {
    await signOut(auth);
    dispatch(clearUserData());
    navigate(appPaths.login);
  };
  return { signIn, signout, loading };
}
