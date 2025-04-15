import { CharacterGenders, CharacterStatus } from '../interfaces/character';

export class CharacterQuery {
  name: string = '';
  status: CharacterStatus = CharacterStatus.all;
  species = '';
  type: string = '';
  gender: CharacterGenders = CharacterGenders.all;
}
export class EpisodeQuery {
  name = '';
  episode = '';
  page = 1;
}
