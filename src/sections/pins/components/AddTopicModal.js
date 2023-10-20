import React, { useContext, useState } from 'react';
import Modal from '../../utility/Modal';
import { FaArrowLeft } from 'react-icons/fa6';
import { addTopic } from '../../../fetches/internal/TopicFetches';
import { addUserTopic } from '../../../fetches/internal/UserTopicFetches';
import AuthContext from '../../../contexts/AuthContext';


export default function AddTopicModal({ isOpen, setOpen, isUpdated }) {

  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [newTopic, setNewTopic] = useState('');
  const auth = useContext(AuthContext);

  const handleAddClick = (val) => {
    setIsModalOpen(val);
    setOpen(val);
    setNewTopic('');
  }

  /* ***** ***** add form functionality ***** ***** */

  const handleSubmit = (event) => {
    event.preventDefault(); 
    // add topic to database
    addTopic({ topicId: 0, name: newTopic })
      .then(data => {
        // create user_topic bridge
        addUserTopic(auth.user.userId, data.topicId)
          .then(data => {
            console.log(data);
            isUpdated();

          }).catch(errs => {
            console.log(errs);
            isUpdated();

          });
      }).catch(errs => {
        console.log(errs);
        isUpdated();

      });

    handleAddClick(false);
  }

  /* ***** ***** footer ***** ***** */

  const footer =
    <div className='w-full flex flex-row justify-between items-center'>
      {/* cancel */}
      <a className='flex flex-row gap-2 items-center group text-darkOrange' onClick={() => handleAddClick(false)}>
        <FaArrowLeft className='text-sm md:text-lg group-hover:text-xl' />
        cancel
      </a>
      {/* confirm */}
      <button htmlFor="add-topic-form" type="submit" className='btn-orange' onClick={handleSubmit}>
        confirm
      </button>
    </div>

  /* ***** ***** return ***** ***** */

  return (
    <Modal color='orange' isOpen={isModalOpen}
      setOpen={handleAddClick}
      size='sm'
      header='add topic'
      footer={footer}>
      {/* form */}
      <form id="add-topic-form" className='flex flex-col md:flex-row justify-center items-center gap-4' onSubmit={handleSubmit}>
        {/* label */}
        <label htmlFor="add-topic-input" className='text-sm font-bold opacity-50'>add topic:</label>
        {/* input */}
        <input id="add-topic-input" type="text" className="w-4/5 text-input border-darkOrange text-darkOrange ring-orange" placeholder='enter new topic'
          onChange={(event) => setNewTopic(event.target.value)} />
      </form>
    </Modal>
  );
}