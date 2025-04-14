import { Injectable } from '@angular/core';
import { CoreApiService } from '../core/core-api.service';
import { endpoints } from '../core/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private coreApi: CoreApiService) {}

  listAllCharacters() {
    return this.coreApi.get(endpoints.getCharacter);
  }
}
