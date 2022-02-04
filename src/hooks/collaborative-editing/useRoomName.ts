import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";

export default function useRoomName() {
  const { liveCodingId, workspaceId } = useParams();
  const activeFile = useSelector(
    (state: RootState) => state.fileRepository.activeFile
  );
  let roomName = "";
  if (liveCodingId && activeFile) {
    roomName = `${workspaceId}_${liveCodingId}_${activeFile.fileId}`;
  }
  return { roomName };
}
