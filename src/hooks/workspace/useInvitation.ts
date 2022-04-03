import { addDoc, collection, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { fireStore } from "../../firebase/firebaseApp";
import { appPaths } from "../../utils/path";
import useUserData from "../useUserData";

export default function useInvitation(workspaceId: string) {
  const invitationLink = window.origin + "/join/" + workspaceId;
  const { userData } = useUserData();
  const navigate = useNavigate();
  const join = async () => {
    await addDoc(collection(fireStore, "workspace_members"), {
      role: "normal",
      userId: userData?.id,
      workspaceId: workspaceId,
    });
    navigate(appPaths.workspaces);
  };
  return { invitationLink, join };
}
