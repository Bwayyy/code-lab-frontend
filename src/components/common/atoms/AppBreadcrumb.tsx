import { Breadcrumb } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../../store";
import { appPaths } from "../../../utils/path";
export const AppBreadcrumb: FC = () => {
  const workspace = useSelector(
    (state: RootState) => state.workspaces.currentWorkspace
  );
  const assignment = useSelector(
    (state: RootState) => state.assignments.currentAssignment
  );
  const liveCoding = useSelector(
    (state: RootState) => state.liveCoding.currentRoom
  );
  const replaceId = (path: string) => {
    return path
      .replace(":workspaceId", workspace?.id ?? "")
      .replace(":liveCodingId", liveCoding?.id ?? "")
      .replace(":assignmentId", assignment?.id ?? "");
  };
  const breadcrumbNameMap = {
    [replaceId(appPaths.workspaces)]: "Workspaces",
    [replaceId(appPaths.workspaceDetail)]: workspace?.name,
    [replaceId(appPaths.liveCoding)]: `LiveCoding - ${liveCoding?.name}`,
    [replaceId(appPaths.assignment)]: `Assignment - ${assignment?.name}`,
  };
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    if (breadcrumbNameMap[url] === undefined) return null;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = extraBreadcrumbItems;
  return (
    <Breadcrumb
      separator=">"
      style={{
        fontSize: 18,
        backgroundColor: "rgba(17, 128, 96,0.3)",
        padding: "12px 24px",
      }}
    >
      {breadcrumbItems}
    </Breadcrumb>
  );
};
