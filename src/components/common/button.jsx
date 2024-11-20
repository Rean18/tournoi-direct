import { useNavigate } from 'react-router-dom';
import '../../styles/button/button.css';

export function Button({ buttonText, route, style, type, onClick }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e); // Appeler la fonction onClick si elle est fournie
    if (route) navigate(`${route}`); // Naviguer vers la route si elle est fournie
  };

  return (
    <div className="button-container">
      <button className={style} type={type || 'button'} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}
