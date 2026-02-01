import { useState } from "react";
import { usePostIts } from "../context/postits-context-provider";
import CreateOrEditLayout from "./CreateOrEditLayout";
import type { PostIt } from "../../types/PostIt";

export default function Main() {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<PostIt>();
  const { postIts } = usePostIts();

  return (
    <main className="max-w-4xl mx-auto p-4">
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
          onClick={() => {
            console.log("hello");
            setIsCreating(true);
          }}
        >
          + New
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-10 mt-20">
        {postIts.map((postIt) => (
          <div
            key={postIt.id}
            style={{
              background: postIt.bgColor,
              color: postIt.textColor,
              transform: postIt.rotation,
            }}
            className={`relative hover:scale-102 w-full aspect-square pt-[15%] p-[5%] group cursor-pointer shadow-[0px_12px_12px_-2px_rgba(0,0,0,0.2)]`}
            onClick={() => setIsEditing(postIt)}
          >
            <div className="resize-none w-full pointer-events-none">
              {postIt.content}
            </div>
            <p className="text-sm absolute top-[103%] w-full left-0 text-center font-medium text-black/30">
              Created at: {postIt.createdAt}
            </p>
            {postIt.lastModifiedAt && (
              <p className="text-sm absolute top-[110%] w-full left-0 text-center font-medium text-black/30">
                Last modified at: {postIt.lastModifiedAt}
              </p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
