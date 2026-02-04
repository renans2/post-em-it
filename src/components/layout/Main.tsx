import { useState } from "react";
import { usePostIts } from "../context/postits-context-provider";
import CreateOrEditLayout from "./CreateOrEditLayout";
import type { PostIt as PostItType } from "../../types/post-it";
import type { SortBy, SortOrder } from "../../types/sort";
import useFontSize from "../../hooks/useFontSize";
import { AnimatePresence } from "motion/react";
import type { PanelSize } from "../../types/panel-size";
import useLocalStorage from "../../hooks/useLocalStorage";
import Toast from "../ui/Toast";
import PostIt from "../ui/PostIt";

export default function Main() {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<PostItType>();
  const { postIts, toastType, sortBy, sortOrder, setSortBy, setSortOrder } =
    usePostIts();
  const { ref, fontSize } = useFontSize();
  const [panelSize, setPanelSize] = useLocalStorage<PanelSize>(
    "panel_size",
    "normal",
  );

  return (
    <AnimatePresence mode="popLayout">
      <main className="p-4 space-y-10">
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

        {toastType && <Toast type={toastType} />}

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
        {postIts.length === 0 && (
          <p className="text-center caveat-font text-4xl text-black/40">
            No post-its yet
          </p>
        )}
        <div
          className={`mx-auto grid ${
            panelSize === "normal"
              ? "max-w-4xl grid-cols-1 md:grid-cols-3"
              : "grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
          } gap-x-4 md:gap-x-10 gap-y-20`}
        >
          {postIts.map((postIt) => (
            <PostIt
              key={postIt.id}
              postIt={postIt}
              onClick={() => setIsEditing(postIt)}
              fontSize={fontSize}
            />
          ))}
          <div
            ref={ref}
            className="invisible bg-pink-500 w-full aspect-square pt-[15%] p-[5%]"
          />
        </div>
      </main>
    </AnimatePresence>
  );
}
