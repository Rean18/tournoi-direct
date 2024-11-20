import { useState } from 'react';

export function useMatchLogic() {
  const [matchOption, setMatchOption] = useState(null);
  const twoLeggedTie = localStorage.getItem('twoLeggedTie');
  const n = localStorage.getItem('numberOfTeams');

  const roundRobin = (teams) => {
    teams = () => {
      for (let i = n; i !== 0; i--) {
        teams.push(i);
      }
      console.log(teams);
    };
    if (teams.length % 2 !== 0) {
      teams.push(null);
    }
  };
  if (twoLeggedTie === 'Sans') {
    setMatchOption('Matches Aller uniquement');
  } else {
    setMatchOption('Matches Aller/Retour');
  }
}
