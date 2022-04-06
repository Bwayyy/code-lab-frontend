import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import LoadingPage from "./LoadingPage";
type AskForLoginProps = {
  children: ReactElement;
};
const AskForLogin: FC<AskForLoginProps> = ({ children }) => {
  const location = useLocation();
  const { isLoggedin, loading, userData } = useUserData();
  if (loading || userData === undefined)
    return <LoadingPage text="Wait a Moment" />;
  if (isLoggedin) return children;
  return <Navigate to="/login" state={{ from: location.pathname }} />;
};
export { AskForLogin };
