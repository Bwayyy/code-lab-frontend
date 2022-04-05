import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Repository } from "../../types/file-repository-types";
import {
  LiveCodingRoom,
  UserRoomPermission,
} from "../../types/live-coding-types";

export const transformLiveCoding = (data: DocumentData) => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    isLive: data.isLive,
    ref: data.ref,
  } as LiveCodingRoom;
};

export const transformRepository = (data?: DocumentData) => {
  return JSON.parse(data?.json ?? "[]") as Repository;
};

export const transformPermission = (data: DocumentData) => {
  return {
    id: data.id,
    ref: data.ref,
    write: data.write,
  } as UserRoomPermission;
};
