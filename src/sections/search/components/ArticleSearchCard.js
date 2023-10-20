import React, { useState } from 'react';
import { getArticleContentById } from '../../../fetches/ExternalAPI';
import { parseRelated, parseRelatedAndSections, parseSection } from '../../utility/ArticleParser';
import ArticleSearchModal from './ArticleSearchModal';
import LoadingOverlay from '../../utility/LoadingOverlay';

export default function ArticleSearchCard({ article }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleContent, setArticleContent] = useState('');
  const [relatedArticles, setRelatedArticles] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* ***** ***** footer ***** ***** */

  const handleCardClick = () => {
    // pull and parse all the article content
    setIsLoading(true);
    getArticleContentById(article.Id)
      .then(data => {
        const [related, sections] = parseRelatedAndSections(data);
        setArticleContent(sections.map(s => parseSection(s)));
        setRelatedArticles(related.map(r => parseRelated(r)));
        setIsModalOpen(true);
        setIsLoading(false);
      }).catch(errs => {
        console.log(errs);
      });
  }
  
  /* ***** ***** return ***** ***** */
  
  return (
    <>
      {/* main card container */}
      <div id={article.Id}
        className="card bg-green border-darkGreen shadow-darkGreen hover:shadow-darkGreen"
        onClick={handleCardClick}>
        
        <img src={article.ImageUrl} alt={article.ImageAlt} className="rounded-lg border-2 border-darkGreen h-full object-cover" />
        <h3 className='text-darkGreen text-lg sm:text-xl md:text-2xl'>
          {article.Title}
        </h3>
      </div>

      {/* article modal */}
      {isModalOpen && 
        <ArticleSearchModal key={article.id} isOpen={isModalOpen}
          setOpen={(val) => setIsModalOpen(val)}
          article={article} articleContent={articleContent}
          relatedArticles={relatedArticles}/>
      }

      {/* loading content */}
      {isLoading && <LoadingOverlay color='green' />}

    </>
  );

}