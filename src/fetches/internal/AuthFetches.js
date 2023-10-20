
const URL = 'http://localhost:8080/security';

export async function authenticate(creds) {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(creds)
    };

    const response = await fetch(`${URL}/authenticate`, init);

    if (response.status === 200) {
        const data = await response.json();
        return makeUser(data);
    } else {
        const errors = await response.json();
        return Promise.reject(errors);
    }
}

export async function createAccount(creds) {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(creds)
    };

    const response = await fetch(`${URL}/create_account`, init);
    if (response.status === 201) {
        return await response.json();
    } else {
        const errs = await response.json();
        return Promise.reject(errs);
    }
}

export async function refreshToken() {
    const jwtToken = localStorage.getItem('jwt_token');

    const init = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    };

    const response = await fetch(`${URL}/refresh_token`, init);

    if (response.status === 200) {
        const data = await response.json();
        return makeUser(data);
    } else {
        signOut();
        return Promise.reject('Session expired');
    }
}

export function signOut() {
    localStorage.removeItem('jwt_token');
}

const makeUser = (authResponse) => {
  const jwtToken = authResponse.jwt_token;
  localStorage.setItem('jwt_token', jwtToken);
  return makeUserFromJwt(jwtToken);
};

const makeUserFromJwt = (jwtToken) => {
  const tokenParts = jwtToken.split('.');
  if (tokenParts.length > 1) {
    const userData = tokenParts[1];
    const decodedUserData = JSON.parse(atob(userData));
    return {
      userId: decodedUserData.userId,
      username: decodedUserData.sub,
      roles: decodedUserData.authorities.split(',')
    }
  }
};