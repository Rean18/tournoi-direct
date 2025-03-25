import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import '../styles/Layout/Layout.css';

export function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
