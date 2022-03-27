import { Button, Dropdown, Menu, Row, Tree } from "antd";
import { FC, Key, useEffect, useState } from "react";
import useFileTree from "../../hooks/file-directory/useFileTree";
import {
  FileTreeNode,
  RepositoryFile,
} from "../../types/file-repository-types";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { InputPopover } from "../common/atoms/InputPopover";
import { KeyPressInput } from "../common/atoms/KeyPressInput";
import useFileTabs from "../../hooks/file-directory/useFileTabs";
const { DirectoryTree } = Tree;
const FileDirectory: FC = () => {
  const [rightClickKey, setRightClickKey] = useState<number>();
  const [renamingKey, setRenamingKey] = useState<number>();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [newEntityType, setNewEntityType] = useState<"file" | "folder">();
  const { root, add, rename, remove, getNode } = useFileTree();
  const [selectedKey, setSelectedKey] = useState<number>(0);
  const [selectedNode, setSelectedNode] = useState<FileTreeNode>();
  const { activeFile, addFileToTab } = useFileTabs();
  useEffect(() => {
    if (activeFile) {
      setSelectedKey(activeFile.key);
      setSelectedNode(getNode(activeFile.key));
    } else {
      setSelectedKey(0);
      setSelectedNode(undefined);
    }
  }, [activeFile]);
  const onSelect = (_selectedKeysValue: Key[], info: any) => {
    const { key, name, fileId, children } = info.node;
    const repoFile: RepositoryFile = { key, name, fileId, children };
    if (fileId) {
      addFileToTab(repoFile);
    }
    setSelectedNode(info.node);
    setSelectedKey(key);
  };
  const onAddNewItem = (name: string) => {
    let parent = selectedNode;
    if (selectedNode?.isLeaf) {
      parent = selectedNode?.parent;
    }
    if (newEntityType === "file") {
      add(parent, name, "file");
    } else if (newEntityType === "folder") {
      add(parent, name, "folder");
    }
    setPopoverVisible(false);
  };
  return (
    <>
      <Row justify="end" gutter={[12, 12]}>
        <InputPopover
          visible={popoverVisible}
          destory={() => setPopoverVisible(false)}
          onFinish={onAddNewItem}
        >
          <Button
            type="link"
            icon={<AiOutlineFileAdd size={24} />}
            onClick={() => {
              setNewEntityType("file");
              setPopoverVisible(true);
            }}
          ></Button>
          <Button
            type="link"
            icon={<AiOutlineFolderAdd size={24} />}
            onClick={() => {
              setNewEntityType("folder");
              setPopoverVisible(true);
            }}
          ></Button>
        </InputPopover>
      </Row>
      <DirectoryTree
        selectedKeys={[selectedKey]}
        treeData={root.children}
        multiple={false}
        onSelect={onSelect}
        titleRender={(node: any) => (
          <Dropdown
            overlay={
              <Menu
                onClick={() => {
                  setRightClickKey(undefined);
                }}
              >
                <Menu.Item
                  key="rename"
                  onClick={(e) => {
                    setRenamingKey(node.key);
                    e.domEvent.stopPropagation();
                  }}
                >
                  Rename
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  onClick={(e) => {
                    remove(node.key, node.fileId);
                    e.domEvent.stopPropagation();
                  }}
                  danger
                >
                  Delete
                </Menu.Item>
              </Menu>
            }
            trigger={["contextMenu"]}
            onVisibleChange={(visible) => {
              if (visible) {
                setRightClickKey(node.key);
              } else {
                setRightClickKey(undefined);
              }
            }}
          >
            {renamingKey && renamingKey === node.key ? (
              <KeyPressInput
                style={{ width: "calc(100% - 20px)", height: 20 }}
                destory={() => setRenamingKey(undefined)}
                onFinish={(name) => {
                  rename(renamingKey, name);
                  setRenamingKey(undefined);
                }}
              />
            ) : (
              <div
                style={{
                  display: "inline-block",
                  width: "calc(100% - 20px)",
                  border:
                    rightClickKey === node.key ? "solid black 1px" : "none",
                }}
              >
                {node.title}
              </div>
            )}
          </Dropdown>
        )}
      ></DirectoryTree>
    </>
  );
};

export default FileDirectory;
