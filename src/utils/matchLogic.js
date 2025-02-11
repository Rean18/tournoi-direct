export function roundRobin(teamsList, twoLeggedTie) {
  if (teamsList.length % 2 !== 0) {
    teamsList.push('bye');
  }
  let nRotation = 0;
  const nTeams = teamsList.length;
  console.log(teamsList);
  if (twoLeggedTie === true) {
    nRotation = (nTeams - 1) * 2;
  } else {
    nRotation = nTeams - 1;
  }
  console.log('nombre de tour :', nRotation);

  const fixedTeam = teamsList[0]; //
  const rotatingTeams = teamsList.slice(1);
  let allMatches = [];

  for (let day = 0; day < nRotation; day++) {
    const dayMatches = [];
    const firstOpponent = rotatingTeams[rotatingTeams.length - 1]; // l'équipe fixe joue contre le dernier du tableau à chaque rotation
    dayMatches.push([fixedTeam, firstOpponent]);

    // on fait jouer les autres équipes en parcourant le tableau
    for (let i = 0; i < rotatingTeams.length - 1; i += 2) {
      // incrémentation de 2 car 2 équipes se rencontrent
      const home = rotatingTeams[i];
      const away = rotatingTeams[i + 1];
      dayMatches.push([home, away]);
    }

    allMatches.push(dayMatches);
    rotatingTeams.unshift(rotatingTeams.pop());
  }
  console.log('liste des matches par tour', allMatches);

  const matchesList = allMatches.flat();
  const allMatchesWithoutBye = matchesList.filter(
    (match) => !match.includes('bye')
  );
  console.log('liste des matches applatie', matchesList);

  return allMatchesWithoutBye;
}
