import { Component } from '@angular/core';
import { ModalTemplateComponent } from '../modal-template.component';
import { CharacterQuery } from 'app/shared/utils/classes/payload';
import { SearchService } from 'app/services/search.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [ModalTemplateComponent],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent {
  constructor(private searchService: SearchService) {}

  searchQuery: CharacterQuery = new CharacterQuery();

  search() {
    this.searchService.searchContent(this.searchQuery);
  }
}
