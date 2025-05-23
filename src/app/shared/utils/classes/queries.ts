import { CharacterGenders, CharacterStatus } from './character';

export class CharacterQuery {
  name: string = '';
  status: CharacterStatus = CharacterStatus.all;
  species = '';
  type: string = '';
  gender: CharacterGenders = CharacterGenders.all;
  page: number = 1;
}
export class EpisodeQuery {
  name: string = '';
  episode: string = '';
  page: number = 1;
}
