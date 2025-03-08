import { Outlet } from 'react-router';
import { BlueCard } from '../components/common/blueCard';

export function ChampionshipDataChoice() {
  const deleteData = (keys) => {
    if (
      window.confirm(
        'En démarrant un nouveau championnat, toutes les données du championnat précédent seront supprimées. Voulez-vous continuer ?'
      )
    ) {
      if (Array.isArray(keys)) {
        keys.forEach((key) => localStorage.removeItem(key));
      } else {
        localStorage.removeItem(keys);
      }
    }
  };
  const buttonConfig = [
    {
      buttonText: 'Continuer le Championnat',
      route: 'rules',
      style: 'light',
    },
    {
      buttonText: 'Nouveau Championnat',
      route: 'rules',
      style: 'light',
      onClick: () => deleteData(['teamsData', 'inputValues']),
    },
  ];

  return (
    <div className="main-content">
      <BlueCard
        cardTitle="Démarrer ou reprendre le championnat"
        buttons={buttonConfig}
      />
      <Outlet />
    </div>
  );
}
