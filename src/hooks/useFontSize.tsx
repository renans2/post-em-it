import { useCallback, useEffect, useRef, useState } from "react";

export default function useFontSize() {
  const elementRef = useRef(null);
  const [fontSize, setFontSize] = useState(0);

  const setRef = useCallback((node: any) => {
    if (node) {
      elementRef.current = node;
    }
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { height } = entry.contentRect;
      const size = Math.floor(height * 0.11);
      setFontSize(size);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref: setRef,
    fontSize,
  };
}
