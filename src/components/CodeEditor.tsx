import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
}

export default function CodeEditor({ code }: CodeEditorProps) {
  return (
    <div className="h-[500px]">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900">Generated Robot Code</h4>
        <p className="text-xs text-slate-600 mt-1">
          Python implementation ready for deployment
        </p>
      </div>
      <Editor
        height="calc(100% - 57px)"
        defaultLanguage="python"
        value={code}
        theme="vs-dark"
        options={{
          readOnly: false,
          minimap: { enabled: true },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
        }}
      />
    </div>
  );
}
