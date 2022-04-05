import {
  collection,
  doc,
  documentId,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import useFirestoreErrorMessaging from "../../hooks/useFirestoreErrorMessaging";
import { transformUser } from "../data-transform/user-transform";
import { fireStore } from "../firebaseApp";
import { firestoreFetchOptions } from "./workspace-collection";

const collections = {
  users: {
    get: () => collection(fireStore, "users"),
    getDoc: (id: string) => doc(fireStore, collections.users.get().path, id),
  },
};

export const useUserQuery = (id?: string) => {
  let docRef = null;
  if (id) {
    docRef = collections.users.getDoc(id);
  }
  const [data, loading, error] = useDocumentData(docRef);
  useFirestoreErrorMessaging(error);
  return { user: data ? transformUser(data) : data, loading, error };
};

export const fetchUser = async (id: string) => {
  const docRef = collections.users.getDoc(id);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();
  return data ? transformUser(data) : data;
};

export const useUsersByKeysQuery = (keys?: string[]) => {
  const col = collections.users.get();
  const q = keys ? query(col, where(documentId(), "in", keys)) : null;
  const [data, loading, error] = useCollectionData(q, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return { users: data?.map((x) => transformUser(x)) ?? [], loading, error };
};
