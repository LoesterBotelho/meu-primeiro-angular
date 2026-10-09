
import { Comment } from './comment.model';

export interface Post {
  id: string;
  autor: string;
  data: string;
  titulo: string;
  texto: string;
  comentarios: Comment[];
}

export interface PostRequest {
  autor: string;
  titulo: string;
  texto: string;
}
