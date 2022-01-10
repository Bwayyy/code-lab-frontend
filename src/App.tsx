import { useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./components/common/LoginPage";
import { LoggedInPageLayout } from "./components/common/LoggedInPageLayout";
import { WorkspaceList } from "./components/workspace/WorkspaceList";
import { Workspace } from "./components/workspace/Workspace";
import useUserData from "./hooks/useUserData";
import { appPaths } from "./utils/path";
import { LiveCodingSection } from "./components/live-coding/LiveCodingSection";
import { RegisterPage } from "./components/common/RegisterPage";
function App() {
  const { isLoggedin } = useUserData();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedin) {
      navigate(appPaths.workspaces);
    } else {
      navigate(appPaths.login);
    }
  }, []);
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
      </Routes>
    </div>
  );
}

export default App;
