import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type LiveCodingRoom = {
  isLive: boolean;
  description: string;
} & EntityBase &
  FirestoreEntity;
export type LiveCodingUser = {
  userId: number;
  userName: string;
};
