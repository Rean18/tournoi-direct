import { Button } from './button';
import '../../styles/blueCard/blueCard.css';

export function BlueCard({ children, cardTitle, buttons }) {
  return (
    <div className="blue-card">
      <h3>{cardTitle}</h3>
      {children}

      <div className="button-group">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            buttonText={btn.buttonText}
            route={btn.route}
            style={btn.style}
          />
        ))}
      </div>
    </div>
  );
}
