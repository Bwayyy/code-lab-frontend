import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { fireStore } from "../../firebase/firebaseApp";
import { RootState } from "../../store";
import useFirestoreRefPath from "../useFirestoreRefPath";

export default function useUserRoomPermissionMutation() {
  const { getUserPermissionPath } = useFirestoreRefPath();
  const currentRoom = useSelector(
    (state: RootState) => state.liveCoding.currentRoom
  );
  const setWritePermission = async (userId: string, value: boolean) => {
    if (currentRoom) {
      const docRef = doc(
        fireStore,
        getUserPermissionPath(currentRoom.ref.path),
        userId
      );
      await setDoc(docRef, { write: value });
    }
  };

  return { setWritePermission };
}
