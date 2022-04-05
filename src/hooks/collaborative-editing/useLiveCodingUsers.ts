import { message } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOthers, useSelf } from "y-presence";
import { Awareness } from "y-protocols/awareness";
import { setRoomPermission } from "../../reducers/liveCodingSlice";
import {
  LiveCodingUser,
  UserRoomPermissionBody,
} from "../../types/live-coding-types";
import useUserData from "../useUserData";

export default function useLiveCodingUsers(
  awareness?: Awareness,
  permission?: UserRoomPermissionBody
) {
  const { userData } = useUserData();
  const dispatch = useDispatch();
  const { self, updatePresence } = useSelf<LiveCodingUser>({
    userName: userData?.displayName ?? "",
    userId: userData?.id ?? "",
    permission: { write: permission?.write ?? false },
  });
  // Remove self awareness when leaving the page
  useEffect(() => {
    return () => {
      awareness?.setLocalState(null);
    };
  }, []);
  const others = useOthers();
  useEffect(() => {
    if (permission) {
      updatePresence({ permission });
      dispatch(setRoomPermission(permission));
    }
  }, [permission]);
  return { self, others, updatePresence };
}
