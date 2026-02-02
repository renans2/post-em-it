import { useState, type MouseEvent } from "react";
import { usePostIts } from "../context/postits-context-provider";
import { BG_COLORS, TEXT_COLORS } from "../../constants/colors";
import type { PostIt } from "../../types/post-it";
import { FONT_CLASSES } from "../../constants/fonts";
import useFontSize from "../../hooks/useFontSize";
import { EMPTY_POST_IT } from "../../constants/empty-post-it";

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
  const [postIt, setPostIt] = useState<PostIt>(() =>
    data.type === "edit" ? data.postIt : EMPTY_POST_IT,
  );

  const handleChange = (key: keyof PostIt, val: any) => {
    setPostIt((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleCreate = () => {
    addPostIt({
      ...postIt,
      id: nextId,
      rotation: Number((Math.random() * 10 - 5).toFixed(3)),
      createdAt: Date.now(),
    });
    close();
  };

  const handleDelete = () => {
    if (data.type === "create") return;
    deletePostIt(data.postIt.id);
    close();
  };

  const handleEdit = () => {
    if (data.type === "create") return;
    editPostIt({
      ...postIt,
      lastModifiedAt: Date.now(),
    });
    close();
  };

  const handleSubmit = () =>
    data.type === "create" ? handleCreate() : handleEdit();

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
              {FONT_CLASSES.map((font, i) => (
                <div
                  key={font}
                  className={`${FONT_CLASSES[i]} ${postIt.fontIndex === i ? "border-4 cursor-not-allowed" : "hover:scale-110 cursor-pointer"} flex justify-center items-center font-bold bg-white text-black flex-1 h-8`}
                  onClick={() => handleChange("fontIndex", i)}
                >
                  {i}
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
                  className={`${i === postIt.bgColorIndex ? "border-4 cursor-not-allowed" : "hover:scale-110 cursor-pointer"} flex-1 h-8`}
                  onClick={() => handleChange("bgColorIndex", i)}
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
                  className={`${i === postIt.textColorIndex ? `border-4 cursor-not-allowed ${postIt.textColorIndex === 0 && "border-white"}` : "hover:scale-110 cursor-pointer"} flex-1 h-8`}
                  onClick={() => handleChange("textColorIndex", i)}
                />
              ))}
            </div>
          </div>
        </div>
        <textarea
          ref={ref}
          onChange={(e) => handleChange("content", e.target.value)}
          value={postIt.content}
          placeholder="Type here..."
          style={{
            background: BG_COLORS[postIt.bgColorIndex],
            color: TEXT_COLORS[postIt.textColorIndex],
            fontSize,
          }}
          className={`${FONT_CLASSES[postIt.fontIndex]} w-full aspect-square mt-4 pt-[15%] p-[5%] text-3xl resize-none placeholder:text-black/10 focus:outline-gray-700 focus:outline-2 text-shadow-sm text-shadow-black/40`}
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
            disabled={postIt.content === ""}
            onClick={handleSubmit}
          >
            {data.type === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
