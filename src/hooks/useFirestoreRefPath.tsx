export default function useFirestoreRefPath() {
  const getWorkspaceDocPath = (workspaceId: string) => {
    return "workspaces/" + workspaceId;
  };
  const getWorkspaceMemberCollectionPath = () => {
    return `workspace_members`;
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
  const getAssignmentPath = (workspaceId: string) => {
    return `workspaces/${workspaceId}/assignments`;
  };
  const getAssignmentDocPath = (
    workspacePath: string,
    assignmentId: string
  ) => {
    return workspacePath + "/assignments/" + assignmentId;
  };
  const getLiveCodingRepositoryCollectionPath = (liveCodingPath: string) => {
    return `${liveCodingPath}/repository`;
  };
  const getLiveCodingDocPath = (
    workspacePath: string,
    liveCodingId: string
  ) => {
    return workspacePath + "/liveCodings/" + liveCodingId;
  };
  const getLiveCodingCollectionPath = (workspacePath: string) => {
    return workspacePath + "/liveCodings";
  };
  const getUserPermissionPath = (liveCodingPath: string) => {
    return liveCodingPath + "/userPermission";
  };
  const getAssignmentSubmissionPath = (assignmentPath: string) => {
    return assignmentPath + "/submissions";
  };
  return {
    getWorkspaceDocPath,
    getAssignmentPath,
    getLiveCodingRepositoryCollectionPath,
    getLiveCodingFileCollectionPath,
    getLiveCodingRepoItemPath,
    getLiveCodingDocPath,
    getLiveCodingCollectionPath,
    getWorkspaceMemberCollectionPath,
    getUserPermissionPath,
    getAssignmentSubmissionPath,
    getAssignmentDocPath,
  };
}
