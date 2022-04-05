import { DocumentData } from "firebase/firestore";

export const transformUser = (data: DocumentData) => {
  return {
    id: data.id,
    displayName: data.displayName,
  } as { id: string; displayName: string };
};
