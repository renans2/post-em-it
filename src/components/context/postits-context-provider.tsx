import React, { createContext, useContext } from "react";
import type { PostIt } from "../../types/PostIt";
import useLocalStorage from "../../hooks/useLocalStorage";

type PostItsContextType = {
  nextId: number;
  postIts: PostIt[];
  addPostIt: (postIt: PostIt) => void;
  deletePostIt: (postItId: number) => void;
  editPostIt: (postIt: PostIt) => void;
};

const PostItsContext = createContext<PostItsContextType | undefined>(undefined);

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

  const deletePostIt = (postItId: number) => {
    setPostIts((prev) => prev.filter((p) => p.id !== postItId));
  };

  const editPostIt = (postIt: PostIt) => {
    setPostIts((prev) => prev.map((p) => (p.id !== postIt.id ? p : postIt)));
  };

  return (
    <PostItsContext
      value={{
        nextId,
        postIts,
        addPostIt,
        deletePostIt,
        editPostIt,
      }}
    >
      {children}
    </PostItsContext>
  );
}

export const usePostIts = () => {
  const context = useContext(PostItsContext);

  if (!context)
    throw new Error(
      "The usePostIts hook must be used within the PostItsProvider",
    );

  return context;
};
