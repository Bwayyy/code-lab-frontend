import { Button, Row, Tree } from "antd";
import { FC, Key, useState } from "react";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";
import useFileTree from "../../hooks/file-directory/useFileTree";
import { RepositoryFile } from "../../types/file-repository-types";
import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  addFileToTab,
  setActiveTabKey,
} from "../../reducers/FileRepositorySlice";
const FileDirectory: FC = () => {
  const dispatch = useDispatch();
  const { repository } = useFileTree();
  const [selectedNode, setSelectedNode] = useState<RepositoryFile>();
  const onSelect = (selectedKeysValue: Key[], info: any) => {
    const { key, name, fileId, childrens } = info.node;
    const repoFile: RepositoryFile = { key, name, fileId, childrens };
    if (!childrens) {
      dispatch(addFileToTab(repoFile));
      dispatch(setActiveTabKey(repoFile.key));
    } else {
      setSelectedNode(repoFile);
    }
  };
  const onAddFile = () => {};
  const onAddFolder = () => {};
  return (
    <>
      <Row justify="end" gutter={[12, 12]}>
        <Button
          type="link"
          icon={<AiFillFileAdd size={24} />}
          onClick={() => onAddFile()}
        ></Button>
        <Button
          type="link"
          icon={<AiFillFolderAdd size={24} />}
          onClick={() => onAddFolder()}
        ></Button>
      </Row>
      <Tree
        treeData={repository as any}
        showLine
        fieldNames={{ title: "name", children: "childrens" }}
        // showIcon
        multiple={false}
        icon={(item: RepositoryFile) => {
          if (item.childrens) return <FileOutlined />;
          else return <FolderOutlined />;
        }}
        onSelect={onSelect}
      />
    </>
  );
};

export default FileDirectory;
