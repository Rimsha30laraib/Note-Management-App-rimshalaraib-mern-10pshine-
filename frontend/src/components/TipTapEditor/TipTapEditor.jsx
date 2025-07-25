import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";

const TiptapEditor = ({ value, onChange }) => {
  const [selectionEmpty, setSelectionEmpty] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const updateSelectionStatus = () => {
      const { from, to } = editor.state.selection;
      setSelectionEmpty(from === to);
    };

    editor.on("selectionUpdate", updateSelectionStatus);

    return () => {
      editor.off("selectionUpdate", updateSelectionStatus);
    };
  }, [editor]);

  if (!editor) return null;

  const getButtonClass = (isActive) =>
    `${isActive && !selectionEmpty ? "bg-purple-600 text-white" : "bg-purple-200 text-black"} px-3 py-1 rounded text-sm`;

  const handleHeadingChange = (e) => {
    const level = parseInt(e.target.value);
    if (!isNaN(level)) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  useEffect(() => {
  if (editor && value !== editor.getHTML()) {
    editor.commands.setContent(value);
  }
}, [value, editor]);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded shadow items-center">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getButtonClass(editor.isActive("bold"))}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getButtonClass(editor.isActive("italic"))}
        >
          Italic
        </button>

        {/* Heading Dropdown */}
        <select
          onChange={handleHeadingChange}
          value={
            editor.isActive("heading", { level: 1 }) ? "1" :
            editor.isActive("heading", { level: 2 }) ? "2" :
            editor.isActive("heading", { level: 3 }) ? "3" :
            editor.isActive("heading", { level: 4 }) ? "4" :
            editor.isActive("heading", { level: 5 }) ? "5" :
            editor.isActive("heading", { level: 6 }) ? "6" : ""
          }
          className="px-2 py-1 rounded bg-purple-200 text-sm text-black"
        >
          <option value="">Normal</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        {/* Uppercase */}
        <button
          onClick={() => {
            const { from, to } = editor.state.selection;
            const selected = editor.state.doc.textBetween(from, to);
            if (selected) {
              editor.commands.insertContentAt({ from, to }, selected.toUpperCase());
            }
          }}
          className={getButtonClass(false)}
        >
          Uppercase
        </button>

        {/* Lowercase */}
        <button
          onClick={() => {
            const { from, to } = editor.state.selection;
            const selected = editor.state.doc.textBetween(from, to);
            if (selected) {
              editor.commands.insertContentAt({ from, to }, selected.toLowerCase());
            }
          }}
          className={getButtonClass(false)}
        >
          Lowercase
        </button>
      </div>

      {/* Editor Content */}
      <div className="prose max-w-none bg-white p-3 rounded shadow min-h-[200px] text-black">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
