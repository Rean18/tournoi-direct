import { Link } from 'react-router-dom';
import '../styles/Header/Header.css';
export function Header() {
    
    return(
        <header>
            <Link to="/"> <img id='logo-pages' src="/logo_td_sombre.png" alt="Logo de Tournoi Direct : un trophée avec les lettres T et D au centre" /></Link>
            <Link to=".."><img id ='return'src="/return.png" alt="icone de retour" /></Link>
        </header>
    )
}