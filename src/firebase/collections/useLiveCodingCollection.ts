import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { LiveCodingRoom } from "../../types/live-coding-types";
import { fireStore } from "../firebaseApp";

export default function useLiveCodingCollection(workspaceId?: string) {
  const [snapshot, loading, error] = useCollectionData(
    query(collection(fireStore, `workspaces/${workspaceId}/liveCodings`)),
    { idField: "id", refField: "ref" }
  );
  const threads = snapshot?.map((x) => ({
    id: x.id,
    name: x.name,
    description: x.description,
    isLive: x.isLive,
    ref: x.ref,
  })) as LiveCodingRoom[];
  return { threads, loading, error };
}
