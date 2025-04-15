import { Injectable } from '@angular/core';
import { CoreApiService } from 'app/core/core-api.service';
import { endpoints } from 'app/core/endpoints';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResultSub = new Subject<any[]>();
  searchResult = this.searchResultSub.asObservable();

  constructor(private coreApi: CoreApiService) {}

  searchContent(params: {}) {
    const searchPromise = this.coreApi.get(endpoints.getCharacter, { params });

    searchPromise.subscribe({
      next: (res) => {
        this.searchResultSub.next(res);
      },
      error: (error) => {
        console.error('Erro ao pesquisar :', error);
      },
    });
  }
}
