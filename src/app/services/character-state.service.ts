import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterStateService {
  constructor() {}

  private readonly activeCharValues = signal({
    charName: '',
    charIcon: '',
    charColor: '',
  });

  readonly activeName = computed(() => this.activeCharValues().charName);
  readonly activeIcon = computed(() => this.activeCharValues().charIcon);
  readonly activeColor = computed(() => this.activeCharValues().charColor);

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
}
