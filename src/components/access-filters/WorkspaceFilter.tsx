import { FC } from "react";
import { useParams } from "react-router-dom";
import { getMemberhipForUserAndWorkspace } from "../../firebase/database/workspace-collection";
import useUserData from "../../hooks/useUserData";
import { useCurrentWorkspace } from "../../hooks/workspace/useCurrentWorkspace";
import LoadingPage from "../common/LoadingPage";
import { AccessFilter } from "./AccessFilter";

export const WorkspaceFilter: FC = ({ children }) => {
  const { workspaceId } = useParams();
  const { userData } = useUserData();
  useCurrentWorkspace();
  const filter = async () => {
    if (workspaceId && userData) {
      const docs = await getMemberhipForUserAndWorkspace(
        workspaceId,
        userData.id
      );
      return !docs.empty;
    }
    return false;
  };
  if (userData === undefined) return <LoadingPage text="Preparing User Data" />;
  return <AccessFilter filterFn={filter} children={children} />;
};
