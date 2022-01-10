import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function useUserData() {
  const userData = useSelector((state: RootState) => state.global.userData);
  return {
    userData,
    isLoggedin: userData !== undefined,
  };
}
