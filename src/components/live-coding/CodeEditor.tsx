import { FC, useEffect, useState } from "react";
import { Col, Row } from "antd";
import FileDirectory from "./FileDirectory";
import useYjs from "../../hooks/collaborative-editing/useYjs";
import { FileTabs } from "./FileTabs";
import useRoomName from "../../hooks/collaborative-editing/useRoomName";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { CodeMirrorBinding } from "y-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/r/r.js";
import "codemirror/mode/ruby/ruby.js";
import useFileTabs from "../../hooks/file-directory/useFileTabs";
import useCodeLanguage from "../../hooks/code-editor/useCodeLanguage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LiveCodingRoom } from "../../types/live-coding-types";

const CodeEditor: FC<{
  liveCoding?: LiveCodingRoom;
  offlineEditing: boolean;
}> = ({ liveCoding, offlineEditing }) => {
  const permission = useSelector(
    (state: RootState) => state.liveCoding.roomPermission
  );
  const [editor, setEditor] = useState<any>();
  const { activeFile } = useFileTabs();
  const language = useCodeLanguage(activeFile?.name);
  const { fileRoomName } = useRoomName();
  const { doc, provider } = useYjs({ room: fileRoomName });
  useEffect(() => {
    if (doc && provider && editor) {
      new CodeMirrorBinding(
        doc.getText("codemirror"),
        editor,
        provider.awareness
      );
    }
  }, [doc, provider, editor]);
  const canWrite =
    offlineEditing ||
    (liveCoding?.isLive && permission?.write && activeFile !== undefined);
  return (
    <Row style={{ width: "100%" }} gutter={[12, 0]}>
      <Col span={6}>
        <FileDirectory />
      </Col>
      <Col span={18}>
        <FileTabs />
        <CodeMirror
          options={{
            readOnly: !canWrite ? "nocursor" : false,
            mode: language,
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
