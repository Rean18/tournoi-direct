import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout.jsx';
import { Home } from './pages/Home.jsx';
import { CompetitionType } from './pages/CompetitionType.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/competition-type' element={ <Layout> <CompetitionType /> </Layout> } />
      </Routes>
    </Router>
  </StrictMode>,
)
