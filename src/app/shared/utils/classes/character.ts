export class Character {
  id: number = 0;
  name: string = '';
  status: CharacterStatus = CharacterStatus.all;
  species: string = '';
  type: string = '';
  gender: CharacterGenders = CharacterGenders.all;
  origin: { name: string; url: string } = { name: '', url: '' };
  location: { name: string; url: string } = { name: '', url: '' };
  episode: string[] = [];
  url: string = '';
  image: string = '';
  created: string = '';
  favorite: boolean = false;
}

export enum CharacterGenders {
  all = '', //exclusivo para filtros, nao se aplica aos itens em tela
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  unknown = 'unknown',
}

export enum CharacterStatus {
  all = '', //exclusivo para filtros, nao se aplica aos itens em tela
  Alive = 'Alive',
  Dead = 'Dead',
  unknown = 'unknown',
}
