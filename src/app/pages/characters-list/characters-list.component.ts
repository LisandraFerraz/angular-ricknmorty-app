import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { CharacterQuery } from 'app/shared/utils/classes/queries';
import { Character } from 'app/shared/utils/classes/character';
import { CharacterCardComponent } from 'app/shared/components/character-card/character-card.component';
import { SearchService } from 'app/services/search.service';
import { Subscription } from 'rxjs';
import { InfiniteScroll } from 'app/shared/utils/directives/infinite-scroll.directive';
import { ListHeaderComponent } from 'app/shared/components/list-header/list-header.component';
import { ICharacterRes } from 'app/shared/utils/interfaces/characters-res';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CharacterCardComponent, InfiniteScroll, ListHeaderComponent],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent implements OnDestroy, OnInit {
  private sub!: Subscription;

  constructor(
    private contentService: ContentService,
    private searchService: SearchService
  ) {}

  query = new CharacterQuery();
  characterList: Character[] = [];
  searchResults: any = [];
  hasMorePages: boolean = true;
  isFiltered: boolean = false;

  ngOnInit(): void {
    this.searchService.currentCharQuery$.subscribe((query: any) => {
      if (query) {
        const isFirstLoad = !this.query;
        this.isFiltered = true;
        this.query = query;

        if (isFirstLoad || query.page === 1) {
          this.characterList = [];
        }
      }
    });

    this.sub = this.searchService.searchResult.subscribe({
      next: (res: any) => {
        const loadedCharacters = res.results?.map((char: Character) =>
          Object.assign(new Character(), char)
        );

        if (this.query.page === 1 && !res.info?.next) {
          this.characterList = Array.isArray(loadedCharacters)
            ? loadedCharacters
            : [loadedCharacters];
        } else {
          this.characterList = [...this.characterList, ...loadedCharacters];
        }

        this.hasMorePages = !!res.info?.next;
      },
    });

    const savedQuery = localStorage.getItem('@characterQuery');

    if (savedQuery) {
      this.isFiltered = true;
      const parsed = JSON.parse(savedQuery);
      this.searchService.searchContent(parsed);
    } else {
      this.isFiltered = false;
      this.characterList = [];
      this.listCharacters(1);
    }
  }

  loadMoreData() {
    if (!this.hasMorePages) return;
    this.query.page++;
    if (this.isFiltered) {
      this.searchService.searchContent(this.query);
    } else {
      this.listCharacters(this.query.page);
    }
  }

  listCharacters(page: number) {
    this.query.page = page;
    this.contentService.listAllCharacters(this.query).subscribe({
      next: (res: ICharacterRes) => {
        this.isFiltered = false;
        const loadedCharacters = res.results.map((item: Character) =>
          Object.assign(new Character(), item)
        );

        if (page === 1) {
          this.characterList = Array.isArray(loadedCharacters)
            ? loadedCharacters
            : [loadedCharacters];
        } else {
          this.characterList = [...this.characterList, ...loadedCharacters];
        }

        this.hasMorePages = !!res.info.next;
      },
      error: (error: any) => {
        this.characterList = [];
      },
    });
  }

  clearFilters() {
    localStorage.removeItem('@characterQuery');
    this.query = new CharacterQuery();
    this.characterList = [];
    this.searchService.clearSearchResult();
    this.listCharacters(1);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.clearFilters();
  }
}
