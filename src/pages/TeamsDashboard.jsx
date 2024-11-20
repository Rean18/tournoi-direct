import { useEffect, useState } from 'react';
import '../styles/TeamsDashboard/TeamsDashboard.css';

export function TeamsDashboard() {
  const formData = localStorage.getItem('formData');
  const parsedFormData = JSON.parse(formData);
  const numberOfTeams = parseInt(parsedFormData.numberOfTeams);
  // Créer un tableau des équipes en fonction de leur nombre
  const organiseTeams = (n, existingTeams = []) => {
    const teams = [];
    for (let i = 1; i <= n; i++) {
      const existingTeam = existingTeams.find((team) => team.id === i);
      if (existingTeam) {
        teams.push(existingTeam);
        console.log('Equipe déjà existantes', teams);
      } else {
        teams.push({ id: i, name: `Équipe ${i}` });
      }
    }
    console.log('tableau des équipes', teams);
    return teams;
  };

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const savedTeams = localStorage.getItem('teamsData');

    if (savedTeams) {
      const parsedTeams = JSON.parse(savedTeams);
      if (parsedTeams.length !== numberOfTeams) {
        const updateTeamsNumber = organiseTeams(numberOfTeams, parsedTeams);
        setTeams(updateTeamsNumber);
        localStorage.setItem('teamsData', JSON.stringify(updateTeamsNumber));
        console.log('Modification des équipes');
      } else {
        setTeams(parsedTeams);
      }
    } else {
      const initialTeams = organiseTeams(numberOfTeams);
      setTeams(initialTeams);
      localStorage.setItem('teamsData', JSON.stringify(initialTeams));
      console.log('création des équipes', initialTeams);
    }
  }, [numberOfTeams]);

  const handleTeamName = (id, newName) => {
    const updateTeams = teams.map((team) =>
      team.id === id ? { ...team, name: newName } : team
    );
    setTeams(updateTeams);
    localStorage.setItem('teamsData', JSON.stringify(updateTeams));
    console.log('nom des équipes modifiés');
  };

  return (
    <div className="teams-dashboard">
      <h1>Modifier les équipes</h1>
      <ul id="teams-list">
        {teams.map((team) => {
          return (
            <li key={team.id}>
              <input
                type="text"
                value={team.name}
                name={`team-${team.id}`}
                onChange={(e) => handleTeamName(team.id, e.target.value)}
              />
              <div className="image-container">
                <img src="/logo_modifier.png" alt="logo de modification" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
