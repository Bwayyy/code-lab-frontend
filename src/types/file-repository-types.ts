import { DataNode } from "antd/lib/tree";
import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type Repository = RepositoryFile[];
export type RepositoryFile = {
  key: number;
  name: string;
  fileId?: string;
  children?: RepositoryFile[];
};

export type FileTreeNode = {
  parent?: FileTreeNode;
  children?: FileTreeNode[];
} & Omit<RepositoryFile, "children"> &
  Omit<DataNode, "children">;

export type FileEntity = {
  id: string;
  content: string;
};
