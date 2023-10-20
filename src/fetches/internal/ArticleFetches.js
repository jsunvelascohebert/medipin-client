const URL = "http://localhost:8080/api/article";

/* ***** get all articles ***** */

/* ***** get article by id ***** */

export async function getArticleById(articleId) {
  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  const response = await fetch(`${URL}/${articleId}`, init);
  if (response.status === 200) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** add article ***** */

export async function addArticle(article) {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(article)
  }
  const response = await fetch(URL, init);
  if (response.status === 201) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** update article ***** */

/* ***** delete article ***** */

