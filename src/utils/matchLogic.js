export function roundRobin(teamsList, twoLeggedTie) {
  const teams = [...teamsList];
  // Si le nombre d'équipes est impair, ajouter 'bye'
  if (teams.length % 2 !== 0) {
    teams.push('bye');
  }
  const nTeams = teams.length;
  // Le nombre de tours est nTeams - 1 (chaque équipe rencontre toutes les autres une seule fois)
  const rounds = nTeams - 1;
  let matches = [];

  // Pour chaque round
  for (let round = 0; round < rounds; round++) {
    let roundMatches = [];
    // Pour chaque paire, on prend l'élément i et son opposé (nTeams - 1 - i)
    for (let i = 0; i < nTeams / 2; i++) {
      const home = teams[i];
      const away = teams[nTeams - 1 - i];
      // Si l'un des matchs implique 'bye', on ne l'ajoute pas
      if (home !== 'bye' && away !== 'bye') {
        roundMatches.push([home, away]);
      }
    }
    // Ajouter tous les matchs de ce round au tableau global
    matches.push(...roundMatches);

    // Pour la rotation : on garde le premier élément (fixe)
    // et on déplace le dernier élément à la deuxième position.
    // Cela fait tourner les équipes tout en conservant une configuration round robin.
    teams.splice(1, 0, teams.pop());
  }

  // Si twoLeggedTie est activé, on crée un second tour (match retour)
  if (twoLeggedTie) {
    const returnMatches = matches.map((pair) => [pair[1], pair[0]]);
    matches = [...matches, ...returnMatches];
  }

  return matches;
}
