import { ITag } from './tag';
import { IImage } from './image';

export interface IPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  images: IImage[];
  tags: ITag[];
}
