import { FC, useEffect, useState } from "react";
import { Col, Row } from "antd";
import FileDirectory from "./FileDirectory";
import useCollaborativeEditing from "../../hooks/collaborative-editing/useCollaborativeEditing";
import { FileTabs } from "./FileTabs";
import useRoomName from "../../hooks/collaborative-editing/useRoomName";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { CodeMirrorBinding } from "y-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
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
      new CodeMirrorBinding(
        doc.getText("codemirror"),
        editor,
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
        <CodeMirror
          options={{
            mode: "xml",
            theme: "material",
            lineNumbers: true,
          }}
          editorDidMount={(editor) => {
            setEditor(editor);
          }}
        />
      </Col>
    </Row>
  );
};
export default CodeEditor;
