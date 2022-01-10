import { DocumentReference } from "firebase/firestore";

export type EntityBase = {
  id: string;
  name: string;
};

export type UserRegisterInfo = {
  email: string;
  password: string;
  userDisplayName: string;
};

export type FirestoreEntity = {
  ref: DocumentReference;
};
