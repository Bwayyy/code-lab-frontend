import { FormInstance } from "antd";
import { DocumentReference } from "firebase/firestore";

export type EntityBase = {
  id: string;
  name: string;
};
export type PopupProps = {
  action?: "add" | "edit";
  form?: FormInstance;
  visible: boolean;
  close: () => any;
};
export type UserRegisterInfo = {
  email: string;
  password: string;
  userDisplayName: string;
};

export type FirestoreEntity = {
  ref: DocumentReference;
};
