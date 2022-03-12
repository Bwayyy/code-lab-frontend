export default function useFirebaseStoragePath() {
  const getAssignmentSubmissionFolderPath = (
    workspaceId: string,
    assignmentId: string,
    userId: string
  ) => {
    return `workspaces/${workspaceId}/assignments/${assignmentId}/${userId}`;
  };
  return { getAssignmentSubmissionFolderPath };
}
