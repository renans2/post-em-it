import { useState } from "react";
import { usePostIts } from "../context/postits-context-provider";
import CreateOrEditLayout from "./CreateOrEditLayout";
import type { PostIt } from "../../types/post-it";
import type { SortBy, SortOrder } from "../../types/sort";
import { FONT_CLASSES } from "../../constants/fonts";
import useFontSize from "../../hooks/useFontSize";
import { BG_COLORS, TEXT_COLORS } from "../../constants/colors";

export default function Main() {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<PostIt>();
  const { postIts, sortBy, sortOrder, setSortBy, setSortOrder } = usePostIts();
  const { ref, fontSize } = useFontSize(postIts[0]?.id);

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-10">
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

      <div className="flex items-center justify-between">
        <span className="text-2xl">{postIts.length} post-its</span>
        <button
          className="hover:-rotate-6 bg-white py-2 pl-8 pr-5 font-bold shadow-[6px_0px_7px_-2px_rgba(0,0,0,0.2)]"
          style={{
            background:
              "linear-gradient(to right, #E3E3E3, #E3E3E3 10%, #FDFDFD 20%, #FFFFFF)",
          }}
          onClick={() => setIsCreating(true)}
        >
          + New
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:justify-between md:items-center">
        <label htmlFor="sortBy" className="flex items-center gap-3">
          <span>Sort by:</span>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="p-1 bg-white flex-1"
          >
            <option value="created_at">Created At</option>
            <option value="last_modified_at">Last Modified At</option>
          </select>
        </label>
        <label htmlFor="sortOrder" className="flex items-center gap-3">
          <span>Sort Order:</span>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="p-1 bg-white flex-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-10">
        {postIts.map((postIt, i) => (
          <div
            ref={i === 0 ? ref : undefined}
            key={postIt.id}
            style={{
              background: BG_COLORS[postIt.bgColorIndex],
              color: TEXT_COLORS[postIt.textColorIndex],
              transform: `rotate(${postIt.rotation}deg)`,
              fontSize,
            }}
            className={`${FONT_CLASSES[postIt.fontIndex]} group relative hover:scale-102 w-full aspect-square pt-[15%] p-[5%] group cursor-pointer shadow-[0px_12px_12px_-2px_rgba(0,0,0,0.2)]`}
            onClick={() => setIsEditing(postIt)}
          >
            <textarea
              readOnly
              value={postIt.content}
              className="resize-none h-full focus:outline-0 w-full text-shadow-sm text-shadow-black/40 overflow-y-hidden group-hover:overflow-y-auto"
            />
            <p className="text-sm absolute top-[103%] w-full left-0 text-center font-medium text-black/30">
              Created at: {new Date(postIt.createdAt).toLocaleString()}
            </p>
            {postIt.lastModifiedAt && (
              <p className="text-sm absolute top-[110%] w-full left-0 text-center font-medium text-black/30">
                Last modified at:{" "}
                {new Date(postIt.lastModifiedAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
