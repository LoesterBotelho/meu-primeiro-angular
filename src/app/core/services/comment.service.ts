import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment, CommentRequest } from '../models/comment.model';
import { PageResponse } from '../models/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/comments';

  listarPorPost(
    postId: string,
    page = 0,
    size = 5,
    texto = ''
  ): Observable<PageResponse<Comment>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'data,desc');

    if (texto.trim()) {
      params = params.set('texto', texto.trim());
    }

    return this.http.get<PageResponse<Comment>>(
      `${this.apiUrl}/post/${postId}`,
      { params }
    );
  }

  listar(
    page = 0,
    size = 5,
    texto = ''
  ): Observable<PageResponse<Comment>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'data,desc');

    if (texto.trim()) {
      params = params.set('texto', texto.trim());
    }

    return this.http.get<PageResponse<Comment>>(
      this.apiUrl,
      { params }
    );
  }

  criar(
    postId: string,
    comentario: CommentRequest
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiUrl}/post/${postId}`,
      comentario
    );
  }

  buscarPorId(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`);
  }

  atualizar(
    id: string,
    comentario: CommentRequest
  ): Observable<Comment> {
    return this.http.put<Comment>(
      `${this.apiUrl}/${id}`,
      comentario
    );
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}