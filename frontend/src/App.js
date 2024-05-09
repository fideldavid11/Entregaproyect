import React from 'react';
import './App.css';
import Footer from './components/footer';
import Inicio from './screens/inicio';
import Nav from './components/nav'; 
import Crear from './screens/crear'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/crear" element={<Crear />} />
        </Routes>
        <Footer className="mt-8" />  
      </div>
    </Router>
  );
}

export default App;
