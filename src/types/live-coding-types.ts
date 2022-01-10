import { EntityBase } from "../components/common/shared-types";

export type LiveCodingRoom = {
  isLive: boolean;
  description: string;
} & EntityBase;
export type LiveCodingUser = {
  userId: number;
  userName: string;
};
