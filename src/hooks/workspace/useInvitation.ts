import { message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  addMember,
  getMemberById,
} from "../../firebase/database/workspace-collection";
import { appPaths } from "../../utils/path";
import useUserData from "../useUserData";

export default function useInvitation(workspaceId: string) {
  const invitationLink = window.origin + "/join/" + workspaceId;
  const { userData } = useUserData();
  const navigate = useNavigate();
  const join = async () => {
    if (userData) {
      const existing = await getMemberById(userData.id);
      if (!existing.empty) {
        message.warning(
          "You are already member in the workspace, returning to Workspace list"
        );
      } else {
        await addMember({
          role: "normal",
          userId: userData?.id,
          workspaceId: workspaceId,
        });
      }
      navigate(appPaths.workspaces);
    } else {
      message.error("You are not authenticated yet!");
    }
  };
  return { invitationLink, join };
}
