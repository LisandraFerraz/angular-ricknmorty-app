import { computed, Injectable, signal } from '@angular/core';
import { Character } from 'app/shared/utils/classes/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor() {}

  private readonly activeCharValues = signal({
    charName: '',
    charIcon: '',
    charColor: '',
  });

  readonly activeName = computed(() => this.activeCharValues().charName);
  readonly activeIcon = computed(() => this.activeCharValues().charIcon);
  readonly activeColor = computed(() => this.activeCharValues().charColor);

  // Atribui um dos valores de iconsArray pra o signal
  setActiveChar() {
    const iconsArray = [
      { name: 'Mortypédia', icon: 'morty-icon.png', color: 'yellow' },
      { name: 'Rickypédia', icon: 'rick-icon.png', color: 'blue' },
    ];

    const random = Math.floor(Math.random() * iconsArray.length);
    const activeChar = iconsArray[random];

    this.activeCharValues.set({
      charColor: activeChar.color,
      charIcon: activeChar.icon,
      charName: activeChar.name,
    });
  }

  // salva o personagem no storage
  saveCharacter(charData: Character) {
    const localData = localStorage.getItem('@favChars');

    let favChars: Character[] = [];

    if (localData) {
      favChars = JSON.parse(localData);
    }

    const isSaved = favChars.find((char: Character) => char.id === charData.id);
    if (isSaved) {
      favChars = favChars.filter((char) => char.id !== charData.id);
    } else {
      favChars.push({ ...charData, favorite: true });
    }

    localStorage.setItem('@favChars', JSON.stringify(favChars));
  }

  getSavedChars(): Character[] {
    const localData = localStorage.getItem('@favChars');
    if (localData) {
      return JSON.parse(localData);
    }
    return [];
  }
}
