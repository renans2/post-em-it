import { useEffect, useRef, useState } from "react";

export default function useFontSize(id?: number) {
  const ref = useRef(null);
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { height } = entry.contentRect;
      const size = Math.floor(height * 0.11);
      setFontSize(size);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return {
    ref,
    fontSize,
  };
}
