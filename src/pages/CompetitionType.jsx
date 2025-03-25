import { Outlet } from 'react-router';
import { BlueCard } from '../components/common/blueCard';
import '../styles/CompetitionType/CompetitionType.css';

export function CompetitionType() {
  const handleCompetitionChoice = (competitionType) => {
    localStorage.setItem('competitionType', competitionType);
  };

  const buttonConfig = [
    {
      buttonText: 'Championnat',
      route: 'championship',
      style: 'light',
      onClick: () => handleCompetitionChoice('Championnat'),
    },
    {
      buttonText: 'Coupe',
      route: 'cup',
      style: 'light',
      onClick: () => handleCompetitionChoice('Coupe'),
    },
  ];

  return (
    <div className="main-content">
      <div className="rules-page">
        <BlueCard
          cardTitle="Choisissez le type de tournoi"
          buttons={buttonConfig}
        />
        <div className="rules-container">
          <div className="rules">
            <h4>Championnats : </h4>
            <p>
              Toutes les équipes s{`'`}affrontent sur des matches aller ou
              aller-retour
            </p>
          </div>
          <div className="rules">
            <h4>Coupe :</h4>
            <p>
              Chaque équipe joue des matches à élimination direct avec l{`'`}
              objectif de gagner la finale
            </p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
