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
  created: string = '';
}

export enum CharacterGenders {
  all = '',
  female = 'female',
  male = 'male',
  genderless = 'genderless',
  unknown = 'unknown',
}

export enum CharacterStatus {
  all = '',
  alive = 'alive',
  dead = 'dead',
  unknown = 'unknown',
}
