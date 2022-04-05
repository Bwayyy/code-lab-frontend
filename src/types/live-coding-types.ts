import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type LiveCodingRoom = LiveCodingRoomBody & FirestoreEntity;
export type LiveCodingRoomBody = {
  name: string;
  isLive: boolean;
  description: string;
};
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
