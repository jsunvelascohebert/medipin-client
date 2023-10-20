import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {

  const location = useLocation();

  const [containerColor, setContainerColor] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [menuItemColor, setMenuItemColor] = useState('');

  // checks pathname and sets color of components
  useEffect(() => {

    const splitPath = location.pathname.split('/');

    switch (splitPath[1]) {
      case '':
        setContainerColor('bg-blue border-darkBlue');
        setFontColor('text-darkBlue');
        setMenuItemColor('menu-item-blue');
        break;
      case 'about':
        setContainerColor('bg-red border-darkRed');
        setFontColor('text-darkRed');
        setMenuItemColor('menu-item-red');
        break;
      case 'search':
        setContainerColor('bg-green border-darkGreen');
        setFontColor('text-darkGreen');
        setMenuItemColor('menu-item-green');
        break;
      case 'topics':
        setContainerColor('bg-orange border-darkOrange');
        setFontColor('text-darkOrange');
        setMenuItemColor('menu-item-orange');
        break;
      case 'notes':
        setContainerColor('bg-purple border-darkPurple');
        setFontColor('text-darkPurple');
        setMenuItemColor('menu-item-purple');
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <section id="footer" className='z-10'>
      {/* container */}
      <div className={`flex flex-col md:flex-row justify-between items-center p-12 border-2 gap-8 ${containerColor}`}>
        {/* header */}
        <Link to="/">
          <h3 className={fontColor}>medipin</h3>
        </Link>
        {/* menu items */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
          <Link to="/about" className={menuItemColor}>about</Link>
          <Link to="/search" className={menuItemColor}>search</Link>
          <Link to='/pins' className={menuItemColor}>pins</Link>
          <Link to='' className={menuItemColor}>documentation</Link>
        </div>
      </div>
    </section>
  );
}