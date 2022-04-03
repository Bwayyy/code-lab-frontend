import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/common/LoginPage";
import { LoggedInPageLayout } from "./components/common/LoggedInPageLayout";
import { WorkspaceList } from "./components/workspace/WorkspaceList";
import { Workspace } from "./components/workspace/Workspace";
import { appPaths } from "./utils/path";
import { LiveCodingSection } from "./components/live-coding/LiveCodingSection";
import { RegisterPage } from "./components/common/RegisterPage";
import { AssignmentDetailPage } from "./components/assignment/AssignmentDetailPage";
import { AssignmentGradingPage } from "./components/assignment/AssignmentGradingPage";
import useInitReduxStoreFromURL from "./hooks/useInitReduxStoreFromURL";
import InvitationPage from "./components/workspace/InvitationPage";
import { AskForLogin } from "./components/common/AskForLogin";
function App() {
  useInitReduxStoreFromURL();
  return (
    <div className="App">
      <Routes>
        <Route path={appPaths.login} element={<LoginPage />}></Route>
        <Route path={appPaths.register} element={<RegisterPage />} />
        <Route
          path={appPaths.workspaces}
          element={
            <LoggedInPageLayout>
              <WorkspaceList />
            </LoggedInPageLayout>
          }
        ></Route>
        <Route
          path={appPaths.workspaceDetail}
          element={
            <LoggedInPageLayout>
              <Workspace />
            </LoggedInPageLayout>
          }
        ></Route>
        <Route
          path={appPaths.liveCoding}
          element={
            <LoggedInPageLayout>
              <LiveCodingSection />
            </LoggedInPageLayout>
          }
        ></Route>
        <Route
          path={appPaths.assignmentDetail}
          element={
            <LoggedInPageLayout>
              <AssignmentDetailPage></AssignmentDetailPage>
            </LoggedInPageLayout>
          }
        />
        <Route
          path={appPaths.assignmentGrading}
          element={
            <LoggedInPageLayout>
              <AssignmentGradingPage></AssignmentGradingPage>
            </LoggedInPageLayout>
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
