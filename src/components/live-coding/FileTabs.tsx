import { Tabs } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import useFileTabs from "../../hooks/file-directory/useFileTabs";
import { RootState } from "../../store";
const { TabPane } = Tabs;
export const FileTabs: FC = () => {
  const { remove: removeTab, onTabClick } = useFileTabs();
  const files = useSelector(
    (state: RootState) => state.fileRepository.tabFiles
  );
  const activeTabKey = useSelector(
    (state: RootState) => state.fileRepository.activeTabKey
  );
  const onEdit = (targetKey: any, action: any) => {
    if (action === "remove") {
      removeTab(parseInt(targetKey));
    }
  };
  return (
    <div style={{ minHeight: 32, backgroundColor: "grey" }}>
      <Tabs
        tabBarStyle={{ marginBottom: 0 }}
        hideAdd
        activeKey={activeTabKey ? activeTabKey.toString() : ""}
        onChange={(key) => onTabClick(parseInt(key))}
        type="editable-card"
        onEdit={onEdit}
      >
        {files.map((file) => (
          <TabPane key={file.key} tab={file.name} />
        ))}
      </Tabs>
    </div>
  );
};
