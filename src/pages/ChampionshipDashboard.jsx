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
  const [printComposant, setPrintComposant] = useState('equipes');
  const [isActive, setIsActive] = useState(1);

  // Dictionnaire des composants
  const composants = {
    equipes: <TeamsDashboard />,
    matches: <MatchesDashboard />,
    classement: <RankingBoard />,
  };

  return (
    <div className="main-content">
      <div id="championship-menu">
        <div>
          <h2>{handleCompetitionTitle()}</h2>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button
            id="btn-left"
            className={isActive === 1 ? 'active' : ''}
            onClick={() => {
              setPrintComposant('equipes');
              setIsActive(1);
            }}
          >
            Équipes
          </button>
          <button
            id="btn-center"
            className={isActive === 2 ? 'active' : ''}
            onClick={() => {
              setPrintComposant('matches');
              setIsActive(2);
            }}
          >
            Matches
          </button>
          <button
            id="btn-right"
            className={isActive === 3 ? 'active' : ''}
            onClick={() => {
              setPrintComposant('classement');
              setIsActive(3);
            }}
          >
            Classement
          </button>
        </div>
        <div className="composant-container">
          {composants[printComposant] || null}
        </div>
      </div>
    </div>
  );
}
