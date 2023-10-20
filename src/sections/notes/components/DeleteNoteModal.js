import React, { useContext, useState } from 'react';
import Modal from '../../utility/Modal';
import { FaArrowLeft } from 'react-icons/fa';
import { deleteNote } from '../../../fetches/internal/NotesFetches';
import { BannerContext } from '../../../contexts/BannerContext';
import { useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import { deleteUtan } from '../../../fetches/internal/UserTopicArticleNoteFetches';

export default function DeleteNoteModal({ isOpen, setOpen, note, isUpdated }) {
  
  const { showBanner } = useContext(BannerContext);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const { topicId, articleId } = useParams();
  const auth = useContext(AuthContext);

  const changeModal = (val) => {
    setIsModalOpen(val);
    setOpen(val);
  }

  const handleDeleteNote = () => {
    const utan = {
      userId: auth.user.userId,
      topicId: parseInt(topicId),
      articleId: parseInt(articleId),
      noteId: note.noteId
    }
    // delete utan
    deleteUtan(utan)
      .then(() => {
        // delete note
        deleteNote(note.noteId)
        .then(() => {
          showBanner({
            message: 'successfully deleted note',
            status: 'success'
          })
          isUpdated();
        }).catch(errs => {
          showBanner({
            message: 'failed to delete note',
            status: 'error'
          })
          isUpdated();
        })
      }).catch(errs => {
        showBanner({
          message: 'failed to delete note',
          status: 'error'
        })
      })
  }

  const handleDelete = () => {
    handleDeleteNote();
  }


  const footer =
    <div className='w-full flex flex-row justify-between items-center'>
      {/* back section */}
      <a href="#" className="flex flex-row justify-start items-center gap-2 group" onClick={() => changeModal(false)}>
        <FaArrowLeft className='text-sm md:text-lg group-hover:text-xl' />
        cancel
      </a>

      {/* confirm button */}
      <button className="btn-purple" onClick={handleDelete}>
        confirm
      </button>
    </div>

  return (<>
    <Modal color='purple' isOpen={isModalOpen} setOpen={changeModal} size='sm' header='delete note' footer={footer}>
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className='text-center underline'>are you sure you want to delete this note?</p>
        <p className='text-center border-2 border-darkPurple bg-purple rounded-lg p-2 shadow-sm shadow-darkPurple'>{note.text}</p>
        <p className="font-light text-center opacity-50">
        deleting a note is a permanent action
        </p>
      </div>
    </Modal>
  </>);
}