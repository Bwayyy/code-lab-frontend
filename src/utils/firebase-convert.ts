import { QueryDocumentSnapshot } from "firebase/firestore";

export const convertDocToType = (doc: QueryDocumentSnapshot) => {
  const data = doc.data();
};
