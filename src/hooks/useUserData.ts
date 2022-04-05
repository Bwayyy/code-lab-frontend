import { useSelector } from "react-redux";
import { auth } from "../firebase/firebaseApp";
import { RootState } from "../store";
import { useAuthState } from "react-firebase-hooks/auth";
export default function useUserData() {
  const userData = useSelector((state: RootState) => state.global.userData);
  const [user, loading, error] = useAuthState(auth);
  return {
    userData,
    loading,
    isLoggedin: user !== null && user !== undefined,
  };
}
