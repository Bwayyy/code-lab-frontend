import { Tabs } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTab, setActiveTabKey } from "../../reducers/FileRepositorySlice";
import { RootState } from "../../store";
const { TabPane } = Tabs;
export const FileTabs: FC = () => {
  const dispatch = useDispatch();
  const files = useSelector(
    (state: RootState) => state.fileRepository.tabFiles
  );
  const activeTabKey = useSelector(
    (state: RootState) => state.fileRepository.activeTabKey
  );
  const onEdit = (targetKey: any, action: any) => {
    if (action === "remove") {
      dispatch(removeTab(parseInt(targetKey)));
    }
  };
  return (
    <Tabs
      hideAdd
      //   onChange={this.onChange}
      activeKey={activeTabKey?.toString()}
      onChange={(key) => dispatch(setActiveTabKey(parseInt(key)))}
      type="editable-card"
      onEdit={onEdit}
    >
      {files.map((file) => (
        <TabPane key={file.key} tab={file.name} />
      ))}
    </Tabs>
  );
};
