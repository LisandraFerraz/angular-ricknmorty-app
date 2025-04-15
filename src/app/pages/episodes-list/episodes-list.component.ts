import { Component } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { SearchService } from 'app/services/search.service';
import { Episode } from 'app/shared/utils/classes/episode';
import { EpisodeQuery } from 'app/shared/utils/classes/queries';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent {
  constructor(
    private contentService: ContentService,
    private searchService: SearchService
  ) {}

  private sub!: Subscription;
  episodesList: Episode[] = [];

  query = EpisodeQuery;

  ngOnInit(): void {
    this.listEpisodes();

    this.sub = this.searchService.searchResult.subscribe({
      next: (res) => {
        this.episodesList = res;
      },
      error: (error) => {
        // [WIP] Adicionar melhor tratamento de erro
        console.error(
          'Não foi encontrado nenhum resultado para a pesquisa.',
          error
        );
      },
    });
  }

  listEpisodes() {
    this.contentService.listAllEpisodes(this.query).subscribe({
      next: (res) => {
        this.episodesList = res;
      },
      error: (error) => {
        // [WIP] Adicionar melhor tratamento de erro
        console.error('Não foi possível listar os episódios');
      },
    });
  }

  ngOnDestroy(): void {}
}
