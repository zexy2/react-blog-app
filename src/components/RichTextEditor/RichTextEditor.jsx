/**
 * RichTextEditor Component
 * TipTap-based rich text editor with formatting tools
 */

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import styles from './RichTextEditor.module.css';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    {
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      icon: 'B',
      title: 'Bold',
      className: styles.bold,
    },
    {
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      icon: 'I',
      title: 'Italic',
      className: styles.italic,
    },
    {
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      icon: 'S',
      title: 'Strikethrough',
      className: styles.strike,
    },
    {
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      icon: '</>',
      title: 'Code',
    },
    { type: 'divider' },
    {
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      icon: 'H1',
      title: 'Heading 1',
    },
    {
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      icon: 'H2',
      title: 'Heading 2',
    },
    {
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      icon: 'H3',
      title: 'Heading 3',
    },
    { type: 'divider' },
    {
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      icon: '•',
      title: 'Bullet List',
    },
    {
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      icon: '1.',
      title: 'Numbered List',
    },
    {
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      icon: '"',
      title: 'Quote',
    },
    {
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
      icon: '{ }',
      title: 'Code Block',
    },
    { type: 'divider' },
    {
      action: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
      icon: '↩',
      title: 'Undo',
    },
    {
      action: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
      icon: '↪',
      title: 'Redo',
    },
  ];

  return (
    <div className={styles.menuBar}>
      {buttons.map((button, index) => {
        if (button.type === 'divider') {
          return <div key={index} className={styles.divider} />;
        }

        return (
          <button
            key={index}
            type="button"
            onClick={button.action}
            disabled={button.disabled}
            className={`${styles.menuButton} ${button.isActive ? styles.active : ''} ${button.className || ''}`}
            title={button.title}
          >
            {button.icon}
          </button>
        );
      })}
    </div>
  );
};

const RichTextEditor = ({
  content = '',
  onChange,
  placeholder = 'İçeriğinizi buraya yazın...',
  minHeight = 200,
  maxHeight = 500,
  readOnly = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange({
          html: editor.getHTML(),
          text: editor.getText(),
          json: editor.getJSON(),
        });
      }
    },
  });

  return (
    <div className={styles.editor}>
      {!readOnly && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className={styles.content}
        style={{ minHeight, maxHeight }}
      />
    </div>
  );
};

export default RichTextEditor;
