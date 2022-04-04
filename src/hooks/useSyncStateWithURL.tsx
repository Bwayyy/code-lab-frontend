import { doc, getDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fireStore } from "../firebase/firebaseApp";
import { setCurrentAssignment } from "../reducers/assignmentSlice";
import { setCurrentLiveCodingRoom } from "../reducers/liveCodingSlice";
import { setCurrentWorkspace } from "../reducers/workspaceSlice";
import { RootState } from "../store";
import { Assignment } from "../types/assignment-types";
import useFirestoreRefPath from "./useFirestoreRefPath";

export default function useSyncStateWithURL() {
  const { workspaceId, liveCodingId, assignmentId } = useParams();
  console.log({ workspaceId, liveCodingId, assignmentId });
  const { getLiveCodingDocPath, getWorkspaceDocPath, getAssignmentDocPath } =
    useFirestoreRefPath();
  const dispatch = useDispatch();

  const currentWorkspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const currentLiveCodingRoom = useSelector(
    (state: RootState) => state.liveCoding.currentRoom
  );
  const currentAssignemnt = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const [isWorkspaceSynced, setIsWorkspaceSynced] = useState(
    workspaceId === undefined || currentWorkspace?.id === workspaceId
  );
  const [isLiveCodingSynced, setIsLiveCodingSynced] = useState(
    liveCodingId === undefined || currentLiveCodingRoom?.id === liveCodingId
  );
  const [isAssignmentSynced, setIsAssignmentSynced] = useState(
    assignmentId === undefined || currentAssignemnt?.id === assignmentId
  );
  const workspacePath = useMemo(
    () => getWorkspaceDocPath(workspaceId ?? ""),
    [workspaceId]
  );
  const liveCodingPath = useMemo(
    () => getLiveCodingDocPath(workspacePath, liveCodingId ?? ""),
    [workspacePath, liveCodingId]
  );
  const assignmentPath = useMemo(
    () => getAssignmentDocPath(workspacePath, assignmentId ?? ""),
    [workspacePath, assignmentId]
  );
  useEffect(() => {
    const initWorkspace = async () => {
      debugger;
      if (
        workspaceId &&
        (currentWorkspace === undefined || currentWorkspace.id !== workspaceId)
      ) {
        setIsWorkspaceSynced(false);
        const workspaceRef = await getDoc(
          doc(fireStore, "workspace/" + workspaceId)
        );
        const workspace = workspaceRef.data();
        if (workspace) {
          setIsWorkspaceSynced(true);
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
          console.debug("refeteched workspace", workspacePath);
        }
      }
    };
    initWorkspace();
  }, [workspaceId]);
  useEffect(() => {
    const initLiveCoding = async () => {
      if (
        workspaceId &&
        liveCodingId &&
        (currentLiveCodingRoom === undefined ||
          currentLiveCodingRoom.id !== liveCodingId)
      ) {
        setIsLiveCodingSynced(false);
        const liveCodingRef = await getDoc(doc(fireStore, liveCodingPath));
        const liveCoding = liveCodingRef.data();
        if (liveCoding) {
          dispatch(setCurrentLiveCodingRoom(liveCoding as any));
          console.debug("refetched live coding", liveCodingPath);
          setIsLiveCodingSynced(true);
        }
      }
    };
    initLiveCoding();
  }, [liveCodingId]);
  useEffect(() => {
    const initAssignment = async () => {
      if (
        workspaceId &&
        assignmentId &&
        (currentAssignemnt === undefined ||
          currentAssignemnt.id !== assignmentId)
      ) {
        setIsAssignmentSynced(false);
        const assignmentRef = await getDoc(doc(fireStore, assignmentPath));
        const assignemntDoc = assignmentRef.data();
        if (assignemntDoc) {
          console.debug("refetched assignment ", assignmentPath);
          dispatch(
            setCurrentAssignment({
              deadline: moment(
                (assignemntDoc.deadline as Timestamp).toMillis()
              ),
              id: assignemntDoc.id,
              name: assignemntDoc.name,
              ref: assignemntDoc.ref,
              maxScore: assignemntDoc.maxScore,
              objective: assignemntDoc.objective,
            } as Assignment)
          );
          setIsAssignmentSynced(true);
        }
      }
    };
    initAssignment();
  }, [assignmentId]);
  return {
    synced: isWorkspaceSynced && isLiveCodingSynced && isAssignmentSynced,
  };
}
