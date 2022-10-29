import { ITag } from './tag';

export interface IPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: IImage[];
  tags: ITag[];
}
