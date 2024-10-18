import { Button } from '../components/common/button';
import { Footer } from '../layout/Footer.jsx';
import '../styles/Home/Home.css';

export function Home() {
  return (
    <>
      <main className="main-home">
        <img
          id="home-logo"
          src="/logo_td_sombre.png"
          alt="Logo de Tournoi Direct : un trophée avec les lettres T et D au centre"
        />
        <h1>Tournoi direct</h1>
        <h2>Organisez vos tournois simplement</h2>
        <Button
          route="/competition-type"
          buttonText="Commencez  🔥"
          style="dark"
        />
      </main>
      <Footer />
    </>
  );
}
