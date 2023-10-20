const URL = "http://localhost:8080/api/topic/article";

/* ***** ***** get articles by topic id ***** ***** */

export async function getArticleTopics(topicId) {
  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  const response = await fetch(`${URL}/${topicId}`, init);
  if (response.status === 200) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** ***** add topic article ***** ***** */

export async function addTopicArticle(topicArticle) {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(topicArticle)
  }
  console.log(JSON.stringify(topicArticle))
  const response = await fetch(URL, init);
  console.log(response);
  if (response.status !== 201) {
    const errs = await response.json();
    return Promise.reject(errs);
  } 
}

/* ***** ***** delete all by topic id ***** ***** */

export async function deleteTopicArticleByTopicId(topicId) {
  const init = {
    method: 'DELETE'
  }
  const response = await fetch(`${URL}/${topicId}`, init);
  return await response.json();
}

/* ***** ***** delete topic article by key ***** ***** */

export async function deleteTopicArticle(topicArticle) {
  const init = {
    method: 'DELETE'
  }
  const response = await fetch(`${URL}/${topicArticle.topicId}/${topicArticle.articleId}`, init);
  if (response.status !== 204) {
    const errs = await response.json();
    return Promise.reject(errs);
  }

}