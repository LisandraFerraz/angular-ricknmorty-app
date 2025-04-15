import { CharacterGenders, CharacterStatus } from '../classes/character';

export function filterCharGender(gender: CharacterGenders) {
  const genderMap: {
    [key: string]: { label: string; icon: string };
  } = {
    [CharacterGenders.Female]: {
      label: 'Fêmea',
      icon: 'bi bi-gender-female text-pink',
    },
    [CharacterGenders.Male]: {
      label: 'Macho',
      icon: 'bi bi-gender-male text-blue',
    },
    [CharacterGenders.Genderless]: {
      label: 'Neutro',
      icon: 'bi bi-gender-neuter text-soft_blue',
    },
    [CharacterGenders.unknown]: {
      label: 'Desconhecido',
      icon: 'bi bi-question text-darker_space',
    },
  };

  return genderMap[gender];
}

export function filterCharStatus(status: CharacterStatus) {
  const statusUp = status ? status : 'unknown';

  const statusMap: {
    [key: string]: { label: string; icon: string };
  } = {
    [CharacterStatus.Alive]: {
      label: 'Vivo',
      icon: 'bi bi-emoji-laughing-fill text-green',
    },
    [CharacterStatus.Dead]: {
      label: 'Morto',
      icon: 'bi bi-emoji-dizzy-fill text-danger',
    },
    [CharacterStatus.unknown]: {
      label: 'Desconhedido',
      icon: 'bi bi-emoji-neutral-fill text-warning',
    },
  };
  return statusMap[statusUp];
}

export function filterCharSpecies(species: string) {
  const isHuman = species.toLocaleLowerCase() === 'human' ? 'human' : 'alien';

  const speciesMap: {
    [key: string]: { label: string; icon: string };
  } = {
    human: {
      label: 'Humano',
      icon: 'bi bi-person-arms-up text-brownish',
    },
    alien: {
      label: species,
      icon: 'bi bi-bug-fill text-esmerald',
    },
  };

  console.log(isHuman);

  return speciesMap[isHuman];
}
