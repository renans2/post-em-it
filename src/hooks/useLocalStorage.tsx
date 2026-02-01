import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultData: T) {
  const [data, setData] = useState<T>(() => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData] as const;
}
