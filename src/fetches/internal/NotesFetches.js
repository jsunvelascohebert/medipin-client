const URL = "http://localhost:8080/api/note";

/* ***** ***** get all notes ***** ***** */

export async function getAllNotes() {
  const init = {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }
  const response = await fetch(URL, init);
  if (response.status === 200) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** ***** get note by id ***** ***** */

export async function getNoteById(noteId) {
  const init = {
    method: 'GET',
    headers: {
      'Accept' : 'application/json'
    }
  }
  const response = await fetch(`${URL}/${noteId}`, init)
  if (response.status === 200) {
    return await response.json()
  } else {
    const errs = await response.json()
    return Promise.reject(errs)
  }
}

/* ***** ***** add note ***** ***** */

export async function addNote(note) {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(note)
  }
  const response = await fetch(URL, init)
  if (response.status === 201) {
    return await response.json();
  } else {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** ***** update note ***** ***** */

export async function updateNote(note) {
  const init = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(note)
  }
  const response = await fetch(`${URL}/${note.noteId}`, init)
  if (response.status !== 204) {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}

/* ***** ***** delete note ***** ***** */

export async function deleteNote(noteId) {
  const init = {
    method: 'DELETE'
  }
  const response = await fetch(`${URL}/${noteId}`, init)
  if (response.status != 204) {
    const errs = await response.json();
    return Promise.reject(errs);
  }
}