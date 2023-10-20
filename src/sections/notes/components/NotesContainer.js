import React, { useContext, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { BiExpandVertical, BiCollapseVertical } from 'react-icons/bi';
import NotesCard from './NotesCard';
import AddEditNoteCard from './AddEditNoteCard';
import { getAllNotes, getNoteById } from '../../../fetches/internal/NotesFetches';
import { getUTANsByKey } from '../../../fetches/internal/UserTopicArticleNoteFetches';
import AuthContext from '../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

export default function NotesContainer() {

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [updated, setIsUpdated] = useState(false);
  const auth = useContext(AuthContext);
  const { topicId, articleId } = useParams();

  useEffect(() => {
    setNotes([]);
    // get notes by utan
    getUTANsByKey(auth.user.userId, parseInt(topicId), parseInt(articleId))
      .then(data => {
        for (let n of data) {
          getNoteById(n.noteId)
            .then(data => {
              const note = { noteId: data.noteId, text: data.text, datetimeMade: data.datetimeMade }
              setNotes(prev => [...prev, note])
            }).catch(errs => {
              console.log(errs);
            })
        }
      }).catch(errs => {
        console.log(errs);
      })
  }, [updated]);

  const updateAndToggleVisibility = () => {
    setIsAddNoteOpen(!isAddNoteOpen);
    setIsUpdated(!updated);
  }

  /* ***** ***** return ***** ***** */

  return (<>
    {/* mobile */}
    <div className="sticky top-10 flex w-full md:hidden flex-col gap-2 shadow-md bg-purple border-2 border-darkPurple shadow-darkPurple rounded-xl p-3 max-h-[50vh]">

      {/* header and add container */}
      <div className="relative flex flex-row justify-between items-center hover:cursor-pointer px-1"
        onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {/* notes and add */}
        <div className='flex flex-row gap-3 justify-start items-center'>
          <h4 className="text-darkPurple">notes</h4>
          {/* add button */}
          {isMobileOpen &&
            <button className='btn-purple rounded-full p-1'
              onClick={(e) => {
                e.stopPropagation()
                updateAndToggleVisibility(true)
              }}>
              <IoMdAdd className='scale-150 text-darkPurple'/>
            </button>
          }
        </div>
        
        {/* expand button */}
        {!isMobileOpen &&
          <BiExpandVertical
            className='text-center text-darkPurple text-lg' />
        }
        {/* collapse button */}
        {isMobileOpen &&
          <BiCollapseVertical
            className='text-center text-darkPurple text-lg' />
        }
      </div>

      {/* notes content (mobile expanded) */}
      {isMobileOpen &&
        <div className="flex flex-col gap-2 justify-start items-start overflow-y-scroll scrollbar-none p-1">
          {isAddNoteOpen && <AddEditNoteCard
            isUpdated={updateAndToggleVisibility} />}
          {notes && notes
            .sort((a, b) => a.datetimeMade.localeCompare(b.datetimeMade))
            .reverse()
            .map(n => <NotesCard key={n.noteId} note={n}
              isUpdated={() => setIsUpdated(!updated)} />)}
        </div>
      }
    </div>

    {/* desktop */}
    <div className="hidden sticky top-10 md:w-1/3 md:flex flex-col gap-4 bg-purple border-2 border-darkPurple shadow-md shadow-darkPurple rounded-2xl p-4">
      {/* header and add container */}
      <div className="flex justify-between items-center p-1">
        <h4 className='text-darkPurple'>notes</h4>
        <button className='btn-purple rounded-full p-2'
          onClick={(e) => {
            e.stopPropagation()
            updateAndToggleVisibility(true)
          }}>
          <IoMdAdd className='scale-150'/>
        </button>
      </div>
      {/* notes container */}
      <div className="flex flex-col gap-2 justify-start items-start overflow-scroll max-h-[50vh] scrollbar-none p-1">
        {isAddNoteOpen && <AddEditNoteCard
          isUpdated={updateAndToggleVisibility} />}
        {notes && notes
          .sort((a, b) => a.datetimeMade.localeCompare(b.datetimeMade))
          .reverse()
          .map(n => <NotesCard key={n.noteId} note={n}
            isUpdated={() => setIsUpdated(!updated)} />)}
      </div>
    </div>  
  </>);
}