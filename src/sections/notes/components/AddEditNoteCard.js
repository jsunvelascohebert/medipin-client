import React, { useContext, useState } from 'react';
import { addNote, updateNote } from '../../../fetches/internal/NotesFetches';
import { BannerContext } from '../../../contexts/BannerContext';
import AuthContext from '../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { addUTAN } from '../../../fetches/internal/UserTopicArticleNoteFetches';

export default function AddEditNoteCard({ id = 0, placeholder = '', isUpdated }) {

  const { showBanner } = useContext(BannerContext);
  const [noteText, setNoteText] = useState(placeholder);
  const [isShown, setIsShown] = useState('flex');
  const dateTime = new Date();
  const auth = useContext(AuthContext);
  const { topicId, articleId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      noteId: id,
      text: noteText,
      datetimeMade: dateTime.toISOString()
    }

    if (id === 0) {
      // add note
      addNote(note)
        .then((data) => {
          const utan = {
            userId: auth.user.userId,
            topicId: parseInt(topicId),
            articleId: parseInt(articleId),
            noteId: data.noteId
          }
          addUTAN(utan)
            .then(() => {
              isUpdated(true);
              setIsShown('hidden');
              showBanner({
                message: 'successfully added note',
                status: 'success'
              })
            }).catch(() => {
              isUpdated(true);
              setIsShown('hidden');
              showBanner({
                message: 'successfully added note',
                status: 'success'
              })
            })
        }).catch(errs => {
          showBanner({
            message: 'failed to add note',
            status: 'error'
          })
        })
    } else {
      // update note
      updateNote(note)
        .then(() => {
          isUpdated(true);
          setIsShown('hidden');
          showBanner({
            message: 'successfully updated note',
            status: 'success'
          })
        }).catch(errs => {
          showBanner({
            message: 'failed to update note',
            status: 'error'
          })
        });
    }
  }

  return (
    <div className={`${isShown} flex-col w-full justify-center items-center bg-lightPurple p-4 gap-2 rounded-xl border-2 border-darkPurple shadow-sm shadow-darkPurple`} >

      {/* input field */}
      <form id='note-form' onSubmit={handleSubmit} className='w-full'>
        <input type="text" id="note-input" className=" w-full text-input border-darkPurple ring-purple"
          value={noteText} 
          onChange={(e) => setNoteText(e.target.value)} />
      </form>
      
      {/* submit footer */}
      <div className="flex flex-row w-full justify-between items-center">
        {/* date time */}
        <p className="font-light text-xs">
          {dateTime.toLocaleString()}
        </p>
        {/* submit button */}
        <button type="submit" htmlFor='note-form' className='btn-purple' onClick={handleSubmit}>save</button>
      </div>
    </div>
  );
}