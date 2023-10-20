const URL = "https://health.gov/myhealthfinder/api/v3";

/* ***** gets list of articles based on search input ***** */

export async function getArticlesByQuery(query) {

  const init = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }

  const response =
    await fetch(`${URL}/topicsearch.json?keyword=${query}`, init);

  if (response.status === 200) {
    return response.json();
  } else {
    const errs = "No articles found!";
    return Promise.reject(errs);
  }
}

/* ***** gets specific article content ***** */

export async function getArticleContentById(id) {
  const init = {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }

  const response =
    await fetch(`${URL}/topicsearch.json?topicId=${id}`, init);
  
  if (response.status === 200) {
    return response.json();
  } else {
    const errs = "Problem getting article from external API";
    return Promise.reject(errs);
  }
}