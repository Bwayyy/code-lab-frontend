import { Button, Dropdown, Menu, Row, Tree } from "antd";
import { FC, Key, useEffect, useState } from "react";
import useFileTree from "../../hooks/file-directory/useFileTree";
import {
  FileTreeNode,
  RepositoryFile,
} from "../../types/file-repository-types";
import { InputPopover } from "../common/atoms/InputPopover";
import { KeyPressInput } from "../common/atoms/KeyPressInput";
import useFileTabs from "../../hooks/file-directory/useFileTabs";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
const { DirectoryTree } = Tree;
const FileDirectory: FC = () => {
  const [inputInitialValue, setInputInitialValue] = useState("");
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
    <div className="wrapper">
      <Row justify="end" gutter={[12, 12]}>
        <InputPopover
          visible={popoverVisible}
          destory={() => setPopoverVisible(false)}
          onFinish={onAddNewItem}
        >
          <Button
            type="link"
            icon={<FileAddOutlined style={{ fontSize: 18 }} />}
            onClick={() => {
              setNewEntityType("file");
              setPopoverVisible(true);
            }}
          >
            New File
          </Button>
          <Button
            type="link"
            icon={<FolderAddOutlined style={{ fontSize: 18 }} />}
            onClick={() => {
              setNewEntityType("folder");
              setPopoverVisible(true);
            }}
          >
            New Folder
          </Button>
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
              <Menu>
                <Menu.Item
                  key="rename"
                  onClick={(e) => {
                    setInputInitialValue(node.name);
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
          >
            {renamingKey && renamingKey === node.key ? (
              <KeyPressInput
                initialValue={inputInitialValue}
                style={{ width: "calc(100% - 24px)" }}
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
                  width: "calc(100% - 24px)",
                }}
              >
                {node.title}
              </div>
            )}
          </Dropdown>
        )}
      ></DirectoryTree>
    </div>
  );
};

export default FileDirectory;
