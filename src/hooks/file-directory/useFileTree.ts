import { ConfigContext } from "antd/lib/config-provider";
import { TreeNode } from "antd/lib/tree-select";
import { useEffect, useMemo, useState } from "react";
import crawl from "tree-crawl";
import { isForInStatement } from "typescript";
import useRepository from "../../firebase/collections/useRepository";
import {
  FileTreeNode,
  RepositoryFile,
} from "../../types/file-repository-types";
import _ from "lodash";
import { message } from "antd";
import useFileTabs from "./useFileTabs";
export default function useFileTree() {
  const { repository, loading, error, addFile, deleteFile, saveRepository } =
    useRepository();
  const { remove: removeTab } = useFileTabs();
  const [rootNode, setRootNode] = useState<FileTreeNode>({
    key: 0,
    name: "",
    children: _.cloneDeep(repository),
  });
  const forceUpdateTree = () => {
    setRootNode({ ...rootNode, children: [...(rootNode.children ?? [])] });
  };
  const getNode = (key: number): FileTreeNode | undefined => {
    let target;
    crawl(
      rootNode,
      (node, context) => {
        if (node.key === key) {
          target = node;
        }
      },
      { getChildren }
    );
    return target;
  };
  const getChildren = (node: FileTreeNode): FileTreeNode[] =>
    node.children ?? [];
  const normalize = (rootNode: FileTreeNode) => {
    crawl(
      rootNode,
      (node, context) => {
        node.title = node.name;
        node.parent = context.parent ?? undefined;
        node.isLeaf = node.fileId !== undefined;
        if (context.parent && context.parent.children) {
          context.parent.children[context.index] = node;
        }
        context.replace(node);
      },
      {
        getChildren,
      }
    );
  };
  const getRootNodeAsRepositoryFile = () => {
    const copy = _.cloneDeep(rootNode);
    crawl(
      copy,
      (node, context) => {
        node = {
          key: node.key,
          name: node.name,
          fileId: node.fileId,
          children: node.children,
        } as RepositoryFile;
        if (context.parent && context.parent.children) {
          context.parent.children[context.index] = node;
        }
        context.replace(node);
      },
      { getChildren }
    );
    return copy as RepositoryFile;
  };
  useEffect(() => {
    rootNode.children = _.cloneDeep(repository);
    normalize(rootNode);
    forceUpdateTree();
  }, [repository]);

  const getNodeTemplate = (type: "folder" | "file", name: string) => {
    return {
      key: new Date().getTime(),
      title: name,
      isLeaf: type === "file",
    } as FileTreeNode;
  };
  const saveToRepository = () => {
    const repositoryFiles = getRootNodeAsRepositoryFile();
    if (repositoryFiles.children !== undefined) {
      saveRepository(repositoryFiles.children ?? []);
    } else {
      message.error("Repository Files is undefined! Please try to refresh");
    }
  };
  const add = async (
    parent: FileTreeNode | undefined,
    name: string,
    type: "folder" | "file"
  ) => {
    // Update the json and save to database.
    const newNode = getNodeTemplate(type, name);
    if (type === "file") {
      const doc = await addFile();
      if (doc) {
        newNode.fileId = doc.id;
      }
    }
    newNode.name = name;
    newNode.parent = parent;
    if (!parent && rootNode) {
      rootNode.children?.push(newNode);
    }
    crawl(
      rootNode,
      (node, context) => {
        if (!node) context.skip();
        else {
          if (node.key === parent?.key) {
            node.children?.push(newNode);
            if (context.parent && context.parent.children) {
              context.parent.children[context.index] = node as any;
            }
            context.replace(node);
            context.break();
          }
        }
      },
      { getChildren }
    );
    saveToRepository();
  };
  const remove = async (key: number, fileId: string) => {
    await deleteFile(fileId);
    crawl(
      rootNode,
      (node, context) => {
        if (node.key === key) {
          context.parent?.children?.splice(context.index, 1);
          context.remove();
          context.break();
        }
      },
      { getChildren }
    );
    removeTab(key);
    saveToRepository();
  };

  const rename = (key: number, name: string) => {
    crawl(
      rootNode,
      (node, context) => {
        if (node.key === key) {
          node.name = name;
          if (context.parent && context.parent.children) {
            context.parent.children[context.index] = node as any;
          }
          context.break();
          context.replace(node);
        }
      },
      { getChildren }
    );
    saveToRepository();
  };
  return { root: rootNode, add, remove, rename, getNode };
}
