import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Repository } from "../../types/file-repository-types";
import { LiveCodingRoom } from "../../types/live-coding-types";

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
