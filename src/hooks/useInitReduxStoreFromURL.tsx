import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import app, { fireStore } from "../firebase/firebaseApp";
import { setCurrentWorkspace } from "../reducers/workspaceSlice";
import { getAppState } from "../store";
import useFirestoreRefPath from "./useFirestoreRefPath";

export default function useInitReduxStoreFromURL() {
  const { workspaceId, liveCodingId, assignmentId } = useParams();
  const {} = useFirestoreRefPath();
  const dispatch = useDispatch();
  useEffect(() => {
    const initWorkspace = async () => {
      const currentWorkspace = getAppState().workspaces.currentWorkspace;
      if (
        workspaceId &&
        (currentWorkspace === undefined || currentWorkspace.id !== workspaceId)
      ) {
        const workspaceRef = await getDoc(
          doc(fireStore, "workspace/" + workspaceId)
        );
        const workspace = workspaceRef.data();
        if (workspace) {
          dispatch(
            setCurrentWorkspace({
              id: workspace.id,
              createdAt: workspace.createdAt,
              createdBy: workspace.createdBy,
              description: workspace.description,
              name: workspace.name,
              ref: workspace.ref,
            })
          );
        }
      }
    };
    initWorkspace();
  }, [workspaceId]);
}
