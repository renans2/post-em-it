import { BG_COLORS, TEXT_COLORS } from "../../constants/colors";
import { FONT_CLASSES } from "../../constants/fonts";
import type { PostIt } from "../../types/post-it";
import { motion } from "motion/react";

type PostItProps = {
  postIt: PostIt;
  onClick: () => void;
  fontSize: number;
};

export default function PostIt({ postIt, onClick, fontSize }: PostItProps) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: postIt.rotation, opacity: 1 }}
      exit={{ scale: 0, rotate: -10, opacity: 0 }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      key={postIt.id}
      className={`${FONT_CLASSES[postIt.fontIndex]} group relative w-full aspect-square pt-[15%] p-[5%] cursor-pointer shadow-[0px_12px_12px_-2px_rgba(0,0,0,0.2)]`}
      onClick={onClick}
      style={{
        background: BG_COLORS[postIt.bgColorIndex],
        color: TEXT_COLORS[postIt.textColorIndex],
        fontSize,
      }}
    >
      <textarea
        id={postIt.id.toString()}
        readOnly
        value={postIt.content}
        className="resize-none h-full focus:outline-0 w-full text-shadow-sm text-shadow-black/40 overflow-y-hidden group-hover:overflow-y-auto"
      />
      <p
        style={{ fontSize: fontSize * 0.65 }}
        className="text-sm absolute top-full translate-y-[20%] w-full left-0 text-center font-medium text-black/30"
      >
        Created: {new Date(postIt.createdAt).toLocaleString().slice(0, 17)}
      </p>
      {postIt.lastModifiedAt && (
        <p
          style={{ fontSize: fontSize * 0.6 }}
          className="text-sm absolute top-full translate-y-[105%] w-full left-0 text-center font-medium text-black/30"
        >
          Modified:{" "}
          {new Date(postIt.lastModifiedAt).toLocaleString().slice(0, 17)}
        </p>
      )}
    </motion.div>
  );
}
