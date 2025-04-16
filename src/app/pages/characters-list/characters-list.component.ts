import { Component, signal } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { CharacterQuery } from 'app/shared/utils/classes/queries';
import { Character } from 'app/shared/utils/classes/character';
import { CharacterCardComponent } from 'app/shared/components/character-card/character-card.component';
import { SearchService } from 'app/services/search.service';
import { Subscription } from 'rxjs';
import { InfiniteScroll } from 'app/shared/utils/directives/infinite-scroll.directive';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent, InfiniteScroll],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent {
  constructor(
    private contentService: ContentService,
    private searchService: SearchService
  ) {}

  page = 1;

  query = new CharacterQuery();
  characterList: Character[] = [];
  searchResults: any = [];

  private sub!: Subscription;

  private limitSignal = signal<number>(30);
  hasMorePages: boolean = true;

  ngOnInit(): void {
    this.listCharacters(this.page);

    this.sub = this.searchService.searchResult.subscribe({
      next: (res) => {
        this.searchResults = res;
      },
    });
  }

  loadMoreData() {
    if (!this.hasMorePages) return;

    this.page++;
    this.listCharacters(this.page);
  }

  listCharacters(page: number) {
    this.query.page = page;
    this.contentService.listAllCharacters(this.query).subscribe({
      next: (res: any) => {
        const loadedCharacters = res.results.map((item: Character) =>
          Object.assign(new Character(), item)
        );

        this.characterList = [...this.characterList, ...loadedCharacters];

        if (!res.info.next) {
          this.hasMorePages = false;
        }
      },
      error: (error: any) => {
        // [WIP] Adicionar melhor tratamento de erro
        console.error('Não foi possível listar os personagens.', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
