import React, { useContext, useState } from 'react';
import Modal from '../../utility/Modal';
import { FaArrowLeft } from 'react-icons/fa6';
import { deleteTopicArticle } from '../../../fetches/internal/TopicArticleFetches';
import { BannerContext } from '../../../contexts/BannerContext';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

export default function UnpinModal({ isOpen, setOpen, color, topic, article, updated }) {

  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const { showBanner } = useContext(BannerContext);
  const navigate = useNavigate();

  const showModal = (val) => {
    setIsModalOpen(val);
    setOpen(val);
  }

  /* ***** ***** unpin handlers ***** ***** */

  const handleUnpin = () => {
    const topicArticle = { topicId: topic.topicId, articleId: article.articleId };
    deleteTopicArticle(topicArticle)
      .then(() => {
        // open a modal
        navigate(`/topics/${topic.topicId}/${topic.topicName}`)
        showBanner({
          message: 'successfully unpinned article',
          status: 'success'
        });
        updated();
      }).catch(errs => {
        console.log(errs);
      })
  }

  /* ***** ***** footer ***** ***** */

  const footer = 
    <div className="flex flex-row w-full justify-between items-center">
      {/* cancel section */}
      <a href="#" className="flex flex-row justify-start items-center gap-2 group" onClick={() => showModal(false)}>
        <FaArrowLeft className='text-sm md:text-lg group-hover:text-xl' />
        cancel
      </a>
      {/* confirm button */}
      <button className={`btn-${color}`} onClick={handleUnpin}>
        unpin
      </button>
    </div>

  /* ***** ***** return ***** ***** */

  return (<>
    <Modal color={color} isOpen={isModalOpen}
      setOpen={showModal}
      size='md' header='unpin particle' footer={footer}>
      
      {/* modal content container */}
      <div className='flex flex-col gap-2 p-2 justify-center items-center'>
        {/* warning message */}
        <div className="flex flex-col text-center gap-2">
          <p>unpinning an article will permanently remove the article from the topic as well as any notes affiliated with it</p>
          <p className='font-extrabold'>are you sure you want to unpin the following?</p>
        </div>

        {/* divider */}
        <div className="w-full border my-4"></div>

        {/* article x topic info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 w-full">
          {/* article info */}
          <p className='text-center w-full md:w-1/2'>
            {article.articleName}</p>
          {/* x content */}
          <RxCross2 />
          {/* topic info */}
          <p className={`px-2 rounded-full border-2 bg-${color} border-dark${color}`}>{topic.topicName}</p>
        </div>
      </div>
    </Modal>
  </>);

}