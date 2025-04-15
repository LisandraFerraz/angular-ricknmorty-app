import { Injectable } from '@angular/core';
import { CoreApiService } from '../core/core-api.service';
import { endpoints } from '../core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private coreApi: CoreApiService) {}

  listAllCharacters(params: {}) {
    return this.coreApi.get(endpoints.getCharacter, { params });
  }

  // [FEATRURE]: usar para listar personagens favoritos adicionados pelo usuário
  listCharacter(id: string | number) {
    return this.coreApi.get(`${endpoints.getCharacter}/${id}`);
  }

  listEpisode(id: string | number) {
    return this.coreApi.get(`${endpoints.getEpisode}/${id}`);
  }
}
