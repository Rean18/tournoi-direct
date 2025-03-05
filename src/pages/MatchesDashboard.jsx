import { useEffect, useState, useMemo } from 'react';
import { roundRobin } from '../utils/matchLogic.js';

export function MatchesDashboard() {
  const teamsData = localStorage.getItem('teamsData');
  const parsedTeams = JSON.parse(teamsData || '[]');
  const teamsList = parsedTeams.map((team) => team.name);
  const rulesJSON = localStorage.getItem('formData');
  const rules = JSON.parse(rulesJSON || '{}');
  const twoLeggedTie = rules.twoLeggedTie === 'oui';
  const victoryPoints = Number(rules.victoryPoint);
  const defeatPoints = Number(rules.defeatPoint);
  const drawPoints = Number(rules.drawPoint);
  const numberOfSimultMatches = Number(rules.simultMatches);

  const [teamsStats, setTeamsStats] = useState(parsedTeams);
  const [inputValues, setInputValues] = useState(() => {
    const storedInputs = localStorage.getItem('inputValues');
    return storedInputs ? JSON.parse(storedInputs) : {};
  });
  const [chunks, setChunks] = useState([]);

  const matches = useMemo(
    () => roundRobin(teamsList, twoLeggedTie),
    [teamsList, twoLeggedTie]
  );
  console.log('liste des matches JSX:', matches);

  const handleStats = (e) => {
    // Gestion des Inputs
    const { id, value } = e.target;
    if (value === '') {
      setInputValues((prevValues) => {
        const newValues = { ...prevValues, [id]: '' };
        localStorage.setItem('inputValues', JSON.stringify(newValues));
        return newValues;
      });
    } else {
      setInputValues((prevValues) => {
        const newValues = { ...prevValues, [id]: value };
        localStorage.setItem('inputValues', JSON.stringify(newValues));
        return newValues;
      });
    }
  };

  // Gestion de la l'affihage des matches
  useEffect(() => {
    console.log(
      'useEffect chunking déclenché',
      numberOfSimultMatches,
      matches.length
    );
    const newChunks = [];
    for (let i = 0; i < matches.length; i += numberOfSimultMatches) {
      const chunk = matches.slice(i, i + numberOfSimultMatches);
      newChunks.push(chunk);
    }
    setChunks(newChunks);
    console.log('Matches par vrais tour', newChunks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfSimultMatches]);

  // Mise à jours des Stats
  useEffect(() => {
    const updatedStats = teamsStats.map((team) => {
      let newGoalsScored = { ...(team.goalsScored || {}) };
      let newGoalsConceded = { ...(team.goalsConceded || {}) };
      let newVictory = { ...(team.victories || {}) };
      let newDefeat = { ...(team.defeats || {}) };
      let newDraw = { ...(team.draws || {}) };
      let newPoints = { ...(team.points || {}) };
      let newMatchPlayed = { ...(team.matchPlayed || {}) };

      chunks.forEach((chunk, chunkIndex) => {
        chunk.forEach((match, matchIndex) => {
          if (match.includes(team.name)) {
            const teamInputId = `${chunkIndex}-${matchIndex}-${team.name}`;
            const opponent = match[0] === team.name ? match[1] : match[0];
            const opponentInputId = `${chunkIndex}-${matchIndex}-${opponent}`;
            // Matches joués
            if (
              newMatchPlayed[teamInputId] === undefined ||
              inputValues[teamInputId] === ''
            ) {
              newMatchPlayed[teamInputId] = 0;
            } else {
              newMatchPlayed[teamInputId] = 1;
            }

            // Buts marqués et encaissés
            if (inputValues[teamInputId] !== undefined) {
              newGoalsScored[teamInputId] = Number(inputValues[teamInputId]);
            }
            if (inputValues[opponentInputId] !== undefined) {
              newGoalsConceded[teamInputId] = Number(
                inputValues[opponentInputId]
              );
            }
            // Gestion d'un score vide
            if (
              inputValues[teamInputId] === undefined ||
              inputValues[teamInputId] === ''
            ) {
              newPoints[teamInputId] = 0;
              newGoalsConceded[teamInputId] = 0;
              newGoalsScored[teamInputId] = 0;
            } else {
              if (newGoalsScored[teamInputId] < newGoalsConceded[teamInputId]) {
                newPoints[teamInputId] = defeatPoints;
                newDefeat[teamInputId] = 1;
              }
              if (
                newGoalsScored[teamInputId] === newGoalsConceded[teamInputId]
              ) {
                newPoints[teamInputId] = drawPoints;
                newDraw[teamInputId] = 1;
              }

              if (newGoalsScored[teamInputId] > newGoalsConceded[teamInputId]) {
                newPoints[teamInputId] = victoryPoints;
                newVictory[teamInputId] = 1;
              }
            }
          }
        });
      });

      const sumValues = (obj) =>
        Object.values(obj).reduce((acc, curr) => acc + curr, 0);

      const totalGoalsScored = sumValues(team.goalsScored);
      const totalGoalsConceded = sumValues(team.goalsConceded);
      const totalPoints = sumValues(team.points);
      const totalMatchPlayed = sumValues(team.matchPlayed);
      const totalVictories = sumValues(team.victories);
      const totalDefeats = sumValues(team.defeats);
      const totalDraws = sumValues(team.draws);

      return {
        ...team,
        goalsScored: newGoalsScored,
        totalGoalsScored: totalGoalsScored,
        goalsConceded: newGoalsConceded,
        totalGoalsConceded: totalGoalsConceded,
        points: newPoints,
        totalPoints: totalPoints,
        matchPlayed: newMatchPlayed,
        totalMatchPlayed: totalMatchPlayed,
        victories: newVictory,
        totalVictories: totalVictories,
        defeats: newDefeat,
        totalDefeats: totalDefeats,
        draws: newDraw,
        totalDraws: totalDraws,
      };
    });

    setTeamsStats(updatedStats);
    localStorage.setItem('teamsData', JSON.stringify(updatedStats));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValues, victoryPoints, defeatPoints, drawPoints, teamsData]);

  return (
    <div>
      <h2>Liste de tous les matchs</h2>

      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex}>
          <h2>Tour {chunkIndex + 1}</h2>
          {chunk.map((team, matchIndex) => (
            <div key={matchIndex}>
              {team[0]}
              <input
                id={`${chunkIndex}-${matchIndex}-${team[0]}`}
                name={team[0][0]}
                type="number"
                onChange={handleStats}
                value={inputValues[`${chunkIndex}-${matchIndex}-${team[0]}`]}
              />{' '}
              -{' '}
              <input
                id={`${chunkIndex}-${matchIndex}-${team[1]}`}
                name={team[1]}
                type="number"
                onChange={handleStats}
                value={inputValues[`${chunkIndex}-${matchIndex}-${team[1]}`]}
              />
              {team[1]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
