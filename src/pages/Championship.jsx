import { BlueCard } from '../components/common/blueCard';
import '../styles/Championship/Championship.css';

export function Championship() {
  const buttonsConfig = [
    {
      buttonText: 'Validez',
      route: 'matches',
      style: 'light',
    },
  ];

  return (
    <div>
      <BlueCard cardTitle="Configurez le championnat" buttons={buttonsConfig}>
        <form id="options" action="">
          <div className="label-wrapper">
            <label htmlFor="team-number">Nombre d{`'`}équipes</label>
            <input id="team-number" type="number" value={6} />
          </div>
          <div className="label-wrapper">
            <label htmlFor="two-legged-tie">Matches Aller&#8209;Retour</label>
            <select id="two-legged-tie" value={'Sans'}>
              <option value="Avec">Avec</option>
              <option value="Sans">Sans</option>
            </select>
          </div>
          <div className="label-wrapper">
            <label htmlFor="victory-point">Points par victoire</label>
            <input type="number" id="victory-point" value={3} />
          </div>
          <div className="label-wrapper">
            <label htmlFor="defeat-point">Points par défaite</label>
            <input type="number" id="defeat-point" value={1} />
          </div>
          <div className="label-wrapper">
            <label htmlFor="draw-point">Points en cas d{`'`}égalité</label>
            <input type="number" id="draw-point" value={2} />
          </div>
        </form>
      </BlueCard>
    </div>
  );
}
