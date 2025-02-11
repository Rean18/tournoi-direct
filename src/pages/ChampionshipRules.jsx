import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BlueCard } from '../components/common/blueCard';
import '../styles/Championship/Championship.css';
import { Button } from '../components/common/button';

export function ChampionshipRules() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numberOfTeams: '',
    twoLeggedTie: '',
    victoryPoint: '',
    defeatPoint: '',
    drawPoint: '',
    simultMatches: '',
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
    console.log('Modification réussie');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    navigate('matches');
    console.log('Data :', formData);
  };

  const buttonsConfig = [
    {
      buttonText: '',
      route: '',
      style: '',
      onClick: '',
      type: '',
    },
  ];

  const formConfig = [
    {
      id: 'team-number',
      name: 'numberOfTeams',
      title: "Nombre d'équipes",
      type: 'number',
      value: formData.numberOfTeams,
    },
    {
      id: 'two-legged-tie',
      name: 'twoLeggedTie',
      title: 'Matches Aller-Retour',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      value: formData.twoLeggedTie,
    },
    {
      id: 'victory-point',
      name: 'victoryPoint',
      title: 'Points par victoire',
      type: 'number',
      value: formData.victoryPoint,
    },
    {
      id: 'defeat-point',
      name: 'defeatPoint',
      title: 'Points par défaite',
      type: 'number',
      value: formData.defeatPoint,
    },
    {
      id: 'draw-point',
      name: 'drawPoint',
      type: 'number',
      title: "Points en cas d'égalité",
      value: formData.drawPoint,
    },
    {
      id: 'simult-matches',
      name: 'simultMatches',
      title: 'Nombre de matches joués en simultané',
      type: 'number',
      value: formData.simultMatches,
    },
  ];

  return (
    <div>
      <BlueCard cardTitle="Configurez le championnat" buttons={buttonsConfig}>
        <form id="options" onSubmit={handleSubmit}>
          {formConfig.map((field) => {
            if (field.type === 'select') {
              return (
                <div key={field.id} className="label-wrapper">
                  <label htmlFor={field.id}>{field.title}</label>
                  <select
                    id={field.id}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    required
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            } else {
              return (
                <div key={field.id} className="label-wrapper">
                  <label htmlFor={field.id}>{field.title}</label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    onChange={handleChange}
                    required
                  />
                </div>
              );
            }
          })}
          <Button buttonText="Validez" style="light" type="submit"></Button>
        </form>
      </BlueCard>
    </div>
  );
}
