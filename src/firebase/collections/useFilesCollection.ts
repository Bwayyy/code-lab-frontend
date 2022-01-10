import {
  collection,
  DocumentReference,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { fireStore } from "../firebaseApp";

export default function useFilesCollection() {
  // const { workspaceId, liveCodingId } = useParams();
  // const [snapshot, loading, error] = useCollection(
  //   query(
  //     collection(
  //       fireStore,
  //       `workspaces/${workspaceId}/liveCodings/${liveCodingId}/files`
  //     ),
  //     where("parent", "==", "")
  //   )
  // );
  // const convertEntity = (x: QueryDocumentSnapshot) => {
  //   const data = x.data();
  //   const file = {
  //     id: x.id,
  //     parent: data.parent,
  //     content: data.content,
  //     name: data.name,
  //     type: data.type,
  //     ref: x.ref,
  //   } as FileEntity;
  //   return file;
  // };
  // const files = useMemo(
  //   () =>
  //     snapshot?.docs.map((x) => {
  //       return convertEntity(x);
  //     }),
  //   [snapshot]
  // );
  // snapshot?.docChanges().forEach((change) => {
  //   console.log({ change });
  // });
  // const loadFiles = async (ref: DocumentReference) => {
  //   const q = query(collection(fireStore, ref.path, "files"));
  //   return await (
  //     await getDocs(q)
  //   ).docs.map((x) => {
  //     return convertEntity(x);
  //   });
  // };
  // return { files, loading, error, loadFiles };
}
