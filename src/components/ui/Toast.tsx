import { TOAST_COLOR_MAPPER } from "../../constants/colors";
import type { ToastType } from "../../types/toast";
import { motion } from "motion/react";

type ToastProps = {
  type: ToastType;
};

export default function Toast({ type }: ToastProps) {
  return (
    <motion.div
      initial={{ y: "300%" }}
      animate={{ y: "0%" }}
      exit={{ y: "300%" }}
      style={{ background: TOAST_COLOR_MAPPER[type] }}
      className="caveat-font z-10 pl-12 px-8 py-4 fixed bottom-5 right-5 md:bottom-20 md:right-20 text-4xl -rotate-5 shadow-[6px_2px_7px_-1px_rgba(0,0,0,0.2)]"
    >
      Post-it {type}
    </motion.div>
  );
}
