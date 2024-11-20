import { useState } from 'react';
import { TeamsDashboard } from './TeamsDashboard';
import { MatchesDashboard } from './MatchesDashboard';
import { RankingBoard } from './RankingBoard';

export function ChampionshipDashboard() {
  const handleCompetitionTitle = () => {
    const competitionType = localStorage.getItem('competitionType');
    if (competitionType) {
      return competitionType;
    }
    return 'Type de compétition non déterminée';
  };
  // État pour déterminer quel composant afficher
  const [printComposant, setPrintComposant] = useState(null);

  // Dictionnaire des composants
  const composants = {
    equipes: <TeamsDashboard />,
    matches: <MatchesDashboard />,
    classement: <RankingBoard />,
  };

  return (
    <div>
      <h1>{handleCompetitionTitle()}</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setPrintComposant('equipes')}>Équipes</button>
        <button onClick={() => setPrintComposant('matches')}>Matches</button>
        <button onClick={() => setPrintComposant('classement')}>
          Classement
        </button>
      </div>
      <div>{composants[printComposant] || null}</div>
    </div>
  );
}
