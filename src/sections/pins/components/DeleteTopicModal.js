import React, { useContext, useState } from 'react';
import Modal from '../../utility/Modal';
import { FaArrowLeft } from 'react-icons/fa6';
import { deleteTopic, hardDeleteTopicById } from '../../../fetches/internal/TopicFetches';
import { BannerContext } from '../../../contexts/BannerContext';
import { deleteUserTopicByKey } from '../../../fetches/internal/UserTopicFetches';
import AuthContext from '../../../contexts/AuthContext';
import { deleteTopicArticleByTopicId } from '../../../fetches/internal/TopicArticleFetches';

export default function DeleteTopicModal({ isOpen, setOpen, topic, isUpdated }) {

  const { showBanner } = useContext(BannerContext);
  const auth = useContext(AuthContext);

  /* ***** ***** modal handlers ***** ***** */

  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const showModal = (val) => {
    setIsModalOpen(val);
    setOpen(val);
  }

  /* ***** ***** delete handlers ***** ***** */

  const handleDeleteTopic = () => {
    // hard delete topic
    hardDeleteTopicById(topic.topicId)
      .then(() => {
        showBanner({
          message: `successfully deleted topic '${topic.name}'`,
          status: 'success'
        })
        isUpdated();
      }).catch(errs => {
        showBanner({
          message: 'failed to delete topic',
          status: 'error'
        })
        isUpdated()
      })

    // deleteTopic(topic.topicId)
    // .then(() => {
    //   showBanner({
    //     message: `successfully deleted topic '${topic.name}'`,
    //     status: 'success'
    //   });
    //   isUpdated();
    // }).catch(() => {
    //   showBanner({
    //     message: 'could not delete',
    //     status: 'error'
    //   });
    //   isUpdated();
    // });
  }

  const handleDelete = () => {
    showModal(false);

    // delete user topic bridge
    deleteUserTopicByKey(auth.user.userId, topic.topicId)
      .then(() => {
        // delete topic article bridge
        deleteTopicArticleByTopicId(topic.topicId)
          .then(() => {
            handleDeleteTopic();
          }).catch(() => {
            handleDeleteTopic();
          })
      }).catch(errs => {
        console.log(errs);
        isUpdated();
      });    
  }

  /* ***** ***** footer components ***** ***** */

  const footer = 
    <div className="w-full flex flex-row justify-between items-center">
      {/* back statement */}
      <a href="#" className="flex flex-row justify-start gap-2 
      items-center group text-darkOrange"
        onClick={() => showModal(false)}>
        <FaArrowLeft className='text-sm md:text-lg group-hover:text-xl' />
        cancel
      </a>
      {/* confirm button */}
      <button className="btn-orange" onClick={handleDelete}>
        confirm
      </button>
    </div>

  /* ***** ***** return ***** ***** */

  return (<>
    <Modal color='orange' isOpen={isModalOpen}
      setOpen={showModal}
      size='sm'
      header='delete topic'
      footer={footer}>
      
      {/* content */}
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className='text-center underline'>
          are you sure you want to delete this topic?
        </p>
        <p className='bg-orange border-2 border-darkOrange rounded-full px-3 py-1 text-center'>
          {topic.name}
        </p>
        <p className='font-light text-center opacity-50'>
        deleting a topic will permanently remove all articles and notes attached to it
        </p>
      </div>
    </Modal>
  </>);
}