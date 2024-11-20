// BlueCard.jsx
import { Button } from './button';
import '../../styles/blueCard/blueCard.css';

export function BlueCard({ children, cardTitle, buttons }) {
  return (
    <div className="blue-card">
      <h3>{cardTitle}</h3>
      {children}

      <div className="button-group">
        {buttons.map((btn, index) => {
          return (
            <Button
              key={index}
              buttonText={btn.buttonText}
              route={btn.route}
              style={btn.style}
              type={btn.type || 'button'}
              onClick={btn.onClick} // Passez directement btn.onClick
            />
          );
        })}
      </div>
    </div>
  );
}
