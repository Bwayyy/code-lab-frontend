import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/common/LoginPage";
import { PageLayout } from "./components/common/PageLayout";
import { WorkspaceList } from "./components/workspace/WorkspaceList";
import { Workspace } from "./components/workspace/Workspace";
import { appPaths } from "./utils/path";
import { LiveCodingSection } from "./components/live-coding/LiveCodingSection";
import { RegisterPage } from "./components/common/RegisterPage";
import InvitationPage from "./components/workspace/InvitationPage";
import { AskForLogin } from "./components/common/AskForLogin";
import useUserData from "./hooks/useUserData";
import useAuth from "./hooks/useAuth";
import { AssignmentPage } from "./components/assignment/AssignmentPage";
import LoadingPage from "./components/common/LoadingPage";
function App() {
  useAuth();
  const { loading, isLoggedin } = useUserData();
  if (loading) return <LoadingPage />;
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isLoggedin ? appPaths.workspaces : appPaths.login} />
          }
        ></Route>
        <Route path={appPaths.login} element={<LoginPage />}></Route>
        <Route path={appPaths.register} element={<RegisterPage />} />
        <Route
          path={appPaths.workspaces}
          element={
            <AskForLogin>
              <PageLayout>
                <WorkspaceList />
              </PageLayout>
            </AskForLogin>
          }
        ></Route>
        <Route
          path={appPaths.workspaceDetail}
          element={
            <AskForLogin>
              <PageLayout>
                <Workspace />
              </PageLayout>
            </AskForLogin>
          }
        ></Route>
        <Route
          path={appPaths.liveCoding}
          element={
            <AskForLogin>
              <PageLayout>
                <LiveCodingSection />
              </PageLayout>
            </AskForLogin>
          }
        ></Route>
        <Route
          path={appPaths.assignment}
          element={
            <AskForLogin>
              <PageLayout>
                <AssignmentPage></AssignmentPage>
              </PageLayout>
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
