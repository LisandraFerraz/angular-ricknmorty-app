import { Component } from '@angular/core';
import { ModalTemplateComponent } from '../modal-template.component';
import { CharacterQuery } from 'app/shared/utils/classes/queries';
import { SearchService } from 'app/services/search.service';
import {
  CharacterGenders,
  CharacterStatus,
} from 'app/shared/utils/classes/character';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [FormsModule, ModalTemplateComponent],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent {
  constructor(private searchService: SearchService) {}

  searchQuery: CharacterQuery = new CharacterQuery();

  charStatus = Object.keys(CharacterStatus);
  charGenders = Object.keys(CharacterGenders);

  search() {
    this.searchService.searchContent(this.searchQuery);
  }

  ngOnDestroy(): void {}
}
