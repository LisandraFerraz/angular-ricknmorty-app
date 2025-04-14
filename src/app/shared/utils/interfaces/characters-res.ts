import { ICharacter } from './character';

export interface ICharacterRes {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}
