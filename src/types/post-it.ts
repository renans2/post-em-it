export interface PostIt {
  id: number;
  bgColorIndex: number;
  textColorIndex: number;
  fontIndex: number;
  content: string;
  rotation: number;
  createdAt: number;
  lastModifiedAt?: number;
}
