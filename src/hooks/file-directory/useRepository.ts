import { useParams } from "react-router-dom";
import {
  repositoryCollections,
  saveRepository,
  useRepositoryQuery,
} from "../../firebase/database/livecoding-repository-collection";
import { Repository } from "../../types/file-repository-types";
import {
  addFile as addFileToDb,
  deleteFile as deleteFileFromDb,
} from "../../firebase/database/file-collection";
export default function useRepository() {
  const { workspaceId, liveCodingId } = useParams() as {
    workspaceId: string;
    liveCodingId: string;
  };
  const { repository, loading, error } = useRepositoryQuery({
    workspaceId,
    liveCodingId,
  });
  const repositoryPath = repositoryCollections.repository.get({
    workspaceId,
    liveCodingId,
  }).path;
  const addFile = () => {
    return addFileToDb(repositoryPath);
  };
  const deleteFile = async (fileId: string) => {
    return deleteFileFromDb(repositoryPath, fileId);
  };
  const saveRepo = async (repo: Repository) => {
    return saveRepository(
      {
        liveCodingId,
        workspaceId,
      },
      JSON.stringify(repo)
    );
  };
  return {
    repository,
    loading,
    error,
    addFile,
    saveRepository: saveRepo,
    deleteFile,
  };
}
