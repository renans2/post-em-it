import React, { createContext } from "react";
import type { PostIt } from "../../types/PostIt";
import useLocalStorage from "../../hooks/useLocalStorage";

type PostItsContextType = {
  nextId: number;
  postIts: PostIt[];
  addPostIt: (postIt: PostIt) => void;
  deletePostIt: (postIt: PostIt) => void;
};

const PostItContext = createContext<PostItsContextType | undefined>(undefined);

export default function PostItsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nextId, setNextId] = useLocalStorage<number>("nextid", 1);
  const [postIts, setPostIts] = useLocalStorage<PostIt[]>("postits", []);

  const addPostIt = (postIt: PostIt) => {
    setPostIts((prev) => [...prev, postIt]);
    setNextId((prev) => prev + 1);
  };

  const deletePostIt = (postIt: PostIt) => {
    setPostIts((prev) => prev.filter((p) => p.id !== postIt.id));
  };

  return (
    <PostItContext
      value={{
        nextId,
        postIts,
        addPostIt,
        deletePostIt,
      }}
    >
      {children}
    </PostItContext>
  );
}
