import { FC, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Col, Row } from "antd";
import FileDirectory from "./FileDirectory";
import useCollaborativeEditing from "../../hooks/collaborative-editing/useCollaborativeEditing";
import { EditorConfig } from "../../hooks/code-editor/editor-config";
import { FileTabs } from "./FileTabs";
import useRoomName from "../../hooks/collaborative-editing/useRoomName";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Y } from "@syncedstore/core";
const { MonacoBinding } = require("y-monaco");
const CodeEditor: FC = () => {
  const [editor, setEditor] = useState<any>();
  const { roomName } = useRoomName();
  const { doc, provider } = useCollaborativeEditing({
    room: roomName,
    text: "",
  });
  useEffect(() => {
    console.log({ doc, provider, editor });
    if (doc && provider && editor) {
      new MonacoBinding(
        doc.getText("monaco"),
        editor.getModel(),
        new Set([editor]),
        provider.awareness
      );
    }
  }, [doc, provider, editor]);
  return (
    <Row style={{ width: "100%" }} gutter={[12, 0]}>
      <Col span={6}>
        <FileDirectory />
      </Col>
      <Col span={18}>
        <FileTabs />
        <Editor
          height="90vh"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// Some comment"
          options={EditorConfig}
          onMount={(editor, monaco) => {
            setEditor(editor);
          }}
        />
      </Col>
    </Row>
  );
};
export default CodeEditor;
