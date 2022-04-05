import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/common/LoginPage";
import { LoggedInPageLayout } from "./components/common/LoggedInPageLayout";
import { WorkspaceList } from "./components/workspace/WorkspaceList";
import { Workspace } from "./components/workspace/Workspace";
import { appPaths } from "./utils/path";
import { LiveCodingSection } from "./components/live-coding/LiveCodingSection";
import { RegisterPage } from "./components/common/RegisterPage";
import { AssignmentDetailPage } from "./components/assignment/AssignmentDetailPage";
import { AssignmentGradingPage } from "./components/assignment/AssignmentGradingPage";
import InvitationPage from "./components/workspace/InvitationPage";
import { AskForLogin } from "./components/common/AskForLogin";
import useUserData from "./hooks/useUserData";
import useAuth from "./hooks/useAuth";
function App() {
  useAuth();
  const { isLoggedin } = useUserData();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isLoggedin ? appPaths.login : appPaths.workspaces} />
          }
        ></Route>
        <Route path={appPaths.login} element={<LoginPage />}></Route>
        <Route path={appPaths.register} element={<RegisterPage />} />
        <Route
          path={appPaths.workspaces}
          element={
            <AskForLogin>
              <LoggedInPageLayout>
                <WorkspaceList />
              </LoggedInPageLayout>
            </AskForLogin>
          }
        ></Route>
        <Route
          path={appPaths.workspaceDetail}
          element={
            <AskForLogin>
              <LoggedInPageLayout>
                <Workspace />
              </LoggedInPageLayout>
            </AskForLogin>
          }
        ></Route>
        <Route
          path={appPaths.liveCoding}
          element={
            <AskForLogin>
              <LoggedInPageLayout>
                <LiveCodingSection />
              </LoggedInPageLayout>
            </AskForLogin>
          }
        ></Route>
        <Route
          path={appPaths.assignmentDetail}
          element={
            <AskForLogin>
              <LoggedInPageLayout>
                <AssignmentDetailPage></AssignmentDetailPage>
              </LoggedInPageLayout>
            </AskForLogin>
          }
        />
        <Route
          path={appPaths.assignmentGrading}
          element={
            <AskForLogin>
              <LoggedInPageLayout>
                <AssignmentGradingPage></AssignmentGradingPage>
              </LoggedInPageLayout>
            </AskForLogin>
          }
        />
        <Route
          path={appPaths.workspaceInvitation}
          element={
            <AskForLogin>
              <InvitationPage></InvitationPage>
            </AskForLogin>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
