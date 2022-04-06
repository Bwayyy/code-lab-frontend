import { FC } from "react";
import { useParams } from "react-router-dom";
import { getMemberhipForUserAndWorkspace } from "../../firebase/database/workspace-collection";
import useUserData from "../../hooks/useUserData";
import { AccessFilter } from "./AccessFilter";

export const WorkspaceFilter: FC = ({ children }) => {
  const { workspaceId } = useParams();
  const { userData } = useUserData();
  const filter = async () => {
    console.log({ workspaceId, userData });
    if (workspaceId && userData) {
      const docs = await getMemberhipForUserAndWorkspace(
        workspaceId,
        userData.id
      );
      return !docs.empty;
    }
    return false;
  };
  return <AccessFilter filterFn={filter} children={children} />;
};
