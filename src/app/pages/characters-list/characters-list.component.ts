import { Component } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { CharacterQuery } from 'app/shared/utils/classes/payload';
import { Character } from 'app/shared/utils/interfaces/character';
import { CharacterCardComponent } from 'app/shared/components/character-card/character-card.component';
import { SearchService } from 'app/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent {
  constructor(
    private contentService: ContentService,
    private searchService: SearchService
  ) {}

  query = new CharacterQuery();

  characterList: Character[] = [];
  searchResults: any = [];

  private sub!: Subscription;

  ngOnInit(): void {
    this.listCharacters();

    this.sub = this.searchService.searchResult.subscribe({
      next: (res) => {
        this.searchResults = res;
        console.log(res);
      },
    });
  }

  listCharacters() {
    this.contentService.listAllCharacters(this.query).subscribe({
      next: (res: any) => {
        this.characterList = res.results.map((item: Character) =>
          Object.assign(new Character(), item)
        );
      },
      error: (error: any) => {
        console.error('Erro ao realizar a chamad | ', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
