import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import '../styles/Layout/Layout.css';

export function Layout() {
  return (
    <div>
      <Header />
      <main>
        <h1 id="app-title">Tournoi Direct 🏆</h1>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
