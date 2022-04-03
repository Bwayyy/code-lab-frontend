import { doc } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { fireStore } from "../../firebase/firebaseApp";

export default function useWorkspaceDetail(workspaceId?: string) {
  const docRef = workspaceId ? doc(fireStore, "workspaces", workspaceId) : null;
  const [value, loading, error] = useDocumentDataOnce(docRef);
  return { workspace: value, loading, error };
}
