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
  return { getLiveCodingFileCollectionPath, getLiveCodingRepoItemPath };
}
