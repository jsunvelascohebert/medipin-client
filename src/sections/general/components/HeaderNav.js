import React, { useContext, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import AuthContext from '../../../contexts/AuthContext';

export default function HeaderNav() {

  /* ***** ***** color styling ***** ***** */

  const location = useLocation();

  const [generalColor, setGeneralColor] = useState('');
  const [containerColor, setContainerColor] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [menuItemColor, setMenuItemColor] = useState('');
  const [bgGradient, setBgGradient] = useState('');

  useEffect(() => {
    const splitPath = location.pathname.split('/');

    // checks pathname and sets color of components
    switch (splitPath[1]) {
      case '':
        setGeneralColor('blue');
        setContainerColor('bg-blue border-darkBlue');
        setFontColor('text-darkBlue');
        setButtonColor('btn-blue');
        setMenuItemColor('menu-item-blue');
        setBgGradient('from-lightBlue');
        break;
      case 'about':
        setGeneralColor('red');
        setContainerColor('bg-red border-darkRed');
        setFontColor('text-darkRed');
        setButtonColor('btn-red');
        setMenuItemColor('menu-item-red');
        setBgGradient('from-lightRed');
        break;
      case 'search':
        setGeneralColor('green');
        setContainerColor('bg-green border-darkGreen');
        setFontColor('text-darkGreen');
        setButtonColor('btn-green');
        setMenuItemColor('menu-item-green');
        setBgGradient('from-lightGreen');
        break;
      case 'topics':
        setGeneralColor('orange');
        setContainerColor('bg-orange border-darkOrange');
        setFontColor('text-darkOrange');
        setButtonColor('btn-orange');
        setMenuItemColor('menu-item-orange');
        setBgGradient('from-lightOrange');
        break;
      case 'notes':
        setGeneralColor('purple');
        setContainerColor('bg-purple border-darkPurple');
        setFontColor('text-darkPurple');
        setButtonColor('btn-purple');
        setMenuItemColor('menu-item-purple');
        setBgGradient('from-lightPurple');
        break;
      default:
        break;
    }
  }, [location.pathname]);

  /* ***** ***** mobile menu handlers ***** ***** */

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const expandMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  /* ***** ***** login/register handlers ***** ***** */

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const auth = useContext(AuthContext);

  /* ***** ***** return ***** ***** */

  return (<>
    <section id="header" className='z-10'>
      {/* desktop menu */}
      <div className={`hidden sm:flex flex-row w-100 p-4 px-6 justify-between items-center gap-4 border-2 ${containerColor}`}>
        {/* TODO -- logo */}
        <div>
          <Link to="/">
            <h3 className={`text-xl ${fontColor}`}>medipin</h3>
          </Link>
        </div>
        {/* menu items */}
        <div className="flex flex-row justify-center items-center gap-4 md:gap-8">
          <Link to="/about" className={menuItemColor}>about</Link>
          <Link to="/search" className={menuItemColor}>search</Link>
          {auth.isLoggedIn() &&
            <Link to="/topics" className={menuItemColor}>pins</Link>
          }
        </div>
        {/* authentication */}
        {auth.isLoggedIn()
          ? // if logged in
          <div className='flex flex-row justify-center items-center gap-4'>
            <p className='opacity-25'>{auth.user.username}</p>
            <button className={buttonColor} onClick={() => auth.signOut()}>
              logout
            </button>
          </div>
          : // if logged out
          <div className="flex flex-row justify-center items-center gap-4 md:gap-8">
            <div className={`menu-item ${menuItemColor}`}
              onClick={() => setIsLoginModalOpen(true)}>login</div>
            <button className={buttonColor}
              onClick={() => setIsRegisterModalOpen(true)}>sign up</button>
          </div>
        }
      </div>

      {/* mobile menu collapsed */}
      <div id="" className={`flex sm:hidden flex-row w-100 p-2 justify-between items-center border-2 ${containerColor}`}>
        {/* TODO -- logo */}
        <Link to="/">
          <h3 className={`text-lg ${fontColor}`}>medipin</h3>
        </Link>
        {/* hamburger */}
        <FaBars
          id="hamburgerIcon"
          className={`text-xl hover:cursor-pointer ${fontColor}`}
          onClick={expandMobileMenu}
        />
      </div>

      {/* todo -- mobile menu expanded */}
      {isMobileMenuOpen && (
        <div
          id="mobileMenuModal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-full overflow-x-hidden overflow-y-hidden sm:hidden">
          
          {/* header */}
          <div className={`relative w-full flex flex-row p-2 justify-between items-center border-2 ${containerColor}`}>
            {/* TODO -- logo */}
            <Link to="/">
              <h3 className={`text-lg ${fontColor}`}>medipin</h3>
            </Link>          
            {/* hamburger */}
            <CgClose
              id="closeIcon"
              className={`text-xl hover:cursor-pointer ${fontColor}`}
              onClick={expandMobileMenu}
            />
          </div>

          {/* menu container */}
          <div className={`flex flex-col gap-8 w-full h-screen 
          justify-center items-center bg-gradient-to-b ${bgGradient} to-white`}>
            {/* pages container */}
            <div className="flex flex-col gap-4 justify-center items-center">
              <Link to="/about" className={menuItemColor}
                onClick={expandMobileMenu}>about</Link>
              <Link to="/search" className={menuItemColor}
                onClick={expandMobileMenu}>search</Link>
              <Link to="/topics" className={menuItemColor}
                onClick={expandMobileMenu}>pins</Link>
            </div>
            {/* divider */}
            <div className={`border w-1/2 ${containerColor}`}></div>
            {/* authentication container */}
            <div className="flex flex-col gap-4 justify-center items-center mt-4">
              <div className={`menu-item ${menuItemColor}`}
                onClick={() => setIsLoginModalOpen(true)}>
                login
              </div>
              <button className={buttonColor}
                onClick={() => setIsRegisterModalOpen(true)}>
                sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </section>

    {/* login modal */}
    {isLoginModalOpen &&
      <LoginModal isOpen={true} color={generalColor}
        setOpen={(val) => setIsLoginModalOpen(val)} />    
    }

    {/* register modal */}
    {isRegisterModalOpen &&
      <RegisterModal isOpen={true} color={generalColor}
        setOpen={(val) => setIsRegisterModalOpen(val)} />
    }
  </>);

}