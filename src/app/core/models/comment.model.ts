
export interface Comment {
  id: string;
  autor: string;
  data: string;
  texto: string;
  postId: string;
}

export interface CommentRequest {
  autor: string;
  texto: string;
}
