import { useState, type MouseEvent } from "react";
import { usePostIts } from "../context/postits-context-provider";
import {
  BG_COLORS,
  INITIAL_BG_COLOR,
  INITIAL_TEXT_COLOR,
  TEXT_COLORS,
} from "../../constants/colors";
import type { PostIt } from "../../types/PostIt";

type CreateOrEditLayoutType = {
  data: { type: "create" } | { type: "edit"; postIt: PostIt };
  close: () => void;
};

export default function CreateOrEditLayout({
  data,
  close,
}: CreateOrEditLayoutType) {
  const { nextId, addPostIt, deletePostIt, editPostIt } = usePostIts();
  const [content, setContent] = useState(
    data.type === "edit" ? data.postIt.content : "",
  );
  const [bgColor, setBgColor] = useState<string>(
    data.type === "edit" ? data.postIt.bgColor : INITIAL_BG_COLOR,
  );
  const [textColor, setTextColor] = useState<string>(
    data.type === "edit" ? data.postIt.textColor : INITIAL_TEXT_COLOR,
  );

  const handleCreate = () => {
    addPostIt({
      id: nextId,
      content,
      bgColor,
      textColor,
      createdAt: Date.now(),
      rotation: `rotate(${Math.random() * 10 - 5}deg)`,
    });
    close();
  };

  const handleDelete = () => {
    if (data.type === "edit") {
      deletePostIt(data.postIt.id);
      close();
    }
  };

  const handleEdit = () => {
    if (data.type === "edit") {
      editPostIt({
        ...data.postIt,
        content,
        bgColor,
        textColor,
        lastModifiedAt: Date.now(),
      });
      close();
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="z-100 fixed inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-lg m-0"
    >
      <div className="w-full max-w-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white text-center">Background Color</h4>
            <div className="flex items-center gap-2 mt-1">
              {BG_COLORS.map((color) => (
                <div
                  key={color}
                  style={{ background: color }}
                  className={`${color === bgColor ? "border-4 cursor-not-allowed" : "hover:scale-125 cursor-pointer"} w-7 h-7`}
                  onClick={() => setBgColor(color)}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-center">Text Color</h4>
            <div className="flex items-center gap-2">
              {TEXT_COLORS.map((color) => (
                <div
                  key={color}
                  style={{ background: color }}
                  className={`${color === textColor ? `border-4 cursor-not-allowed ${textColor === "#000000" && "border-white"}` : "hover:scale-125 cursor-pointer"} w-7 h-7`}
                  onClick={() => setTextColor(color)}
                />
              ))}
            </div>
          </div>
        </div>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Type here..."
          style={{ background: bgColor, color: textColor }}
          className={`w-full aspect-square mt-4 pt-[15%] p-[5%] text-3xl resize-none placeholder:text-black/10 focus:outline-gray-700 focus:outline-2 text-shadow-sm text-shadow-black/40`}
        />
        <div className="flex items-center justify-between">
          <button
            onClick={close}
            className="cursor-pointer p-2 bg-amber-200 hover:scale-110"
          >
            Cancel
          </button>
          {data.type === "edit" && (
            <button
              onClick={handleDelete}
              className="cursor-pointer p-2 bg-amber-200 hover:scale-110"
            >
              Delete
            </button>
          )}
          <button
            className="p-2 bg-amber-200 not-disabled:hover:scale-110"
            disabled={content === ""}
            onClick={() =>
              data.type === "create" ? handleCreate() : handleEdit()
            }
          >
            {data.type === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
