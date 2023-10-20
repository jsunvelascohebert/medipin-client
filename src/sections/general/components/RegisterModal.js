import React, { useContext, useState } from 'react';
import Modal from '../../utility/Modal';
import AuthContext from '../../../contexts/AuthContext';
import { authenticate, createAccount } from '../../../fetches/internal/AuthFetches';
import { BsAsterisk } from 'react-icons/bs';
import { BannerContext } from '../../../contexts/BannerContext';

export default function RegisterModal({ isOpen, setOpen, color }) {

  const { showBanner } = useContext(BannerContext);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [creds, setCredentials] = useState({
    username: '',
    password: ''
  });

  const auth = useContext(AuthContext);

  const toggleModal = () => {
    setOpen(!isOpen);
    setCredentials({ username: '', password: '' });
  }

  /* ***** ***** submit handler ***** ***** */

  const handleSubmit = (evt) => {
    evt.preventDefault();

    createAccount(creds)
      .then(() => {
        authenticate(creds)
          .then(data => {
            auth.onAuthenticated(data);
            toggleModal();
            setShowMessage(false);
            showBanner({
              message: `thanks for signing up, ${creds.username}!`,
              status: 'success'
            })
          }).catch(errs => {
            setMessage(errs[0]);
            setShowMessage(true);
          });
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
        htmlFor="register-form" type="submit"
        className={`btn-${color}`}
        onClick={handleSubmit}>
        sign up
      </button>
    </div>;

  /* ***** ***** return ***** ***** */

  return (
    <Modal color={color} isOpen={isOpen}
      setOpen={toggleModal}
      size='md'
      header='sign up'
      footer={footer}>
      {/* register form */}
      <form id="register-form" className="flex flex-col justify-center items-center gap-4">
        {/* message */}
        {showMessage &&
          <div className="text-center font-medium text-darkRed bg-red border-2 border-darkRed p-2 rounded-lg opacity-75">
            {message}
          </div>
        }
        {/* username input */}
        <div className="w-4/5 flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-2 sm:gap-4">
          <label htmlFor="register-username" className='text-sm font-bold opacity-50'>username:</label>
          <input type="text" id="register-username"
            className={`w-full text-input ring-${color}`}
            name='username' placeholder='enter username'
            onChange={(event) => creds.username = event.target.value} />
        </div>
        {/* password input */}
        <div className="w-4/5 flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-2 sm:gap-4">
          {/* password label */}
          <label htmlFor="register-password" className='text-sm font-bold opacity-50'>password:</label>
          {/* input box */}
            <input type="password" id="register-password"
              className={`w-full text-input ring-${color}`}
              placeholder='enter password' name='password'
              onChange={(event) => creds.password = event.target.value} />
        </div>

        {/* password hint */}
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 opacity-25">
          <BsAsterisk className='text-xs'/>
          <p className='text-sm font-light'>
          password must be at least 8 characters long and contain a digit, letter, and non-digit/non-letter
          </p>
        </div>  
      </form>
    </Modal>
  );

}