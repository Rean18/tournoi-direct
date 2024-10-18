// index.js ou main.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout.jsx';
import { Home } from './pages/Home.jsx';
import { CompetitionType } from './pages/CompetitionType.jsx';
import { Championship } from './pages/Championship.jsx';
import { Matches } from './pages/Matches.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/competition-type',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CompetitionType />,
      },
      {
        path: 'championship',
        element: <Championship />,
        children: [
          {
            path: 'matches',
            element: <Matches />,
          },
        ],
      },
      // Ajoutez d'autres sous-routes si nécessaire
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
