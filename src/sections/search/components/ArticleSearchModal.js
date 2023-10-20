import React, { useContext, useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import Modal from '../../utility/Modal';
import AuthContext from '../../../contexts/AuthContext';
import { getTopicsByUserId } from '../../../fetches/internal/UserTopicFetches';
import { getTopicById } from '../../../fetches/internal/TopicFetches';
import { addArticle, getArticleById } from '../../../fetches/internal/ArticleFetches';
import { addTopicArticle } from '../../../fetches/internal/TopicArticleFetches';
import ArticlePinModal from './ArticlePinModal';
import { BannerContext } from '../../../contexts/BannerContext';

export default function ArticleSearchModal({ isOpen, setOpen, article, articleContent, relatedArticles }) {

  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const auth = useContext(AuthContext);
  const { showBanner } = useContext(BannerContext);

  const handleClose = () => {
    setIsModalOpen(false);
    setOpen(false);
  }

  const addTA = (topicArticle) => {
    addTopicArticle(topicArticle)
      .then(() => {      
        setIsPinModalOpen(true);
      }).catch(errs => {
        console.log(errs)
        showBanner({
          message: 'could not add',
          status: 'error'
        });
      })
  }

  const handlePin = () => {
    // check if article in database
    getArticleById(article.Id)
      .then(data => {
        const topicArticle = {
          topicId: parseInt(selectedTopic),
          articleId: data.articleId
        }
        // add topic article bridge
        addTA(topicArticle);
      }).catch(() => {
        // restructure article to fit backend
        const parsedArticle = {
          articleId: article.Id,
          title: article.Title,
          imageUrl: article.ImageUrl,
          imageAlt: article.ImageAlt
        }
        // add article
        addArticle(parsedArticle)
          .then(data => {
            // add topic article bridge
            const topicArticle = {
              topicId: parseInt(selectedTopic),
              articleId: data.articleId
            }
            addTA(topicArticle)
          }).catch(errs => {
            console.log(errs)
          })
      })
    
    console.log(selectedTopic);
  }

  /* ***** ***** pull user topics ***** ***** */

  useEffect(() => {
    setTopics([]);
    getTopicsByUserId(auth.user.userId)
    .then(data => {
      for (let d of data) {
        getTopicById(d.topicId)
          .then(data => {
            const topic = { topicId: data.topicId, name: data.name };
            setTopics(prev => [...prev, topic]);
          })
          .catch(errs => {
            console.log(errs);
          });
      }
    }).catch(errs => {
      console.log(errs);
    })
  }, []);

  /* ***** ***** footer ***** ***** */

  const footer = auth.isLoggedIn()
    ? <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 sm:gap-0">
      {/* back button */}
      <a href="#" className={`group hidden sm:flex flex-row justify-start items-center gap-2 hover:cursor-pointer text-darkGreen}`} onClick={handleClose}>
        <FaArrowLeft className='text-lg group-hover:text-xl' />
        back
      </a>
      {/* pin to topic input */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end items-center w-full md:w-4/5">
        <p as="label" htmlFor="topic-select" className='w-full text-right hidden sm:inline-block'>topic:</p>
        <div className='flex flex-row gap-2 justify-center items-center w-full'>
          <select name="topic-select" id="topic-select"
            className='p-2 rounded-full border-2 border-darkGreen shadow-sm-inner w-full text-sm'
            onChange={(event) => setSelectedTopic(event.target.value)}
            defaultValue={0}>
            <option disabled value={0}>choose a topic</option>
            {topics.map(t => <option value={t.topicId}>{t.name}</option>)}
          </select>
          <button className="btn-green" onClick={handlePin}>pin</button>
        </div>
      </div>
    </div>
    : null;
  
  /* ***** ***** return ***** ***** */

  return (<>
    <Modal color='green' isOpen={isModalOpen}
        setOpen={(val) => setIsModalOpen(val)}
        size='lg'
        header='pin article'
        footer={footer}>
        
        {/* modal content container */}
        <div className="flex flex-col gap-10 justify-start items-start text-darkGreen lg:flex-row-reverse">

          {/* article content */}
          <div className='flex flex-col gap-10 justify-start items-start lg:w-9/12'>
            <h2>{article.Title}</h2>
            {articleContent}
          </div>

          {/* related articles */}
          <div className='sticky top-0 flex flex-col gap-2 justify-start items-start lg:w-3/12 overflow-y-auto'>
            <h4>related articles</h4>
            <ul>{relatedArticles}</ul>
          </div>
        </div>
    </Modal>
    
    {isPinModalOpen && 
      <ArticlePinModal isOpen={isPinModalOpen}
        setOpen={(val) => setIsPinModalOpen(val)} article={article} topicId={selectedTopic} />
    }
  </>);
}