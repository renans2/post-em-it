import { useState } from "react";
import { usePostIts } from "../context/postits-context-provider";
import CreateOrEditLayout from "./CreateOrEditLayout";
import type { PostIt } from "../../types/post-it";
import type { SortBy, SortOrder } from "../../types/sort";
import { FONT_CLASSES } from "../../constants/fonts";
import useFontSize from "../../hooks/useFontSize";
import { BG_COLORS, TEXT_COLORS } from "../../constants/colors";
import { AnimatePresence, motion } from "motion/react";
import type { PanelSize } from "../../types/panel-size";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Main() {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<PostIt>();
  const { postIts, sortBy, sortOrder, setSortBy, setSortOrder } = usePostIts();
  const { ref, fontSize } = useFontSize();
  const [panelSize, setPanelSize] = useLocalStorage<PanelSize>(
    "panel_size",
    "normal",
  );

  return (
    <main className="p-4 pb-35 space-y-10">
      {isCreating && (
        <CreateOrEditLayout
          data={{ type: "create" }}
          close={() => setIsCreating(false)}
        />
      )}

      {isEditing && (
        <CreateOrEditLayout
          data={{ type: "edit", postIt: isEditing }}
          close={() => setIsEditing(undefined)}
        />
      )}

      <div className="caveat-font text-3xl max-w-4xl mx-auto flex items-center justify-between">
        <span>{postIts.length} post-its</span>
        <button
          className="text-blue-700 transition-transform hover:-rotate-6 bg-white py-2 pl-8 pr-5 shadow-[6px_0px_7px_-2px_rgba(0,0,0,0.2)]"
          style={{
            background:
              "linear-gradient(to right, #E3E3E3, #E3E3E3 10%, #FDFDFD 20%, #FFFFFF)",
          }}
          onClick={() => setIsCreating(true)}
        >
          + New
        </button>
      </div>
      <div className="caveat-font text-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 md:gap-5 justify-between md:items-center">
        <label htmlFor="panelSize" className="flex flex-1 items-center gap-3">
          <span>Panel Size:</span>
          <select
            id="panelSize"
            value={panelSize}
            onChange={(e) => setPanelSize(e.target.value as PanelSize)}
            className="text-blue-700 cursor-pointer p-1 bg-white flex-1 text-center shadow-[6px_0px_7px_-2px_rgba(0,0,0,0.2)]"
            style={{
              background:
                "linear-gradient(to right, #E3E3E3, #E3E3E3 7%, #FDFDFD 15%, #FFFFFF)",
            }}
          >
            <option value="normal">Normal</option>
            <option value="max">Max</option>
          </select>
        </label>
        <label htmlFor="sortBy" className="flex flex-1 items-center gap-3">
          <span>Sort by:</span>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="text-blue-700 cursor-pointer p-1 bg-white flex-1 text-center shadow-[6px_0px_7px_-2px_rgba(0,0,0,0.2)]"
            style={{
              background:
                "linear-gradient(to right, #E3E3E3, #E3E3E3 7%, #FDFDFD 15%, #FFFFFF)",
            }}
          >
            <option value="created_at">Created At</option>
            <option value="last_modified_at">Last Modified At</option>
          </select>
        </label>
        <label htmlFor="sortOrder" className="flex flex-1 items-center gap-3">
          <span>Sort Order:</span>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="text-blue-700 cursor-pointer p-1 bg-white flex-1 text-center shadow-[6px_0px_7px_-2px_rgba(0,0,0,0.2)]"
            style={{
              background:
                "linear-gradient(to right, #E3E3E3, #E3E3E3 7%, #FDFDFD 15%, #FFFFFF)",
            }}
          >
            <option value="asc">Least recent first</option>
            <option value="desc">Most recent first</option>
          </select>
        </label>
      </div>
      <div
        className={`mx-auto grid ${
          panelSize === "normal"
            ? "max-w-4xl grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
            : "grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
        } gap-x-4 md:gap-x-10 gap-y-20`}
      >
        <AnimatePresence mode="popLayout">
          {postIts.map((postIt, i) => (
            <motion.div
              layout
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: postIt.rotation }}
              exit={{ scale: 0, rotate: -10 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              ref={i === 0 ? ref : undefined}
              key={postIt.id}
              style={{
                background: BG_COLORS[postIt.bgColorIndex],
                color: TEXT_COLORS[postIt.textColorIndex],
                fontSize,
              }}
              className={`${FONT_CLASSES[postIt.fontIndex]} group relative w-full aspect-square pt-[15%] p-[5%] cursor-pointer shadow-[0px_12px_12px_-2px_rgba(0,0,0,0.2)]`}
              onClick={() => setIsEditing(postIt)}
            >
              <textarea
                id={postIt.id.toString()}
                readOnly
                value={postIt.content}
                className="resize-none h-full focus:outline-0 w-full text-shadow-sm text-shadow-black/40 overflow-y-hidden group-hover:overflow-y-auto"
              />
              <p className="text-sm absolute top-[103%] w-full left-0 text-center font-medium text-black/30">
                Created:{" "}
                {new Date(postIt.createdAt).toLocaleString().slice(0, 17)}
              </p>
              {postIt.lastModifiedAt && (
                <p className="text-sm absolute top-[110%] w-full left-0 text-center font-medium text-black/30">
                  Modified:{" "}
                  {new Date(postIt.lastModifiedAt)
                    .toLocaleString()
                    .slice(0, 17)}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
