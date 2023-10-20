import React, { useState } from 'react';
import { getArticlesByQuery } from '../../../fetches/ExternalAPI';
import ArticleSearchCard from '../components/ArticleSearchCard';
import LoadingOverlay from '../../utility/LoadingOverlay';

export default function Search() {

  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* ***** ***** event handlers ***** ***** */

  const handleChange = (event) => {
    setSearchTerm(event.target.value);    
  }

  const handleSearch = (event) => {
    event.preventDefault();
    setIsLoading(true);
    getArticlesByQuery(searchTerm)
      .then(data => {
        if (data.Result.Resources) {
          setArticles(data.Result.Resources.Resource);
        } else {
          console.log('no articles');
        }
        setIsLoading(false);
      }).catch(errs => {
        console.log(errs);
      });
  }

  /* ***** ***** return ***** ***** */

  return (<>
    <section id="search" className="w-full min-h-screen p-6 sm:p-12 md:p-24 bg-gradient-to-b from-lightGreen to-white">
      {/* general container */}
      <div className="flex flex-col gap-12 mx-auto justify-center items-center">

        {/* banner */}
        <div className="flex flex-col gap-4 mx-auto justify-center items-center">
          <h1 className='text-darkGreen'>search</h1>
          <p className='text-center max-w-lg'>search for a specific topic and check out the articles that come up. these resources are pulled from the US Department of Health and Human Services’ external API.</p>
        </div>

        {/* search bar */}
        <form id="search-form" className="flex flex-col sm:flex-row gap-4 w-full mx-auto justify-center items-center" onSubmit={handleSearch}>
          <input id="search-input" type="text" className="text-input border-darkGreen text-darkGreen ring-green" onChange={handleChange} placeholder='enter search query'/>
            <button className='btn-green' form="search-form">search</button>
        </form>

        {/* results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {articles.map(a => <ArticleSearchCard key={a.Id} article={a} />)}
        </div>
      </div>
    </section>

    {/* loading content */}
    {isLoading && <LoadingOverlay color='green'/>}
  </>);
}