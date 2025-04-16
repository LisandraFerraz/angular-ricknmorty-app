import { Component, OnDestroy } from '@angular/core';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ContentService } from 'app/services/content.service';
import { SearchService } from 'app/services/search.service';
import { EpisodesCardComponent } from 'app/shared/components/episodes-card/episodes-card.component';
import { ListHeaderComponent } from 'app/shared/components/list-header/list-header.component';
import { Episode } from 'app/shared/utils/classes/episode';
import { EpisodeQuery } from 'app/shared/utils/classes/queries';
import { Subscription } from 'rxjs';

interface IPageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
@Component({
  selector: 'app-episodes-list',
  standalone: true,
  imports: [EpisodesCardComponent, NgbPagination, ListHeaderComponent],
  templateUrl: './episodes-list.component.html',
  styleUrl: './episodes-list.component.scss',
})
export class EpisodesListComponent implements OnDestroy {
  constructor(
    private contentService: ContentService,
    private searchService: SearchService
  ) {}

  private sub!: Subscription;
  episodesList: Episode[] = [];
  hasMorePages: boolean = false;
  isFiltered: boolean = false;

  query: EpisodeQuery = new EpisodeQuery();
  pageInfo: IPageInfo = {
    count: 0,
    pages: 0,
    next: '',
    prev: '',
  };

  ngOnInit(): void {
    this.searchService.currentQuery$.subscribe((query: any) => {
      if (query) {
        this.isFiltered = true;
        const isFirstLoad = !this.query;

        this.query = query;

        if (isFirstLoad || query.page === 1) {
          this.episodesList = [];
        }
      }
    });

    this.sub = this.searchService.searchResult.subscribe({
      next: (res: any) => {
        this.pageInfo = res.info;
        const loadedEpisodes = res.results.map((ep: Episode) =>
          Object.assign(new Episode(), ep)
        );
        this.episodesList = Array.isArray(loadedEpisodes)
          ? loadedEpisodes
          : [loadedEpisodes];

        this.hasMorePages = !!res.info.next;
      },
    });

    const savedQuery = localStorage.getItem('@episodeQuery');

    if (savedQuery) {
      this.isFiltered = true;
      const parsed = JSON.parse(savedQuery);
      this.searchService.searchContent(parsed);
    } else {
      this.isFiltered = false;
      this.listEpisodes(1);
    }
  }

  listEpisodes(page: number) {
    this.query.page = page;
    this.contentService.listAllEpisodes(this.query).subscribe({
      next: (res) => {
        this.isFiltered = false;
        this.pageInfo = res.info;
        const loadedEpisodes = res.results.map((ep: Episode) =>
          Object.assign(new Episode(), ep)
        );
        this.episodesList = Array.isArray(loadedEpisodes)
          ? loadedEpisodes
          : [loadedEpisodes];

        this.hasMorePages = !!res.info.next;
      },
      error: (error) => {
        console.error('Não foi possível listar os episódios ', error);
      },
    });
  }

  clearFilters() {
    localStorage.removeItem('@episodeQuery');
    this.query = new EpisodeQuery();
    this.listEpisodes(1);
  }

  ngOnDestroy(): void {
    this.episodesList = [];
    this.sub.unsubscribe();
    this.clearFilters();
  }
}
