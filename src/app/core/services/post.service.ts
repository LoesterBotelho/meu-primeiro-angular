import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post, PostRequest } from '../models/post.model';
import { PageResponse } from '../models/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/posts';

  listar(
    page = 0,
    size = 10,
    titulo = ''
  ): Observable<PageResponse<Post>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'data,desc');

    if (titulo.trim()) {
      params = params.set('titulo', titulo.trim());
    }

    return this.http.get<PageResponse<Post>>(
      this.apiUrl,
      { params }
    );
  }

  buscarPorId(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  criar(post: PostRequest): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  atualizar(id: string, post: PostRequest): Observable<Post> {
    return this.http.put<Post>(
      `${this.apiUrl}/${id}`,
      post
    );
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}