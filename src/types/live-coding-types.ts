import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type LiveCodingRoom = {
  isLive: boolean;
  description: string;
} & EntityBase &
  FirestoreEntity;
export type LiveCodingUser = {
  userId?: string;
  userName?: string;
  permission?: UserRoomPermissionBody;
  selfName?: string;
};
export type UserRoomPermission = UserRoomPermissionBody & FirestoreEntity;

export type UserRoomPermissionBody = {
  write: boolean;
};
