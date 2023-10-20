import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import DeleteNoteModal from './DeleteNoteModal';
import AddEditNoteCard from './AddEditNoteCard';

export default function NotesCard({ note, isUpdated }) {

  const noteParsed = new Date(note.datetimeMade);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  return (<>
    {!updated ?
          <div key={note.noteId} className="flex flex-col w-full bg-lightPurple p-4 gap-2 rounded-xl border-2 border-darkPurple shadow-sm shadow-darkPurple">
          {/* note body */}
          <p>{note.text}</p>
          {/* note footer */}
          <div className="flex flex-row justify-between items-center">
            {/* date showcase */}
            <p className='font-light text-xs'>
              {noteParsed.toLocaleString()}
            </p>
            {/* edit and delete */}
            <div className="flex flex-row justify-end items-center gap-2">
              <AiOutlineEdit
              className='text-lg text-darkPurple hover:text-xl hover:cursor-pointer'
              onClick={(e) => { e.stopPropagation(); setUpdated(true)}} />
              <AiOutlineDelete
                className='text-lg text-darkPurple hover:text-xl hover:cursor-pointer' onClick={() => setIsModalOpen(true)} />
            </div>
          </div>
      </div>
      : <AddEditNoteCard id={note.noteId} placeholder={note.text} isUpdated={() => isUpdated()} />

    }


    {/* delete note confirmation modal */}
    { isModalOpen &&
      <DeleteNoteModal isOpen={isModalOpen} setOpen={(val) => setIsModalOpen(val)} note={note} isUpdated={() => isUpdated()} />
    }
  </>);
}