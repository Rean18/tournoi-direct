import { useEffect, useState } from 'react';
import { roundRobin } from '../utils/matchLogic.js';

export function MatchesDashboard() {
  const teamsData = localStorage.getItem('teamsData');
  const parsedTeams = JSON.parse(teamsData || '[]');
  const teamsList = parsedTeams.map((team) => team.name);
  const rulesJSON = localStorage.getItem('formData');
  const rules = JSON.parse(rulesJSON || '{}');
  const twoLeggedTie = rules.twoLeggedTie === 'oui';
  const numberOfSimultMatche = rules.numberOfSimultMatche;
  const victoryPoints = Number(rules.victoryPoint);
  const defeatPoints = Number(rules.defeatPoint);
  const drawPoints = Number(rules.drawPoint);

  const [teamsStats, setTeamsStats] = useState(parsedTeams);
  const [inputValues, setInputValues] = useState(() => {
    const storedInputs = localStorage.getItem('inputValues');
    return storedInputs ? JSON.parse(storedInputs) : {};
  });

  const matches = roundRobin(teamsList, twoLeggedTie);
  console.log('liste des matches JSX:', matches);

  const handleStats = (e) => {
    // Gestion des Inputs
    const { id, value } = e.target;
    setInputValues((prevValues) => {
      const newValues = { ...prevValues, [id]: value };
      localStorage.setItem('inputValues', JSON.stringify(newValues));
      return newValues;
    });
  };

  // Mise à jours des Stats
  useEffect(() => {
    const updatedStats = teamsStats.map((team) => {
      let newGoalsScored = { ...(team.goalsScored || {}) };
      let newGoalsConceded = { ...(team.goalsConceded || {}) };
      let newPoints = { ...(team.points || {}) };
      console.log('POINTS AVANTS', newPoints);

      matches.forEach((match, index) => {
        if (match.includes(team.name)) {
          const teamInputId = `${index}-${team.name}`;
          const opponent = match[0] === team.name ? match[1] : match[0];
          const opponentInputId = `${index}-${opponent}`;

          if (inputValues[teamInputId] !== undefined) {
            newGoalsScored[teamInputId] = Number(inputValues[teamInputId]);
          }
          if (inputValues[opponentInputId] !== undefined) {
            newGoalsConceded[teamInputId] = Number(
              inputValues[opponentInputId]
            );
          }

          if (newGoalsScored[teamInputId] < newGoalsConceded[teamInputId]) {
            newPoints[teamInputId] = defeatPoints;
          }
          if (newGoalsScored[teamInputId] === newGoalsConceded[teamInputId]) {
            newPoints[teamInputId] = drawPoints;
          }

          if (newGoalsScored[teamInputId] > newGoalsConceded[teamInputId]) {
            newPoints[teamInputId] = victoryPoints;
          }
        }
      });
      const totalGoalsScored = Object.values(team.goalsScored).reduce(
        (acc, curr) => acc + curr,
        0
      );
      const totalGoalsConceded = Object.values(team.goalsConceded).reduce(
        (acc, curr) => acc + curr,
        0
      );
      const totalPoints = Object.values(team.points).reduce(
        (acc, curr) => acc + curr,
        0
      );

      return {
        ...team,
        goalsScored: newGoalsScored,
        totalGoalsScored: totalGoalsScored,
        goalsConceded: newGoalsConceded,
        totalGoalsConceded: totalGoalsConceded,
        points: newPoints,
        totalPoints: totalPoints,
      };
    });

    setTeamsStats(updatedStats);
    localStorage.setItem('teamsData', JSON.stringify(updatedStats));
  }, [
    inputValues,
    matches,
    defeatPoints,
    drawPoints,
    victoryPoints,
    teamsStats,
  ]);

  return (
    <div>
      <h2>Liste de tous les matchs</h2>
      {matches.map((team, index) => (
        <div key={index}>
          {team[0]}
          <input
            id={index + '-' + team[0]}
            name={team[0]}
            type="number"
            onChange={handleStats}
            value={inputValues[index + '-' + team[0]]}
          />{' '}
          -{' '}
          <input
            id={index + '-' + team[1]}
            name={team[1]}
            type="number"
            onChange={handleStats}
            value={inputValues[index + '-' + team[1]]}
          />
          {team[1]}
        </div>
      ))}
    </div>
  );
}
