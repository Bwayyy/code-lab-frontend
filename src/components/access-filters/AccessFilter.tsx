import { message } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "../../utils/path";
import LoadingPage from "../common/LoadingPage";
type AccessFilterProps = {
  filterFn: () => Promise<boolean>;
};
export const AccessFilter: FC<AccessFilterProps> = ({ children, filterFn }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authorize = async () => {
      setLoading(true);
      const authorized = await filterFn();
      setLoading(false);
      if (!authorized) {
        message.error("You do not have access to the resouces");
        navigate(appPaths.workspaces);
      }
    };
    authorize();
  }, []);
  return loading ? (
    <LoadingPage text="Validating Access Right" />
  ) : (
    (children as any)
  );
};
