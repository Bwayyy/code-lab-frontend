export default function useFirestoreRefPath() {
  const getLiveCodingFileCollectionPath = (
    workspaceId: string,
    liveCodingId: string
  ) => {
    return `/workspaces/${workspaceId}/liveCodings/${liveCodingId}/repository/0/files`;
  };
  const getLiveCodingRepoItemPath = (
    workspaceId: string,
    liveCodingId: string
  ) => {
    return `workspaces/${workspaceId}/liveCodings/${liveCodingId}/repository/0`;
  };
  const getLiveCodingRepositoryCollectionPath = (liveCodingPath: string) => {
    return `${liveCodingPath}/repository`;
  };
  const getLiveCodingCollectionPath = (workspacePath: string) => {
    return workspacePath + "/liveCodings";
  };
  return {
    getLiveCodingRepositoryCollectionPath,
    getLiveCodingFileCollectionPath,
    getLiveCodingRepoItemPath,
    getLiveCodingCollectionPath,
  };
}
