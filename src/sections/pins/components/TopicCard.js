import React, { useContext, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import DeleteTopicModal from './DeleteTopicModal';
import { useNavigate } from 'react-router-dom';
import AddEditNoteCard from '../../notes/components/AddEditNoteCard';
import { BsCheckLg } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { updateTopic } from '../../../fetches/internal/TopicFetches';
import { BannerContext } from '../../../contexts/BannerContext';

export default function TopicCad({ topic, isUpdated }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicValue, setTopicValue] = useState(topic.name);
  const navigate = useNavigate();
  const { showBanner } = useContext(BannerContext);
    
  /* ***** ***** update handlers ***** ***** */

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    topic.name = topicValue;
    updateTopic(topic)
      .then(() => {
        setIsEditOpen(false);
        showBanner({
          message: `successfully updated topic to: ${topic.name}`,
          status: 'success'
        })
      }).catch((errs) => {
        showBanner({
          message: errs[0],
          status: 'error'
        })
      })
  };


  /* ***** ***** return ***** ***** */

  return (<>
    {/* main container */}
      <div id={topic.topicId} className="card w-full bg-orange border-darkOrange shadow-darkOrange hover:shadow-darkOrange"
      onClick={() => navigate(`/topics/${topic.topicId}/${topic.name}`)}>

      {/* top content container */}
      {isEditOpen
        ?
        <form id="edit-topic-input"
          className='flex flex-row gap-2 justify-center items-center h-full w-full'
          onSubmit={handleSubmit}>
          {/* input field */}
          <input type="text" name="topic-edit" id="topic-edit" className='text-input ring-orange' autoFocus
            onChange={(e) => setTopicValue(e.target.value)} value={topicValue} onClick={(e) => e.stopPropagation()} />
          {/* save button */}
          <button className='btn-orange p-1' type='submit' htmlFor='edit-topic-input' onClick={(e) => e.stopPropagation()}>
            <BsCheckLg />
          </button>
          {/* cancel button */}
          <button className="btn-orange p-1"
            onClick={(e) => {
              e.stopPropagation();
              setTopicValue(topic.name);
              setIsEditOpen(false);
          }}>
            <IoClose />
          </button>
          
        </form>
        :
        <div className='w-full flex flex-row justify-between items-center'>
        {/* topic name and edit container */}
          <h5 className='text-left text-darkOrange text-base md:text-lg break-all mr-4'>{topic.name}</h5>
          
          {/* edit/delete container */}
          <div className="flex flex-row justify-center items-center gap-1">
            <button className='btn-orange'
              onClick={(e) => {
                e.stopPropagation();
                setIsEditOpen(true);
              }}>
              <AiOutlineEdit className='text-darkOrange sm:text-lg'/>
            </button>
            <button className='btn-orange'
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(true)
              }
              }>
              <AiOutlineDelete className='text-darkOrange sm:text-lg' />
            </button>
          </div>
        </div>
      }

      {/* TODO: bottom image gallery */}
      </div>
    
    {/* delete confirmation modal */}
    { isModalOpen &&
      <DeleteTopicModal isOpen={isModalOpen}
        setOpen={(val) => setIsModalOpen(val)}
        topic={topic} isUpdated={() => isUpdated()} />
    }

  </>);
}