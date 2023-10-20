import React, { useEffect, useState, useContext } from 'react';
import Modal from '../../utility/Modal';
import AuthContext from '../../../contexts/AuthContext';
import { authenticate } from '../../../fetches/internal/AuthFetches';
import { BannerContext } from '../../../contexts/BannerContext';

export default function LoginModal({ isOpen, setOpen, color }) {

  const [ringColor, setRingColor] = useState(`ring-${color}`);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const auth = useContext(AuthContext);
  const { showBanner } = useContext(BannerContext);

  const [creds, setCredentials] = useState({
    username: '',
    password: ''
  });

  const toggleModal = () => {
    setOpen(!isOpen);
    setCredentials({
      username: '',
      password: ''
    });
  }

  useEffect(() => {
    setRingColor(`ring-${color}`);
  }, [color]);

  /* ***** ***** submit handler ***** ***** */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    authenticate(creds)
      .then(data => {
        auth.onAuthenticated(data);
        toggleModal();
        showBanner({
          message: `hello, ${creds.username}!`,
          status: 'success'
        })
      }).catch(errs => {
        setMessage(errs[0]);
        setShowMessage(true);
      });
  }

  /* ***** ***** footer ***** ***** */

  const footer =
    <div className="w-full flex justify-center items-center">
      {/* submit button */}
      <button
        htmlFor="login-form" type="submit"
        className={`btn-${color}`}
        onClick={handleSubmit}>
        login
      </button>
    </div>;

  /* ***** ***** return ***** ***** */

  return (
    <Modal color={color} isOpen={isOpen}
      setOpen={toggleModal}
      size='md'
      header='login'
      footer={footer}>
      {/* login form */}
      <form id="login-form" className="flex flex-col justify-center items-center gap-4">
        {/* error message for bad credentials */}
        {showMessage &&
          <div className='text-center font-medium text-darkRed bg-red border-2 border-darkRed p-2 rounded-lg opacity-75'>
          {message}
          </div>
        }
        {/* username input */}
        <div className="w-4/5 flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-2 sm:gap-4">
          <label htmlFor="login-username" className='text-sm font-bold opacity-50'>username:</label>
          <input type="text" id="login-username"
            className={`w-full text-input ${ringColor}`} 
            placeholder='enter username'
            onChange={(evt) => creds.username = evt.target.value}
            required />
        </div>
        {/* password input */}
        <div className="w-4/5 flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-2 sm:gap-4">
          <label htmlFor="login-password" className='text-sm font-bold opacity-50'>password:</label>
          <input type="password" id="login-password"
            className={`w-full text-input ${ringColor}`} 
            placeholder='enter password'
            onChange={(evt) => creds.password = evt.target.value}
            required />
        </div>
      </form>
    </Modal>
  );
}