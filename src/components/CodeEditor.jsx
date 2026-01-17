import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {
  return (
    <Editor
      height="200px"
      defaultLanguage="javascript"
      value={code}
      onChange={(val) => setCode(val || "")}
      theme="vs-dark"
    />
  );
}

export default CodeEditor;