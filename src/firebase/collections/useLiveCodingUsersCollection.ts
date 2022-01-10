import { collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { LiveCodingUser } from "../../types/live-coding-types";
import { fireStore } from "../firebaseApp";

export default function useLiveCodingUsersCollection(
  workspaceId: string,
  liveCodingId: string
) {
  const [snapshot, loading, error] = useCollection(
    query(
      collection(
        fireStore,
        `workspaces/${workspaceId}/liveCodings/${liveCodingId}/liveUsers`
      )
    ),
    {
      snapshotListenOptions: {
        includeMetadataChanges: true,
      },
    }
  );
  const users = snapshot?.docs.map((x) => {
    const data = x.data();
    return { userId: data.userId, userName: data.userName } as LiveCodingUser;
  });
  return { users, loading, error };
}
