export function formatSeason(episode: string) {
  const season = episode.slice(0, 3).split('S').join('');
  const ep = episode.slice(4, 6).split('S').join('');

  return `Episódio ${ep} | Temporada ${season}`;
}
