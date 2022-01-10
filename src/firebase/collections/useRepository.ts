import { doc } from "firebase/firestore";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { Repository } from "../../types/file-repository-types";
import { fireStore } from "../firebaseApp";

export default function useRepository() {
  const { workspaceId, liveCodingId } = useParams();
  const [snapshot, loading, error] = useDocumentData(
    doc(
      fireStore,
      `workspaces/${workspaceId}/liveCodings/${liveCodingId}/repository/0`
    )
  );
  const repository: Repository = snapshot ? JSON.parse(snapshot.json) : [];
  return { repository, loading, error };
}
