"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, language = "python", onChange }) {

    const handleEditorChange = (value) => {
        onChange(value);
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] rounded-lg overflow-hidden border border-border">
            <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    padding: { top: 16 },
                    fontFamily: "var(--font-mono)",
                }}
            />
        </div>
    );
}
