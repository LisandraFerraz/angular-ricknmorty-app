import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
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

  charStatus = [
    { value: '', label: 'Todos' },
    { value: CharacterStatus.Alive, label: 'Vivo' },
    { value: CharacterStatus.Dead, label: 'Morto' },
    { value: CharacterStatus.unknown, label: 'Desconhecido' },
  ];

  charGenders = [
    { value: '', label: 'Todos' },
    { value: CharacterGenders.Female, label: 'Fêmea' },
    { value: CharacterGenders.Male, label: 'Macho' },
    { value: CharacterGenders.Genderless, label: 'Neutro' },
    { value: CharacterGenders.unknown, label: 'Desconhecido' },
  ];
}
