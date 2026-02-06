import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { PostIt } from "../../types/post-it";
import useLocalStorage from "../../hooks/useLocalStorage";
import type { SortBy, SortOrder } from "../../types/sort";
import type { ToastType } from "../../types/toast";

const TOAST_DURATION = 3000;

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
  toastType: ToastType | undefined;
};

const PostItsContext = createContext<PostItsContextType | undefined>(undefined);

export default function PostItsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastType, setToastType] = useState<ToastType>();
  const [nextId, setNextId] = useLocalStorage<number>("next_id", 1);
  const [postItsRaw, setPostItsRaw] = useLocalStorage<PostIt[]>("postits", []);
  const [sortBy, setSortBy] = useLocalStorage<SortBy>("sort_by", "created_at");
  const [sortOrder, setSortOrder] = useLocalStorage<SortOrder>(
    "sort_order",
    "desc",
  );

  const addPostIt = (postIt: PostIt) => {
    setPostItsRaw((prev) => [...prev, postIt]);
    setNextId((prev) => prev + 1);
    setToast("created");
  };

  const deletePostIt = (postItId: number) => {
    setPostItsRaw((prev) => prev.filter((p) => p.id !== postItId));
    setToast("deleted");
  };

  const editPostIt = (postIt: PostIt) => {
    setPostItsRaw((prev) => prev.map((p) => (p.id !== postIt.id ? p : postIt)));
    setToast("edited");
  };

  const setToast = (type: ToastType) => {
    setToastType(type);

    setTimeout(() => {
      setToastType(undefined);
    }, TOAST_DURATION);
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
        toastType,
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
