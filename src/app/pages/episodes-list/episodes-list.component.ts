import { Component } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { SearchService } from 'app/services/search.service';
import { EpisodesCardComponent } from 'app/shared/components/episodes-card/episodes-card.component';
import { Episode } from 'app/shared/utils/classes/episode';
import { EpisodeQuery } from 'app/shared/utils/classes/queries';
import { InfiniteScroll } from 'app/shared/utils/directives/infinite-scroll.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [EpisodesCardComponent, InfiniteScroll],
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
  hasMorePages: boolean = false;
  isFiltered: boolean = false;

  query: EpisodeQuery = new EpisodeQuery();

  ngOnInit(): void {
    this.searchService.currentQuery$.subscribe((query: any) => {
      if (query) {
        const isFirstLoad = !this.query;

        this.query = query;

        if (isFirstLoad || query.page === 1) {
          this.episodesList = [];
        }
      }
    });

    this.sub = this.searchService.searchResult.subscribe({
      next: (res: any) => {
        const loadesEpisodes = res.results.map((ep: Episode) =>
          Object.assign(new Episode(), ep)
        );

        if (this.query.page === 1 && !res.info.next) {
          this.episodesList = loadesEpisodes;
        } else {
          this.episodesList = [...this.episodesList, ...loadesEpisodes];
        }

        this.hasMorePages = !!res.info.next;
      },
    });

    const savedQuery = localStorage.getItem('@episodesQuery');

    if (savedQuery) {
      this.isFiltered = true;
      const parsed = JSON.parse(savedQuery);
      this.searchService.searchContent(parsed);
    } else {
      this.isFiltered = false;
      this.listEpisodes(1);
    }
  }

  loadMoreData() {
    if (!this.hasMorePages) return;
    this.query.page++;
    if (this.isFiltered) {
      this.searchService.searchContent(this.query);
    } else {
      this.listEpisodes(1);
    }
  }

  listEpisodes(page: number) {
    this.query.page = page;
    this.contentService.listAllEpisodes(this.query).subscribe({
      next: (res) => {
        const loadesEpisodes = res.results.map((ep: Episode) =>
          Object.assign(new Episode(), ep)
        );

        if (this.query.page === 1 && !res.info.next) {
          this.episodesList = loadesEpisodes;
        } else {
          this.episodesList = [...this.episodesList, ...loadesEpisodes];
        }

        this.hasMorePages = !!res.info.next;
      },
      error: (error) => {
        // [WIP] Adicionar melhor tratamento de erro
        console.error('Não foi possível listar os episódios');
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
