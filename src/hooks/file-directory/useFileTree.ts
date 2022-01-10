import useRepository from "../../firebase/collections/useRepository";

export default function useFileTree() {
  const { repository, loading, error } = useRepository();
  // const convertToTreeNode = (x: RepositoryFile[]) => {
  //   return {
  //     ...x,
  //     key: x.id,
  //     title: x.name,
  //     checkable: false,
  //     isLeaf: x.type === "file",
  //   } as TreeDataNode;
  // };
  return { repository };
}
