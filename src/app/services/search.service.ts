import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreApiService } from 'app/core/core-api.service';
import { endpoints } from 'app/core/endpoints';
import { CharacterQuery, EpisodeQuery } from 'app/shared/utils/classes/queries';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResultSub = new BehaviorSubject<any[] | null>([]);
  searchResult = this.searchResultSub.asObservable();

  private currentCharacterQuerSub$ = new BehaviorSubject<CharacterQuery | null>(
    null
  );
  private currentEpisodeQuerySub$ = new BehaviorSubject<EpisodeQuery | null>(
    null
  );

  currentCharQuery$ = this.currentCharacterQuerSub$.asObservable();
  currentEpQuery$ = this.currentEpisodeQuerySub$.asObservable();

  constructor(private coreApi: CoreApiService, private route: Router) {}

  searchContent(params: CharacterQuery | EpisodeQuery) {
    const currentPath = this.route.url;

    if (currentPath.includes('characters')) {
      this.currentCharacterQuerSub$.next(params as CharacterQuery);
    } else if (currentPath.includes('episodes')) {
      this.currentEpisodeQuerySub$.next(params as EpisodeQuery);
    }
    const endpointsMap: { [key: string]: string } = {
      '/characters': endpoints.getCharacter,
      '/episodes': endpoints.getEpisode,
    };

    const endpoint = endpointsMap[this.route.url];

    const searchPromise = this.coreApi.get(endpoint, { params });
    searchPromise.subscribe({
      next: (res) => {
        this.searchResultSub.next(res);
      },
      error: (error) => {
        console.error('Erro ao pesquisar :', error);
      },
    });
  }

  clearSearchResult() {
    this.searchResultSub.next(null);
    this.currentCharacterQuerSub$.next(null);
  }
}
