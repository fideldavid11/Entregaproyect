import React from 'react';
import { GiLaptop } from 'react-icons/gi';

//componente de footer
const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-4 flex items-center justify-center">
      <GiLaptop className="mr-2 text-xl" />
      <span>FullStack by Fidel Peguero</span>
    </footer>
  );
};

export default Footer;

