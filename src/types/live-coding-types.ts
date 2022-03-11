import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type LiveCodingRoom = {
  isLive: boolean;
  description: string;
} & EntityBase &
  FirestoreEntity;
export type LiveCodingUser = {
  userId: string;
  userName: string;
  permission: UserRoomPerimission;
  selfName?: string;
};
export type UserRoomPerimission = {
  write: boolean;
} & FirestoreEntity;
