import { FC } from "react";
import { useParams } from "react-router-dom";
import { useUserMemberForWorkspaceQuery } from "../../firebase/database/workspace-collection";
import useUserData from "../../hooks/useUserData";
import LoadingPage from "../common/LoadingPage";
import { AssignmentDetailPage } from "./AssignmentDetailPage";
import { AssignmentGradingPage } from "./AssignmentGradingPage";

export const AssignmentPage: FC = () => {
  const { userData } = useUserData();
  const { workspaceId } = useParams();
  const { memberships, loading } = useUserMemberForWorkspaceQuery(
    workspaceId,
    userData?.id
  );
  if (loading) return <LoadingPage />;
  if (memberships && memberships[0] && memberships[0].role === "admin") {
    return <AssignmentGradingPage />;
  }
  return <AssignmentDetailPage />;
};
