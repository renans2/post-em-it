import { useState, type MouseEvent } from "react";
import { usePostIts } from "../context/postits-context-provider";
import { BG_COLORS, TEXT_COLORS } from "../../constants/colors";
import type { PostIt } from "../../types/post-it";
import { FONT_CLASSES } from "../../constants/fonts";
import useFontSize from "../../hooks/useFontSize";

type CreateOrEditLayoutType = {
  data: { type: "create" } | { type: "edit"; postIt: PostIt };
  close: () => void;
};

export default function CreateOrEditLayout({
  data,
  close,
}: CreateOrEditLayoutType) {
  const { nextId, addPostIt, deletePostIt, editPostIt } = usePostIts();
  const { ref, fontSize } = useFontSize(undefined);
  const [content, setContent] = useState(
    data.type === "edit" ? data.postIt.content : "",
  );
  const [bgColorIndex, setBgColor] = useState<number>(
    data.type === "edit" ? data.postIt.bgColorIndex : 0,
  );
  const [textColorIndex, setTextColor] = useState<number>(
    data.type === "edit" ? data.postIt.textColorIndex : 0,
  );
  const [fontIndex, setFontType] = useState<number>(
    data.type === "edit" ? data.postIt.fontIndex : 0,
  );

  const handleCreate = () => {
    addPostIt({
      id: nextId,
      content,
      bgColorIndex,
      textColorIndex,
      createdAt: Date.now(),
      rotation: Number((Math.random() * 10 - 5).toFixed(3)),
      fontIndex,
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
        bgColorIndex,
        textColorIndex,
        lastModifiedAt: Date.now(),
        fontIndex,
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
      className="z-100 fixed inset-0 bg-black/50 backdrop-blur-lg m-0"
    >
      <div className="mx-auto w-full max-w-lg p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-xl text-white">Font Type</h4>
            <div className="flex items-center gap-2">
              {FONT_CLASSES.map((font, index) => (
                <div
                  key={font}
                  className={`${FONT_CLASSES[index]} ${fontIndex === index ? "border-4 cursor-not-allowed" : "hover:scale-110 cursor-pointer"} flex justify-center items-center font-bold bg-white text-black flex-1 h-8`}
                  onClick={() => setFontType(index)}
                >
                  {index}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-xl text-white">Background Color</h4>
            <div className="flex items-center gap-1">
              {BG_COLORS.map((color, i) => (
                <div
                  key={color}
                  style={{ background: color }}
                  className={`${i === bgColorIndex ? "border-4 cursor-not-allowed" : "hover:scale-110 cursor-pointer"} flex-1 h-8`}
                  onClick={() => setBgColor(i)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-xl text-white">Text Color</h4>
            <div className="flex items-center gap-1">
              {TEXT_COLORS.map((color, i) => (
                <div
                  key={color}
                  style={{ background: color }}
                  className={`${i === textColorIndex ? `border-4 cursor-not-allowed ${textColorIndex === 0 && "border-white"}` : "hover:scale-110 cursor-pointer"} flex-1 h-8`}
                  onClick={() => setTextColor(i)}
                />
              ))}
            </div>
          </div>
        </div>
        <textarea
          ref={ref}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Type here..."
          style={{
            background: BG_COLORS[bgColorIndex],
            color: TEXT_COLORS[textColorIndex],
            fontSize,
          }}
          className={`${FONT_CLASSES[fontIndex]} w-full aspect-square mt-4 pt-[15%] p-[5%] text-3xl resize-none placeholder:text-black/10 focus:outline-gray-700 focus:outline-2 text-shadow-sm text-shadow-black/40`}
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
