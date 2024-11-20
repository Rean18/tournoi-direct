import { useEffect, useState } from 'react';
import { BlueCard } from '../components/common/blueCard';
import '../styles/Championship/Championship.css';

export function ChampionshipRules() {
  const [formData, setFormData] = useState({
    numberOfTeams: '6',
    twoLeggedTie: 'Avec',
    victoryPoint: '3',
    defeatPoint: '2',
    drawPoint: '1',
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log('Data :', formData);
  };

  const buttonsConfig = [
    {
      buttonText: 'Validez',
      route: 'matches',
      style: 'light',
      onClick: handleSubmit,
      type: 'submit',
    },
  ];

  return (
    <div>
      <BlueCard cardTitle="Configurez le championnat" buttons={buttonsConfig}>
        <form id="options" onSubmit={handleSubmit}>
          <div className="label-wrapper">
            <label htmlFor="team-number">Nombre d{`'`}équipes</label>
            <input
              id="team-number"
              name="numberOfTeams"
              type="number"
              value={formData.numberOfTeams}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label-wrapper">
            <label htmlFor="two-legged-tie">Matches Aller&#8209;Retour</label>
            <select
              id="two-legged-tie"
              name="twoLeggedTie"
              value={formData.twoLeggedTie}
              onChange={handleChange}
              required
            >
              <option value="Avec">Avec</option>
              <option value="Sans">Sans</option>
            </select>
          </div>
          <div className="label-wrapper">
            <label htmlFor="victory-point">Points par victoire</label>
            <input
              type="number"
              id="victory-point"
              name="victoryPoint"
              value={formData.victoryPoint}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label-wrapper">
            <label htmlFor="defeat-point">Points par défaite</label>
            <input
              type="number"
              id="defeat-point"
              name="defeatPoint"
              value={formData.defeatPoint}
              onChange={handleChange}
              required
            />
          </div>
          <div className="label-wrapper">
            <label htmlFor="draw-point">Points en cas d{`'`}égalité</label>
            <input
              type="number"
              id="draw-point"
              name="drawPoint"
              value={formData.drawPoint}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </BlueCard>
    </div>
  );
}
