import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useWorkspaceDocQuery } from "../../firebase/database/workspace-collection";
import { setCurrentWorkspace } from "../../reducers/workspaceSlice";

export const useCurrentWorkspace = () => {
  const { workspaceId } = useParams();
  const { workspace } = useWorkspaceDocQuery(workspaceId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (workspace) {
      dispatch(setCurrentWorkspace(workspace));
    }
  }, [workspace]);
  return { workspace };
};
