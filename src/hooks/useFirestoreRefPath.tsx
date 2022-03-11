export default function useFirestoreRefPath() {
  const getWorkspaceMemberRoleCollectionPath = (workspaceId: string) => {
    return `workspaces/${workspaceId}/memberRoles`;
  };
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
  const getUserPermissionPath = (liveCodingPath: string) => {
    return liveCodingPath + "/userPermission";
  };
  return {
    getLiveCodingRepositoryCollectionPath,
    getLiveCodingFileCollectionPath,
    getLiveCodingRepoItemPath,
    getLiveCodingCollectionPath,
    getWorkspaceMemberRoleCollectionPath,
    getUserPermissionPath,
  };
}
