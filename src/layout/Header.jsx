import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header/Header.css';
export function Header() {
  const navigate = useNavigate();
  const handleback = () => {
    navigate(-1);
  };
  return (
    <header>
      <Link to="/">
        <img
          id="logo-pages"
          src="/logo_td_sombre.png"
          alt="Logo de Tournoi Direct : un trophée avec les lettres T et D au centre"
        />
      </Link>
      <button className="return " onClick={handleback}>
        <img id="return" src="/return.png" alt="icone de retour" />
      </button>
    </header>
  );
}
