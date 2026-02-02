import React, {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { PostIt } from "../../types/post-it";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { SortBy, SortOrder } from "../../types/sort";

type PostItsContextType = {
  nextId: number;
  postIts: PostIt[];
  addPostIt: (postIt: PostIt) => void;
  deletePostIt: (postItId: number) => void;
  editPostIt: (postIt: PostIt) => void;
  sortBy: SortBy;
  sortOrder: SortOrder;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  setSortOrder: Dispatch<SetStateAction<SortOrder>>;
};

const PostItsContext = createContext<PostItsContextType | undefined>(undefined);

export default function PostItsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nextId, setNextId] = useLocalStorage<number>("nextid", 1);
  const [postItsRaw, setPostItsRaw] = useLocalStorage<PostIt[]>("postits", []);
  const [sortBy, setSortBy] = useLocalStorage<SortBy>("sort_by", "created_at");
  const [sortOrder, setSortOrder] = useLocalStorage<SortOrder>(
    "sort_order",
    "desc",
  );

  const addPostIt = (postIt: PostIt) => {
    setPostItsRaw((prev) => [...prev, postIt]);
    setNextId((prev) => prev + 1);
  };

  const deletePostIt = (postItId: number) => {
    setPostItsRaw((prev) => prev.filter((p) => p.id !== postItId));
  };

  const editPostIt = (postIt: PostIt) => {
    setPostItsRaw((prev) => prev.map((p) => (p.id !== postIt.id ? p : postIt)));
  };

  const postIts = [...postItsRaw].sort((a, b) => {
    const valA =
      sortBy === "created_at" ? a.createdAt : (a.lastModifiedAt ?? a.createdAt);
    const valB =
      sortBy === "created_at" ? b.createdAt : (b.lastModifiedAt ?? b.createdAt);

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  return (
    <PostItsContext
      value={{
        nextId,
        postIts,
        addPostIt,
        deletePostIt,
        editPostIt,
        sortBy,
        sortOrder,
        setSortBy,
        setSortOrder,
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
