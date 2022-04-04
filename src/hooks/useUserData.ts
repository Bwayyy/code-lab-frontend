import { useSelector } from "react-redux";
import { UserData } from "../components/common/user-data";
import { RootState } from "../store";

export default function useUserData() {
  const userData = useSelector((state: RootState) => state.global.userData);
  return {
    userData: userData as UserData,
    isLoggedin: userData !== undefined,
  };
}
