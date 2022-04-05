import { doc } from "firebase/firestore";
import { useEffect, useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useOthers, useSelf } from "y-presence";
import { Awareness } from "y-protocols/awareness";
import { fireStore } from "../../firebase/firebaseApp";
import { setRoomPermission } from "../../reducers/liveCodingSlice";
import { RootState } from "../../store";
import {
  LiveCodingUser,
  UserRoomPerimission,
} from "../../types/live-coding-types";
import useFirestoreRefPath from "../useFirestoreRefPath";
import useUserData from "../useUserData";

export default function useLiveCodingUsers(awareness?: Awareness) {
  const { userData } = useUserData();
  const dispatch = useDispatch();
  const liveCodingRoom = useSelector(
    (state: RootState) => state.liveCoding.currentRoom
  );
  const { getUserPermissionPath } = useFirestoreRefPath();
  const permissionDocRef = doc(
    fireStore,
    getUserPermissionPath(liveCodingRoom?.ref.path ?? ""),
    userData?.id ?? ""
  );
  const [permission] = useDocument(permissionDocRef);
  const userRoomPermission = useMemo(() => {
    const data = (permission?.data() as UserRoomPerimission) ?? { write: true };
    dispatch(setRoomPermission(data));
    return data;
  }, [permission]);
  const { self, updatePresence } = useSelf<LiveCodingUser>({
    userName: userData?.displayName ?? "",
    userId: userData?.id ?? "",
    permission: userRoomPermission,
  });
  // Update presence when permission document is changed in database.
  useEffect(() => {
    updatePresence({ permission: userRoomPermission });
  }, [userRoomPermission]);
  // Remove self awareness when leaving the page
  useEffect(() => {
    return () => {
      awareness?.setLocalState(null);
    };
  }, []);
  const others = useOthers();
  return { self, others };
}
