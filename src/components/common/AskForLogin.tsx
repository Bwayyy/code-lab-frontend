import { Spin } from "antd";
import { FC, ReactElement } from "react";
import useUserData from "../../hooks/useUserData";
import LoadingPage from "./LoadingPage";
import { LoginModal } from "./LoginModal";
type AskForLoginProps = {
  children: ReactElement;
};
const AskForLogin: FC<AskForLoginProps> = ({ children }) => {
  const { isLoggedin, loading } = useUserData();
  if (loading) return <LoadingPage text="Wait a Moment" />;
  if (isLoggedin) return children;
  return <LoginModal />;
};
export { AskForLogin };
