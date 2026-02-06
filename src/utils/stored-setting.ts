import { POST_IT_SETTINGS_LOCAL_STORAGE_MAPPER } from "../constants/post-it-settings-mapper";

export function getStoredSetting(setting: string) {
  const stored = localStorage.getItem(
    POST_IT_SETTINGS_LOCAL_STORAGE_MAPPER[setting],
  );
  return stored ? JSON.parse(stored) : null;
}

export function setStoredSetting(setting: string, val: string) {
  localStorage.setItem(POST_IT_SETTINGS_LOCAL_STORAGE_MAPPER[setting], val);
}
