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
  private searchResultSub = new Subject<any[]>();
  searchResult = this.searchResultSub.asObservable();

  private currentQuerySub = new BehaviorSubject<
    CharacterQuery | EpisodeQuery | null
  >(null);
  currentQuery$ = this.currentQuerySub.asObservable();

  constructor(private coreApi: CoreApiService, private route: Router) {}

  searchContent(params: CharacterQuery | EpisodeQuery) {
    this.currentQuerySub.next(params);

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
        // [WIP] Adicionar melhor tratamento de erro
        console.error('Erro ao pesquisar :', error);
      },
    });
  }
}
