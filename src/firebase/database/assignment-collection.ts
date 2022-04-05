import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  setDoc,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import useFirestoreErrorMessaging from "../../hooks/useFirestoreErrorMessaging";
import { Assignment } from "../../types/assignment-types";
import {
  transformAssignment,
  transformAssignmentSubmission,
} from "../data-transform/assignments-transform";
import { fireStore } from "../firebaseApp";
import {
  firestoreFetchOptions,
  WorkspaceCollections,
} from "./workspace-collection";

const collections = {
  assignments: {
    get: (workspaceId: string) =>
      collection(
        fireStore,
        WorkspaceCollections.workspaces.get().path +
          "/" +
          workspaceId +
          "/assignments"
      ),
    getDoc: (workspaceId: string, assignmentId: string) =>
      doc(
        fireStore,
        collections.assignments.get(workspaceId).path,
        assignmentId
      ),
  },
  submissions: {
    get: (workspaceId: string, assignmentId: string) =>
      collection(
        fireStore,
        collections.assignments.get(workspaceId).path +
          "/" +
          assignmentId +
          "/submissions"
      ),
  },
};
type Parent = {
  workspaceId?: string;
  assignmentId?: string;
};

export const useAssignmentsQuery = (workspaceId?: string) => {
  const col = workspaceId ? collections.assignments.get(workspaceId) : null;
  const [data, loading, error] = useCollectionData(col, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    assignments: data?.map((x) => transformAssignment(x)),
    loading,
    error,
  };
};

export const useAssignmentSubmissionsQuery = ({
  workspaceId,
  assignmentId,
}: Parent) => {
  let col = null;
  if (workspaceId && assignmentId) {
    col = collections.submissions.get(workspaceId, assignmentId);
  }
  const [data, loading, error] = useCollectionData(col, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    submissions: data?.map((x) => transformAssignmentSubmission(x)),
    loading,
    error,
  };
};
export const useSubmissionDocByIdQuery = (
  { workspaceId, assignmentId }: Parent,
  userId?: string
) => {
  let docRef = null;
  if (workspaceId && assignmentId && userId) {
    const path =
      collections.submissions.get(workspaceId, assignmentId).path +
      "/" +
      userId;
    docRef = doc(fireStore, path);
  }
  const [data, loading, error] = useDocumentData(docRef, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    submission: data ? transformAssignmentSubmission(data) : undefined,
    loading,
    error,
  };
};

export const useAssignmentDocByIdQuery = ({
  workspaceId,
  assignmentId,
}: Parent) => {
  let docRef = null;
  if (workspaceId && assignmentId) {
    docRef = collections.assignments.getDoc(workspaceId, assignmentId);
  }
  const [data, loading, error] = useDocumentData(docRef, firestoreFetchOptions);
  useFirestoreErrorMessaging(error);
  return {
    assignment: data ? transformAssignment(data) : undefined,
    loading,
    error,
  };
};

export const createAssignemnt = (
  { workspaceId, assignmentId }: Parent,
  data: Assignment
) => {
  if (workspaceId && assignmentId) {
    const col = collections.assignments.get(workspaceId);
    return addDoc(col, data);
  }
};

export const updateAssignment = (assignment: Assignment) => {
  return setDoc(assignment.ref, {
    name: assignment.name,
    objective: assignment.objective,
    deadline: assignment.deadline,
    maxScore: assignment.maxScore,
  });
};
export const deleteAssignment = (ref: DocumentReference) => {
  return deleteDoc(ref);
};
