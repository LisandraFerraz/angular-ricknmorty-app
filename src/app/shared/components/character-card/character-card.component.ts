import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from 'app/services/characters.service';
import { Character } from 'app/shared/utils/classes/character';
import {
  filterCharGender,
  filterCharSpecies,
} from 'app/shared/utils/functions/char-infos';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  constructor(private route: Router, private charService: CharactersService) {}

  @Input() data: Character = new Character();

  filterStatus = filterCharSpecies;
  filterSpecies = filterCharSpecies;
  filterGender = filterCharGender;

  goToCharPage(charId: number) {
    this.route.navigate([`/character/${charId}`]);
  }

  saveCharacter(charData: Character) {
    charData.favorite = !charData.favorite;
    this.charService.saveCharacter(charData);
  }
}
