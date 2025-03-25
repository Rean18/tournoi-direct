import { Outlet } from 'react-router';
import '../styles/CompetitionType/CompetitionType.css';
import { useState } from 'react';
import { ConfirmWindow } from './ConfirmWindow';
import { BlueCard } from '../components/common/blueCard';

export function ChampionshipDataChoice() {
  const [showConfirm, setShowConfirm] = useState(false);

  const printWindowConfirm = () =>
    showConfirm ? 'window-showed' : 'window-hidden';

  const deleteData = (keys) => {
    console.log('deleteData appelée avec la clé:', keys);

    if (Array.isArray(keys)) {
      keys.forEach((key) => localStorage.removeItem(key));
      console.log('données supprimées', keys);
    } else {
      localStorage.removeItem(keys);
    }
  };
  const buttonConfig = [
    {
      buttonText: 'Continuer',
      route: 'rules',
      style: 'light',
    },
    {
      buttonText: 'Nouveau',
      style: 'light',
      onClick: () => setShowConfirm(true),
    },
  ];

  return (
    <div className="main-content">
      {showConfirm && (
        <ConfirmWindow
          title="Êtes-vous sur(e) ?"
          className={printWindowConfirm()}
          message="Si vous commencer un nouveau championnat, cela supprimera les données enregistrées lors de la précédente compétition et vous ne pourrez plus les récupérer."
          onConfirm={() => deleteData(['teamsData', 'inputValues', 'formData'])}
          onCancel={() => setShowConfirm(false)}
          cancelRoute=""
          confirmRoute="rules"
        />
      )}
      <div className="rules-page">
        <BlueCard
          cardTitle="Commencer ou continuer le championnat"
          buttons={buttonConfig}
        />
        <div className="rules-container">
          <div className="rules">
            <h4>Continuer : </h4>
            <p>
              Vous gardez les mêmes données enregistrées précédemment (équipes,
              résultats)
            </p>
          </div>
          <div className="rules">
            <h4>⚠️ Nouveau : </h4>
            <p>
              Vous effacer les données enregistrées précédemment et il sera
              impossible de les récupérer
            </p>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
