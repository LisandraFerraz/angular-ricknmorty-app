import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Character,
  CharacterGenders,
  CharacterStatus,
} from 'app/shared/utils/classes/character';
import { CharacterQuery } from 'app/shared/utils/classes/queries';

@Component({
  selector: 'app-search-character',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-character.component.html',
  styleUrl: './search-character.component.scss',
})
export class SearchCharacterComponent {
  @Input() query: CharacterQuery = new CharacterQuery();

  charStatus = Object.keys(CharacterStatus);
  charGenders = Object.keys(CharacterGenders);
}
