export interface ICharacter {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGenders;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
  url: string;
  created: string;
}

enum CharacterGenders {
  Female = 'Female',
  Male = 'Male',
  Genderless = 'Genderless',
  unknown = 'unknown',
}

enum CharacterStatus {
  Alive = 'Alive',
  Dead = 'Dead',
}
