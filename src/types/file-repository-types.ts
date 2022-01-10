import { EntityBase, FirestoreEntity } from "../components/common/shared-types";

export type Repository = RepositoryFile[];

export type RepositoryFile = {
  key: number;
  name: string;
  childrens?: RepositoryFile[];
  fileId: string;
};
