import type { PostIt } from "../types/post-it";
import { getStoredSetting } from "../utils/stored-setting";

export function getEmptyPostIt(): PostIt {
  return {
    id: 0,
    content: "",
    bgColorIndex: getStoredSetting("bgColorIndex") ?? "0",
    fontIndex: getStoredSetting("fontIndex") ?? "0",
    textColorIndex: getStoredSetting("textColorIndex") ?? "0",
    rotation: 0,
    createdAt: 0,
  };
}
