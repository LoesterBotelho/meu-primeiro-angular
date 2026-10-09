import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList implements OnInit {

  private readonly postService = inject(PostService);

  posts = signal<Post[]>([]);
  paginaAtual = signal(0);
  totalPaginas = signal(0);
  carregando = signal(false);
  erro = signal('');

  // Controla qual artigo está exibindo os comentários
  postSelecionadoId = signal<string | null>(null);

  ngOnInit(): void {
    this.carregarPosts();
  }

  carregarPosts(): void {
    this.carregando.set(true);
    this.erro.set('');

    this.postService.listar(this.paginaAtual(), 10).subscribe({
      next: (resposta) => {
        this.posts.set(resposta.content);
        this.totalPaginas.set(resposta.page.totalPages);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar posts:', erro);

        this.erro.set(
          'Não foi possível carregar os posts. Verifique se a API está funcionando.'
        );

        this.carregando.set(false);
      }
    });
  }

  alternarComentarios(postId: string): void {
    if (this.postSelecionadoId() === postId) {
      this.postSelecionadoId.set(null);
    } else {
      this.postSelecionadoId.set(postId);
    }
  }

  irParaPagina(pagina: number): void {
    if (pagina >= 0 && pagina < this.totalPaginas()) {
      this.paginaAtual.set(pagina);

      // Fecha os comentários ao trocar de página
      this.postSelecionadoId.set(null);

      this.carregarPosts();
    }
  }
}