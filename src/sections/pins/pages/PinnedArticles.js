import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleTopics } from '../../../fetches/internal/TopicArticleFetches';
import { getArticleById } from '../../../fetches/internal/ArticleFetches';
import PinnedArticleCard from '../components/PinnedArticleCard';

export default function PinnedArticles() {

  const [articles, setArticles] = useState([]);
  const { topicId, topicName } = useParams();
  const [updated, setUpdated] = useState(false);

  /* ***** ***** pull articles from id ***** ***** */

  useEffect(() => {
    setArticles([]);
    getArticleTopics(topicId)
      .then(data => {
        for (let d of data) {
          getArticleById(d.articleId)
            .then(data => {
              setArticles(prev => [...prev, data]);
            }).catch(errs => {
              console.log(errs);
            })
        }
      }).catch(errs => {
        console.log(errs);
      })
  }, [updated]);

  /* **** ***** return ***** ***** */

  return (
    <section id="pins" className='w-full min-h-screen p-6 sm:p-12 md:p-24 bg-gradient-to-b from-lightOrange to-white'>
      {/* general container */}
      <div className="flex flex-col gap-8 mx-auto justify-center items-center">

        {/* banner container */}
        <div className="flex flex-col gap-8 mx-auto justify-center items-center">
          <h1 className='text-darkOrange'>pinned articles</h1>
          {/* topic container */}
          <div className="flex flex-row gap-4 justify-center items-center">
            <p>topic:</p>
            <p className='bg-orange px-3 border-2 border-darkOrange rounded-full'>{topicName}</p>
          </div>
        </div>

        {/* sort container */}
        <div className='relative w-full flex flex-row justify-center items-center group gap-2'>

            <label htmlFor='topic-sort' className='text-lg opacity-25'>sort:</label>
            {/* sort select */}
            <select name="topic-sort" id="topic-sort" className='w-full p-1 px-2 rounded-full border-2 border-darkOrange text-darkOrange shadow-sm-inner disabled:opacity-25' disabled>
              <option value="" disabled defaultChecked>sort: TBA</option>
              <option value="alphabetical">alphabetical: a-z</option>
              <option value="recent">time: recent-early</option>
            </select> 

            {/* tooltip */}
            <span className="absolute -top-10 left-1/3 scale-0 transition-all rounded-lg bg-lightGray border p-2 text-xs opacity-50 group-hover:scale-100">
              feature unavailable currently
            </span>
          </div>
      
        {/* articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {articles
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(a => <PinnedArticleCard key={a.articleId}
              topic={{ id: topicId, name: topicName }} article={a} updated={() => setUpdated(!updated)}/>)}
        </div>
      </div>
    </section>
  );
}