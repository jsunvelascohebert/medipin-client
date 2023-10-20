import React, { useState } from 'react';
import { RiUnpinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import UnpinModal from '../../notes/components/UnpinModal';

export default function PinnedArticleCard({ topic, article, updated }) {

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }

  return (<>
    <div id={article.articleId} className="relative card bg-orange border-darkOrange shadow-darkOrange hover:shadow-darkOrange"
      onClick={() =>
        navigate(`/notes/${topic.id}/${topic.name}/${article.articleId}/${article.title}`)}>
      {/* unpin button */}
      <button className="absolute top-2 right-2 btn-orange p-3"
        onClick={openModal}>
        <RiUnpinLine className='scale-150 font-extrabold text-darkOrange'/>
      </button>
      {/* article content */}
      <img src={article.imageUrl} alt={article.imageAlt} className="rounded-lg border-2 border-darkOrange h-full object-cover" />
      <h3 className='text-darkOrange text-lg sm:text-xl md:text-2xl'>
        {article.title}
      </h3>
    </div>

    {/* unpin article modal */}
    {isModalOpen &&
      <UnpinModal isOpen={isModalOpen}
        setOpen={(val) => setIsModalOpen(val)}
      color='orange' topic={{ topicId: topic.id, topicName: topic.name }} article={{ articleId: article.articleId, articleName: article.title }}
      updated={() => updated()}
      />
    }
  </>);
}