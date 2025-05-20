/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";

import { useCallback, useRef, useState } from "react";

type Props = {
  content: string;
  onChange: (content: string) => void;
};

const TiptapEditor = ({ content, onChange }: Props) => {
  const [showPreview, setShowPreview] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image,
      Highlight,
      Heading.configure({
        levels: [1, 2, 3],
      }), 
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  

  const insertImageFromUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        editor.chain().focus().setImage({ src: base64 as string }).run();
      };
      reader.readAsDataURL(file);
    },
    [editor]
  );

  const addLink = useCallback(() => {
    if (!editor) return;
  
    const previousUrl = editor.getAttributes("link").href;
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to
    );
  
    const url = prompt("Enter URL:", previousUrl || "https://");
  
    if (url === null) return;
  
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
  
    // If there's no text selected, insert the URL as text
    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
        .run();
    } else {
      // If text is selected, apply link mark to it
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);
  
  

  const addHighlight = () => {
    editor?.chain().focus().toggleHighlight().run();
  };

  const openImageUpload = () => {
    imageInputRef.current?.click();
  };

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-t-md p-2 bg-gray-100 dark:bg-gray-700">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive("bold"))}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive("italic"))}>Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive("underline"))}>Underline</button>
        <button type="button" onClick={addHighlight} className={btnClass(editor.isActive("highlight"))}>Highlight</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({level: 2 }).run()} className={btnClass(editor.isActive("heading", { level: 2 }))}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive("bulletList"))}>Bullet List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive("orderedList"))}>Numbered List</button>
        <button type="button" onClick={addLink} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Link</button>
        <button type="button" onClick={openImageUpload} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Upload Image</button>

        {/* Alignment */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={btnClass(editor.isActive({ textAlign: "left" }))}>Left</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={btnClass(editor.isActive({ textAlign: "center" }))}>Center</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={btnClass(editor.isActive({ textAlign: "right" }))}>Right</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()} className={btnClass(editor.isActive({ textAlign: "justify" }))}>Justify</button>

        <button type="button" onClick={() => setShowPreview(!showPreview)} className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">
          {showPreview ? "Hide" : "Show"} Preview
        </button>

        <input type="file" accept="image/*" ref={imageInputRef} onChange={insertImageFromUpload} className="hidden" />
      </div>

      {/* Editor Body */}
      <div className="border border-t-0 rounded-b-md p-4 dark:bg-gray-800 bg-white min-h-[150px]">
        <EditorContent editor={editor} />
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="mt-6 border p-4 rounded bg-gray-100 dark:bg-gray-900">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Live HTML Preview</h2>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
          />
        </div>
      )}
    </div>
  );
};

// Styling helper
const btnClass = (active: boolean) =>
  `px-2 py-1 rounded text-sm font-medium ${
    active ? "bg-gray-300 dark:bg-gray-600" : "bg-white dark:bg-gray-800"
  } hover:bg-gray-200 dark:hover:bg-gray-700`;

export default TiptapEditor;