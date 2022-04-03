import { FC, ReactElement, ReactNode } from "react";
import useUserData from "../../hooks/useUserData";
import { LoginModal } from "./LoginModal";
type AskForLoginProps = {
  children: ReactElement;
};
const AskForLogin: FC<AskForLoginProps> = ({ children }) => {
  const { isLoggedin } = useUserData();
  if (isLoggedin) return children;
  return <LoginModal />;
};
export { AskForLogin };
