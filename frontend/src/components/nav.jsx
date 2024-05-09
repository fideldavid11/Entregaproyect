import React from 'react';
import { Link } from 'react-router-dom'; 

//componente del navegador 
const Nav = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
     
      <div className="flex items-center">
      
        <Link to="/inicio" className="text-lg font-bold">
          App de listas
        </Link>
      </div>
    
      <div>
        <Link to="/crear" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar lista
        </Link>
      </div>
    </nav>
  );
}

export default Nav;

