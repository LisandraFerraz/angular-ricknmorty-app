export function formatAirDate(airDate: string) {
  const monthMap: { [key: string]: string } = {
    january: 'Janeiro',
    february: 'Fevereiro',
    march: 'Março',
    april: 'Abril',
    may: 'Maio',
    june: 'Junho',
    july: 'Julho',
    august: 'Agosto',
    september: 'Setembro',
    octoner: 'Outubro',
    november: 'Novembro',
    december: 'Dezembro',
  };

  const airDateSplit = airDate.split(' ');
  const month = monthMap[airDateSplit[0].toLowerCase()];

  return `${airDateSplit[1].replace(',', '')} de ${month} de ${
    airDateSplit[2]
  }`;
}
