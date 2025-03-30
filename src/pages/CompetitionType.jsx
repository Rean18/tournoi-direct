import { Outlet } from 'react-router';
import { BlueCard } from '../components/common/blueCard';
import '../styles/CompetitionType/CompetitionType.css';
import { CircleInfo } from '../components/common/circleInfo';

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
      buttonText: 'Coupe  🚧 ',
      route: 'cup',
      style: 'light',
      onClick: () => handleCompetitionChoice('Coupe'),
    },
  ];

  return (
    <div className="main-content">
      <div className="rules-page">
        <h1>Tournoi Direct</h1>
        <BlueCard
          cardTitle="Choisissez le type de tournoi"
          buttons={buttonConfig}
        />
        <CircleInfo
          message={
            <>
              <div>
                <div>
                  <h4>Championnats : </h4>
                  <p>
                    Toutes les équipes s{`'`}affrontent sur des matches aller ou
                    aller-retour
                  </p>
                </div>
                <div>
                  <h4>Coupe :</h4>
                  <p>
                    Chaque équipe joue des matches à élimination direct avec l
                    {`'`}
                    objectif de gagner la finale
                  </p>
                </div>
              </div>
            </>
          }
        />

        <Outlet />
      </div>
    </div>
  );
}
