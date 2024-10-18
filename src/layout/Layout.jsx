import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
