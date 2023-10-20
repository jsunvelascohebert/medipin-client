import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { RiUnpinLine } from 'react-icons/ri';
import { getArticleContentById } from '../../../fetches/ExternalAPI';
import { parseRelated, parseRelatedAndSections, parseSection } from '../../utility/ArticleParser';
import LoadingOverlay from '../../utility/LoadingOverlay';
import NotesContainer from '../components/NotesContainer';
import UnpinModal from '../components/UnpinModal';


export default function () {

  const { topicId, topicName, articleId, articleName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [articleContent, setArticleContent] = useState('');
  const [relatedArticles, setRelatedArticles] = useState('')
  const [hideNotes, setHideNotes] = useState(true);
  const [isUnpinModalOpen, setIsUnpinModalOpen] = useState(false);

  /* ***** ***** set up handlers ***** ***** */

  useEffect(() => {
    // pull in article info with loading screen
      // ^^^ done similarly to the search feature
    setIsLoading(true);
    getArticleContentById(articleId)
      .then(data => {
        const [related, sections] = parseRelatedAndSections(data);
        setArticleContent(sections.map(s => parseSection(s)));
        setRelatedArticles(related.map(r => parseRelated(r)));
        setIsLoading(false);
        setHideNotes(false);
        // once article pulled, get all notes from user
      }).catch(errs => {
        console.log(errs);
      })
  }, []);
  
  /* ***** ***** return ***** ***** */

  return (<>
    <section id="notes" className="w-full min-h-screen p-6 sm:p-12 bg-gradient-to-b from-lightPurple to-white">
      {/* general container */}
      <div className="w-full flex flex-col gap-8 mx-auto justify-center items-center">

        {/* banner container */}
        <div className="w-full flex flex-col gap-6 mx-auto justify-center items-center">
          {/* info bar */}
          <div className="w-full flex flex-row justify-between items-center">
            {/* back link */}
            <Link to={`/topics/${topicId}/${topicName}`}
              className='flex flex-row gap-2 justify-start items-center text-darkPurple group'>
              <FaArrowLeft className='text-sm md:text-lg group-hover:text-xl'/>
              back
            </Link>

            {/* topic badge */}
            <div className='bg-purple px-3 py-1 text-darkPurple border-2 border-darkPurple rounded-full'>{topicName}</div>

            {/* unpin button */}
            <button className='btn-purple p-3'
              onClick={() => setIsUnpinModalOpen(true)}>
              <RiUnpinLine className='scale-150 font-extrabold text-darkPurple' />
            </button>

          </div>
        </div>

        {/* main content container */}
        <div className="relative w-full flex flex-col md:flex-row justify-center items-start gap-10">
          {/* notes */}
          {!hideNotes && <NotesContainer />  }
        
          {/* articles container */}
          <div className="flex flex-col gap-10 justify-start items-start md:w-2/3 text-darkPurple">
            {/* header */}
            <h1 className='md:text-6xl text-left'>
              {articleName}
            </h1>
            {articleContent}
          </div>

        </div>
      </div>
    </section>

    {/* loading content */}
    {isLoading && <LoadingOverlay color='purple' />}

    {/* unpin article modal */}
    {isUnpinModalOpen && 
      <UnpinModal isOpen={isUnpinModalOpen}
      setOpen={(val) => setIsUnpinModalOpen(val)}
      color='purple' topic={{ topicId: topicId, topicName: topicName }} article={{ articleId: articleId, articleName: articleName }}
      />
    }

  </>);
}