import { useState } from "react";
import { usePostIts } from "../context/postits-context-provider";
import CreatingLayout from "./CreatingLayout";

export default function Main() {
  const [isCreating, setIsCreating] = useState(false);
  const { postIts } = usePostIts();

  return (
    <main className="max-w-4xl mx-auto p-4">
      {isCreating && <CreatingLayout close={() => setIsCreating(false)} />}

      <div className="flex items-center justify-between">
        <span className="text-2xl">5 post-its</span>
        <button
          className="bg-white p-3"
          onClick={() => {
            console.log("hello");
            setIsCreating(true);
          }}
        >
          + New
        </button>
      </div>
      <div className="grid grid-cols-3 gap-10 mt-20">
        {postIts.map((postIt) => (
          <div
            key={postIt.id}
            style={{ backgroundColor: postIt.bgColor, color: postIt.textColor }}
            className={`w-full aspect-square p-2`}
          >
            <div className="resize-none w-full pointer-events-none">
              {postIt.content}
            </div>
            <p>{postIt.createdAt}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
