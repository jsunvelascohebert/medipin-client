import React, { useEffect, useState } from 'react';
import Modal from '../../utility/Modal';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { getTopicById } from '../../../fetches/internal/TopicFetches';
import { useNavigate } from 'react-router-dom';

export default function ArticlePinModal({ isOpen, setOpen, article, topicId }) {

  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [topicName, setTopicName] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
    setOpen(false);
  }

  // pull topic info to populate
  useEffect(() => {
    getTopicById(topicId)
      .then(data => {
        setTopicName(data.name)
      }).catch(errs => {
        console.log(errs);
      })
  }, []);

  /* ***** ***** footer ***** ***** */

  const footer = 
    <div className='flex flex-row w-full justify-between items-center'>
      {/* back section */}
      <a className='flex flex-row gap-2 items-center justify-start group'
        onClick={handleClose}>
        <FaArrowLeft className='text-sm md:text-lg group-hover:text-xl' />
        go back
      </a>
      {/* go to pinned article button */}
      <button className="btn-green"
        onClick={() => navigate(`/notes/${topicId}/${topicName}/${article.Id}/${article.Title}`)}>
        go to pin
      </button>
    </div>

  /* ***** ***** return ***** ***** */

  return (<>
    <Modal color='green' isOpen={isModalOpen}
      setOpen={(val) => setIsModalOpen(val)}
      size='md'
      header='successful pin'
      footer={footer}>
      {/* ***** content container ***** */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start gap-4 sm:gap-10">
        {/* article information */}
        <div className="flex flex-col gap-2 justify-center sm:justify-end items-center sm:items-end w-full">
          <h4>article</h4>
          <p className='text-center sm:text-right'>{article.Title}</p>
        </div>
        {/* arrow */}
        < FaArrowRight className='text-xl sm:text-5xl rotate-90 sm:rotate-0'/>
        {/* topic information */}
        <div className="flex flex-col gap-2 justify-center sm:justify-start items-center sm:items-start w-full">
          <h4>topic</h4>
          <p className='px-2 bg-green border-2 border-darkGreen rounded-full'>{topicName}</p>
        </div>
      </div>
    </Modal>
  </>);
}