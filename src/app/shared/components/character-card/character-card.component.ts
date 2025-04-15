import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() data: Character = new Character();

  ngOnInit(): void {}

  filterGender(gender: CharacterGenders) {
    return filterCharGender(gender);
  }
  filterStatus(status: CharacterStatus) {
    return filterCharStatus(status);
  }

  filterSpecies(species: string) {
    return filterCharSpecies(species);
  }
}
