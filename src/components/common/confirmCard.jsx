// BlueCard.jsx
import { Button } from './button';
import '../../styles/confirmCard/confirmCard.css';

export function ConfirmCard({ children, cardTitle, buttons }) {
  return (
    <div className="confirm-card">
      <h3>{cardTitle}</h3>
      {children}

      <div className="confirm-button-container">
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
