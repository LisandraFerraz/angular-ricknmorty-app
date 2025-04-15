import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'app/services/content.service';
import { EpisodesCardComponent } from 'app/shared/components/episodes-card/episodes-card.component';
import {
  Character,
  CharacterGenders,
  CharacterStatus,
} from 'app/shared/utils/classes/character';
import {
  filterCharGender,
  filterCharSpecies,
  filterCharStatus,
} from 'app/shared/utils/functions/char-infos';
import { EpisodeDetailsModalComponent } from '../../shared/components/modal-template/episode-details-modal/episode-details-modal.component';
import { Episode } from 'app/shared/utils/classes/episode';
import { formatSeason } from 'app/shared/utils/functions/format-season';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [EpisodesCardComponent, EpisodeDetailsModalComponent],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService
  ) {}

  charData: Character = new Character();
  episodesData: Episode[] = [];

  filterGender = filterCharGender;
  filterStatus = filterCharStatus;
  filterSpecies = filterCharSpecies;

  ngOnInit(): void {
    this.getCharacterDetails();
  }

  getCharacterDetails() {
    let id = this.route.snapshot.paramMap.get('id');
    this.contentService.listCharacter(Number(id)).subscribe({
      next: (res) => {
        this.charData = res;
        this.getEpisodes();
      },
      error: (err) => {
        console.error('Erro ao listar os detalhes do personagem. ', err);
      },
    });
  }

  getEpisodes() {
    const epIds = this.charData.episode.map((ep: any) => ep.slice(-1));

    this.contentService.listEpisode(epIds.join(',')).subscribe({
      next: (res) => {
        this.episodesData = res;
      },
      error: (err) => {
        console.error('Não foi possível listar os episódios...', err);
      },
    });
  }
}
