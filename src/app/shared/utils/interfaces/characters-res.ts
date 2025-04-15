import { Character } from '../classes/character';

export interface CharacterRes {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
