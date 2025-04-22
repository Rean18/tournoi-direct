import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { BlueCard } from '../components/common/blueCard';
import '../styles/Championship/Championship.css';
import { Button } from '../components/common/button';
import DOMpurify from 'dompurify';
import InfiniteScroll from 'react-infinite-scroll-component';

export function ChampionshipRules() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numberOfTeams: '2',
    twoLeggedTie: '',
    victoryPoint: '',
    defeatPoint: '',
    drawPoint: '',
    simultMatches: '1',
  });
  const [errorFormMessage, setErrorFormMessage] = useState('error-hidden');
  const sanitizeInput = (input) => {
    return DOMpurify.sanitize(input);
  };
  const [displayedRules, setDisplayedRules] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const sanitizedValue = sanitizeInput(rawValue);

    if (e.target.type === 'number') {
      if (sanitizedValue === '') {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: '',
        }));
        localStorage.setItem(
          'formData',
          JSON.stringify({
            ...formData,
            [e.target.name]: '',
          })
        );
        return;
      }
      const numberValue = Number(sanitizedValue);
      if (
        numberValue < 0 ||
        !Number.isInteger(numberValue) ||
        numberValue > 100
      ) {
        setErrorFormMessage('error-visible');
        setTimeout(() => setErrorFormMessage('error-hidden'), 4000);
        return;
      } else if (e.target.name === 'simultMatches') {
        if (numberValue < 1) {
          setErrorFormMessage('error-visible');
          setTimeout(() => setErrorFormMessage('error-hidden'), 4000);
          return;
        }
      } else if (e.target.name === 'numberOfTeams') {
        if (numberValue < 2) {
          setErrorFormMessage('error-visible');
          setTimeout(() => setErrorFormMessage('error-hidden'), 4000);
          return;
        }
      } else {
        setErrorFormMessage('error-hidden');
      }
    }
    const newFormData = {
      ...formData,
      [e.target.name]: sanitizedValue,
    };
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
    console.log('Modification réussie');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    navigate('../matches');
    console.log('Data :', formData);
  };

  const buttonsConfig = [
    {
      buttonText: '',
      route: '',
      style: 'hidden',
      onClick: '',
      type: '',
    },
  ];

  const formConfig = useMemo(() => {
    return [
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
  }, [formData]);

  //Gestion du sroll
  useEffect(() => {
    setDisplayedRules(formConfig.slice(0, 4));
  }, [formConfig]);

  useEffect(() => {
    if (displayedRules.length >= formConfig.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [displayedRules, formConfig]);

  const fetchMoreData = () => {};
  if (displayedRules.length >= formConfig.length) {
    setHasMore(false);
    return;
  }
  return (
    <div className="main-content">
      <div className={errorFormMessage}>
        <p> Erreur, le nombre entré n{"'"}est pas valide</p>
      </div>
      <h1>Tournoi Direct</h1>
      <InfiniteScroll
        dataLength={displayedRules.length}
        next={fetchMoreData}
        hasMore={hasMore}
        scrollableTarget="scrollableRulesContainer"
      >
        <BlueCard
          id="scrollableRulesContainer"
          cardTitle="Options du championnat "
          buttons={buttonsConfig}
        >
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
                      pattern="\d+"
                      onChange={handleChange}
                      onFocus={(e) => {
                        e.target.select();
                        setTimeout(() => {
                          e.target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                        }, 100);
                      }}
                      required
                    />
                  </div>
                );
              }
            })}

            <Button buttonText="Validez" style="light" type="submit"></Button>
          </form>
        </BlueCard>
      </InfiniteScroll>
    </div>
  );
}
