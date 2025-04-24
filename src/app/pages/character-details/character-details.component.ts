import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from 'app/services/content.service';
import { EpisodesCardComponent } from 'app/shared/components/episodes-card/episodes-card.component';
import { Character } from 'app/shared/utils/classes/character';
import {
  filterCharGender,
  filterCharSpecies,
  filterCharStatus,
} from 'app/shared/utils/functions/char-infos';
import { Episode } from 'app/shared/utils/classes/episode';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SlicePipe } from '@angular/common';
import { CharactersService } from 'app/services/characters.service';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [EpisodesCardComponent, RouterLink, NgbPaginationModule, SlicePipe],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private charService: CharactersService
  ) {}

  charData: Character = new Character();
  episodesData: Episode[] = [];

  filterGender = filterCharGender;
  filterStatus = filterCharStatus;
  filterSpecies = filterCharSpecies;

  page: number = 1;
  pageSize: number = 8;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      const charId = Number(params.get('id'));
      if (charId) {
        this.getCharacterDetails(charId);
      }
    });
  }

  saveCharacter(charData: Character) {
    console.log(charData);
    charData.favorite = !charData.favorite;
    this.charService.saveCharacter(charData);
  }

  getCharacterDetails(id: number) {
    this.contentService.listCharacter(id).subscribe({
      next: (res) => {
        const savedChars = this.charService.getSavedChars();
        const isFavorite = savedChars.find((char) => res.id === char.id);

        this.charData = isFavorite?.favorite ? isFavorite : res;
        this.getEpisodes();
      },
      error: (err) => {
        console.error('Erro ao listar os detalhes do personagem. ', err);
      },
    });
  }

  getEpisodes() {
    const epIds = this.charData.episode.map((ep: any) => +ep.split('/').pop()!);
    const ids = epIds.length > 1 ? epIds.join(',') : epIds.pop();

    this.contentService.listEpisode(String(ids)).subscribe({
      next: (res) => {
        this.episodesData = Array.isArray(res) ? res : [res];
      },
      error: (err) => {
        console.error('Não foi possível listar os episódios...', err);
      },
    });
  }
}
