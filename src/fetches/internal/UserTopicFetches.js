const URL = "http://localhost:8080/api/user/topic";

/* ***** ***** get user topics ***** ***** */

export async function getTopicsByUserId(userId) {
  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  const response = await fetch(`${URL}/${userId}`, init);
  if (response.status === 200) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** ***** add user topic ***** ***** */

export async function addUserTopic(userId, topicId) {
  const userTopic = { userId: userId, topicId: topicId };
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(userTopic)
  }
  const response = await fetch(URL, init);
  if (response.status === 201) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** ***** delete user topic ***** ***** */

export async function deleteUserTopicByKey(userId, topicId) {
  const init = {
    method: 'DELETE'
  }
  const response = await fetch(`${URL}/${userId}/${topicId}`, init);
  if (response.status !== 204) {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}