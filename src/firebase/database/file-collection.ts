import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { fireStore } from "../firebaseApp";
const collections = {
  files: {
    get: (repositoryPath: string) =>
      collection(fireStore, repositoryPath + "/0/files"),
  },
};
export const addFile = async (repositoryPath: string) => {
  const col = collections.files.get(repositoryPath);
  return await addDoc(col, { content: "" });
};
export const deleteFile = async (repositoryPath: string, fileId: string) => {
  const col = collections.files.get(repositoryPath);
  return await deleteDoc(doc(fireStore, col.path, fileId));
};
export const filesCollections = collections;
