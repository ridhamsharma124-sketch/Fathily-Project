
import ReactQuill from "react-quill-new";
import Quill from "quill";
import "react-quill-new/dist/quill.snow.css";

// Register numeric font sizes
const Size = Quill.import("attributors/style/size");

Size.whitelist = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
];

Quill.register(Size, true);

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start writing...",
  options = [
    ["bold", "italic", "underline"],
    ["link"],
    [{ list: "bullet" }],
  ],
  minHeight = 86,
}) {
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    // "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "font",
    "size",
    "script",
  ];

  return (
    <div
      className="compact-editor"
      style={{ "--editor-height": `${minHeight}px` }}
    >
      <style>{`
        .compact-editor {
          position: relative;
          width: 100%;
          border: 1px solid #E2DFFC;
          border-radius: 9px;
          overflow: visible;
          background: #fff;
          box-sizing: border-box;
        }

        /* Toolbar layout */
        .compact-editor .ql-toolbar.ql-snow {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          padding: 4px 8px;
          border: none;
          border-bottom: 1px solid #E2DFFC;
          border-radius: 9px 9px 0 0;
          background: #fff;
        }

        /* Toolbar groups */
        .compact-editor .ql-toolbar .ql-formats {
          display: inline-flex;
          align-items: center;
          margin: 0 5px 0 0;
        }

        /* Font and size dropdowns */
        .compact-editor .ql-toolbar .ql-picker {
          position: relative;
          color: #555;
          font-size: 11px;
        }

        .compact-editor .ql-toolbar .ql-picker-label {
          display: flex;
          align-items: center;
          height: 26px;
          padding: 3px 6px;
          border: 1px solid #E2DFFC;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .compact-editor .ql-toolbar .ql-picker-label:hover,
        .compact-editor .ql-toolbar .ql-picker-label.ql-active {
          border-color: #C9C0F5;
          color: #0A0847;
        }

        /* Numeric size dropdown and other picker options */
        .compact-editor .ql-toolbar .ql-picker-options {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          min-width: 100%;
          padding: 4px 0;
          border: 1px solid #E2DFFC;
          border-radius: 4px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(10, 8, 71, 0.10);
        }

        .compact-editor .ql-toolbar .ql-picker-item {
          padding: 5px 10px;
          font-size: 11px;
        }

        .compact-editor .ql-toolbar .ql-picker-item:hover {
          background: #F5F3FF;
          color: #0A0847;
        }

        /* Compact toolbar buttons */
        .compact-editor .ql-toolbar button {
          width: 24px;
          height: 26px;
          padding: 3px;
          border: 1px solid #CCCCCC;
          border-radius: 0;
          background: #EEEEEE;
          box-sizing: border-box;
        }

        .compact-editor .ql-toolbar button:first-child {
          border-radius: 3px 0 0 3px;
        }

        .compact-editor .ql-toolbar button:last-child {
          border-radius: 0 3px 3px 0;
        }

        .compact-editor .ql-toolbar button:hover,
        .compact-editor .ql-toolbar button.ql-active {
          background: #E5E7EB;
        }

        /* Toolbar icon colors */
        .compact-editor .ql-snow .ql-stroke {
          stroke: #555;
        }

        .compact-editor .ql-snow .ql-fill {
          fill: #555;
        }

        .compact-editor .ql-snow button:hover .ql-stroke,
        .compact-editor .ql-snow button.ql-active .ql-stroke {
          stroke: #0A0847;
        }

        .compact-editor .ql-snow button:hover .ql-fill,
        .compact-editor .ql-snow button.ql-active .ql-fill {
          fill: #0A0847;
        }

        /* Editor container */
        .compact-editor .ql-container.ql-snow {
          position: relative;
          z-index: 1;
          border: none;
          border-radius: 0 0 9px 9px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 400;
          color: #0A0847;
        }

        /* Editable text area */
        .compact-editor .ql-editor {
          min-height: var(--editor-height);
          padding: 17px 19px;
          line-height: 1.5;
          font-family: inherit;
          font-size: 12px;
          font-weight: 400;
          color: #0A0847;
          overflow-wrap: anywhere;
        }

        .compact-editor .ql-editor p {
          margin: 0;
        }

        /* Placeholder */
        .compact-editor .ql-editor.ql-blank::before {
          left: 19px;
          right: 19px;
          color: #9294B4;
          font-style: normal;
          font-weight: 400;
        }

        /* Link tooltip */
        .compact-editor .ql-tooltip {
          z-index: 1001;
        }

        /* Images */
        .compact-editor .ql-editor img {
          max-width: 100%;
          height: auto;
        }

        /* Display numeric font sizes in the dropdown */
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "Normal";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
  content: "28px";
}

.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
.compact-editor .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  content: "32px";
}
      `}</style>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{ toolbar: options }}
        formats={formats}
      />
    </div>
  );
}
