import { useState, type MouseEvent } from "react";
import { usePostIts } from "../context/postits-context-provider";
import {
  BG_COLORS,
  INITIAL_BG_COLOR,
  INITIAL_TEXT_COLOR,
  TEXT_COLORS,
} from "../../constants/colors";
import useLocalStorage from "../../hooks/useLocalStorage";

type CreatingLayoutType = {
  close: () => void;
};

export default function CreatingLayout({ close }: CreatingLayoutType) {
  const { nextId, addPostIt } = usePostIts();
  const [content, setContent] = useState("");
  const [bgColor, setBgColor] = useLocalStorage<string>(
    "initial_bg_color",
    INITIAL_BG_COLOR,
  );
  const [textColor, setTextColor] = useLocalStorage<string>(
    "initial_text_color",
    INITIAL_TEXT_COLOR,
  );

  const handleCreate = () => {
    addPostIt({
      id: nextId,
      content,
      bgColor,
      textColor,
      createdAt: new Date().toLocaleString(),
    });
    close();
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="z-100 fixed inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-lg"
    >
      <div className="w-full max-w-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white text-center">Background Color</h4>
            <div className="flex items-center gap-2 mt-1">
              {BG_COLORS.map((color) => (
                <div
                  style={{ backgroundColor: color }}
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
                  style={{ backgroundColor: color }}
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
          style={{ backgroundColor: bgColor, color: textColor }}
          className={`w-full aspect-square mt-4 p-5 text-2xl resize-none placeholder:text-black/10 focus:outline-gray-700 focus:outline-2 text-shadow-sm text-shadow-black/40`}
        />
        <div className="flex items-center justify-between">
          <button
            onClick={close}
            className="cursor-pointer p-2 bg-amber-200 hover:scale-110"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="cursor-pointer p-2 bg-amber-200 hover:scale-110"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
