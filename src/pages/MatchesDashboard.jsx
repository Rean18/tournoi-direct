import { useState } from 'react';
import { roundRobin } from '../utils/matchLogic.js';

export function MatchesDashboard() {
  const teamsData = localStorage.getItem('teamsData');
  const parsedTeams = JSON.parse(teamsData || '[]');
  const teamsList = parsedTeams.map((team) => team.name);
  const rulesJSON = localStorage.getItem('formData');
  const rules = JSON.parse(rulesJSON || '{}');
  const twoLeggedTie = rules.twoLeggedTie === 'oui';
  console.log('valeur de twoleggedtie', twoLeggedTie);
  const numberOfSimultMatche = rules.numberOfSimultMatche;

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

    const teamName = e.target.name;
    const score = Number(e.target.value);
    const updateTeamsStats = teamsStats.map((team) => {
      if (team.name === teamName) {
        return {
          ...team,
          goalsScored: [...team.goalsScored, score],
        };
      }
      return team;
    });
    setTeamsStats(updateTeamsStats);
    localStorage.setItem('teamsData', JSON.stringify(updateTeamsStats));
  };

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
