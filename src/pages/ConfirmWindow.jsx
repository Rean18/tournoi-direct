import { ConfirmCard } from '../components/common/confirmCard';
import '../styles/ConfirmWindow/ConfirmWindow.css';

export function ConfirmWindow({
  message,
  onConfirm,
  onCancel,
  title,
  className,
  confirmRoute,
  cancelRoute,
}) {
  const buttonsConfig = [
    {
      buttonText: 'Oui',
      route: confirmRoute,
      style: 'light',
      onClick: onConfirm,
    },
    {
      buttonText: 'Non',
      route: cancelRoute,
      style: 'light',
      onClick: onCancel,
    },
  ];

  return (
    <div className={`modal-overlay ${className}`}>
      <div className="modal-content">
        <ConfirmCard cardTitle={title} buttons={buttonsConfig}>
          <p>{message}</p>
        </ConfirmCard>
      </div>
    </div>
  );
}
