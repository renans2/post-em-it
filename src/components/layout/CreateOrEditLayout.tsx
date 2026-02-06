import { useState, type MouseEvent } from "react";
import { usePostIts } from "../context/postits-context-provider";
import { BG_COLORS, TEXT_COLORS } from "../../constants/colors";
import type { PostIt } from "../../types/post-it";
import { FONT_CLASSES } from "../../constants/fonts";
import useFontSize from "../../hooks/useFontSize";
import { motion } from "motion/react";
import { setStoredSetting } from "../../utils/stored-setting";
import { getEmptyPostIt } from "../../utils/get-empty-postit";

type CreateOrEditLayoutType = {
  data: { type: "create" } | { type: "edit"; postIt: PostIt };
  close: () => void;
};

export default function CreateOrEditLayout({
  data,
  close,
}: CreateOrEditLayoutType) {
  const { nextId, addPostIt, deletePostIt, editPostIt } = usePostIts();
  const { ref, fontSize } = useFontSize();
  const [postIt, setPostIt] = useState<PostIt>(() =>
    data.type === "edit" ? data.postIt : getEmptyPostIt(),
  );

  const handleChange = <K extends keyof PostIt>(key: K, val: PostIt[K]) => {
    if (
      data.type === "create" &&
      (key === "bgColorIndex" ||
        key === "textColorIndex" ||
        key === "fontIndex")
    ) {
      setStoredSetting(key, JSON.stringify(val));
    }

    setPostIt((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleCreate = () => {
    if (data.type === "edit") return;
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      onClick={handleBackdropClick}
      className="z-100 fixed inset-0 bg-black/50 backdrop-blur-lg m-0 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="mx-auto w-full max-w-lg p-4"
      >
        {/* PostIt settings */}
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
        {/* PostIt Area */}
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
          className={`placeholder:text-black/5 ${FONT_CLASSES[postIt.fontIndex]} w-full aspect-square mt-4 pt-[15%] p-[5%] text-3xl resize-none focus:outline-gray-700 focus:outline-2 text-shadow-sm text-shadow-black/40`}
        />
        {/* Action buttons */}
        <div className="flex items-center justify-between gap-10">
          <button
            onClick={close}
            className="font-medium flex-1 p-2 bg-amber-200 hover:scale-105"
          >
            Cancel
          </button>
          {data.type === "edit" && (
            <button
              onClick={handleDelete}
              className="font-medium flex-1 p-2 bg-amber-200 hover:scale-105"
            >
              Delete
            </button>
          )}
          <button
            className="font-medium flex-1 p-2 bg-amber-200 not-disabled:hover:scale-105"
            disabled={postIt.content === ""}
            onClick={handleSubmit}
          >
            {data.type === "create" ? "Create" : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
