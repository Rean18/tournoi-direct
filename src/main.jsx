// index.js ou main.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Layout } from './layout/Layout.jsx';
import { Home } from './pages/Home.jsx';
import { CompetitionType } from './pages/CompetitionType.jsx';
import { ChampionshipRules } from './pages/ChampionshipRules.jsx';

import { ChampionshipDashboard } from './pages/ChampionshipDashboard.jsx';
import './index.css';
import { ChampionshipDataChoice } from './pages/ChampionshipDataChoice.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/competition-type',
    element: <Layout />, // Ne passez pas de children ici
    children: [
      {
        index: true,
        element: <CompetitionType />,
      },
      {
        path: 'championship',
        element: <Outlet />, // Utiliser Outlet pour les sous-routes
        children: [
          {
            index: true,
            element: <ChampionshipDataChoice />,
          },

          {
            path: 'rules',
            element: <ChampionshipRules />,
          },
          {
            path: 'matches',
            element: <ChampionshipDashboard />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
