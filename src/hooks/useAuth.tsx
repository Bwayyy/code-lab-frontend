import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { fetchUser } from "../firebase/database/users-collection";
import { auth } from "../firebase/firebaseApp";
import { setUserData } from "../reducers/globalSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const [user, loadingUser] = useAuthState(auth);

  useEffect(() => {
    const initUser = async () => {
      if (!loadingUser && user) {
        const userRecord = await fetchUser(user.uid);
        dispatch(
          setUserData({
            id: user.uid,
            displayName: userRecord?.displayName ?? "Name not found",
            email: user.email ?? "",
          })
        );
      }
    };
    initUser();
  }, [user, loadingUser]);
}
