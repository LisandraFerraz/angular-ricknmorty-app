import { Component } from '@angular/core';
import { ModalTemplateComponent } from '../modal-template.component';
import { CharacterQuery, EpisodeQuery } from 'app/shared/utils/classes/queries';
import { SearchService } from 'app/services/search.service';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SearchCharacterComponent } from './search-character/search-character.component';
import { SearchEpisodeComponent } from './search-episode/search-episode.component';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    FormsModule,
    ModalTemplateComponent,
    SearchCharacterComponent,
    SearchEpisodeComponent,
  ],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent {
  constructor(
    private searchService: SearchService,
    private activeModal: NgbActiveModal,
    private router: Router
  ) {}

  searchQuery: CharacterQuery | EpisodeQuery | any = null;

  ngOnInit(): void {
    if (this.router.url.includes('character')) {
      this.searchQuery = new CharacterQuery();
      const query = localStorage.getItem('@characterQuery') || '';
      if (query) {
        const newQuery = JSON.parse(query);
        this.searchQuery = newQuery;
      }
    } else {
      this.searchQuery = new EpisodeQuery();
      const query = localStorage.getItem('@episodeQuery') || '';
      if (query) {
        const newQuery = JSON.parse(query);
        this.searchQuery = newQuery;
      }
    }
  }

  callSearch() {
    this.searchService.searchContent(this.searchQuery!);
    this.activeModal.close();
  }

  search() {
    const query = JSON.stringify(this.searchQuery!);
    this.router.url.includes('character')
      ? localStorage.setItem('@characterQuery', query)
      : localStorage.setItem('@episodeQuery', query);
    this.callSearch();
  }

  checkSearchType(): boolean {
    return this.router.url.includes('character');
  }

  setModalTitle(): string {
    return this.checkSearchType() ? 'Filtrar personagem' : 'Filtrar Episódio';
  }

  clearQuery() {
    localStorage.removeItem('@characterQuery');
    localStorage.removeItem('@episodeQuery');
    this.searchQuery = new CharacterQuery();
    this.callSearch();
  }
}
