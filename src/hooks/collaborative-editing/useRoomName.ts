import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";

export default function useRoomName() {
  const { liveCodingId, workspaceId } = useParams();
  const activeFile = useSelector(
    (state: RootState) => state.fileRepository.activeFile
  );
  const fileRoomName = useMemo(
    () => `${workspaceId}_${liveCodingId}_${activeFile?.fileId}`,
    [workspaceId, liveCodingId, activeFile]
  );
  const roomName = useMemo(
    () => `${workspaceId}_${liveCodingId}`,
    [workspaceId, liveCodingId]
  );
  return { fileRoomName, roomName };
}
