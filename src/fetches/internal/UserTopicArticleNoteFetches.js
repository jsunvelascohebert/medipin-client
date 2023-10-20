const URL = "http://localhost:8080/api/user/topic/article/note";

/* ***** ***** get UTANS by key ***** ***** */

export async function getUTANsByKey(userId, topicId, articleId) {
  const init = {
    method: 'GET',
    headers: {
      'Accept' : 'application/json'
    }
  }
  const response = await fetch(`${URL}/${userId}/${topicId}/${articleId}`, init);
  if (response.status === 200) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** ***** add utan ***** ***** */

export async function addUTAN(utan) {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(utan)
  }
  const response = await fetch(URL, init);
  if (response.status === 201) {
    return await response.json()
  } else {
    const errs = await response.json();
    return Promise.reject(errs)
  }
}

/* ***** ***** delete utan ***** ***** */

export async function deleteUtan(utan) {
  const init = {
    method: 'DELETE'
  }
  const response = await fetch(`${URL}/${utan.userId}/${utan.topicId}/${utan.articleId}/${utan.noteId}`, init)
  if (response.status !== 204) {
    const errs = await response.json()
    return Promise.reject(errs)
  }
}