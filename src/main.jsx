import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inici from './pages/Inici';
import Perfil from './pages/Perfil';
import Cims from './pages/Cims';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cims" element={<Cims />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
