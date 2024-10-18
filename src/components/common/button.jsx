// import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
import '../../styles/button/button.css';

export function Button({ buttonText, route, style }) {
  //   const navigate = useNavigate();
  //   const handleclick = () => {
  //     navigate(route);
  //   };

  return (
    <div className="button-container">
      <Link to={route}>
        <button className={style}>{buttonText}</button>
      </Link>
    </div>
  );
}
