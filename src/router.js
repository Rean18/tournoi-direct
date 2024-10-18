import { createBrowserRouter } from 'react-router-dom';
import { CompetitionType } from './pages/CompetitionType';
import { Home } from './pages/Home';
import { Championship } from './pages/Championship';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'competition-type',
        element: <CompetitionType />,
        children: [
          {
            path: 'championship',
            element: <Championship />,
          },
        ],
      },
    ],
  },
]);

export default router;
