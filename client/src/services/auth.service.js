class AuthService {
  static login(user) {
    return fetch(`${process.env.VUE_APP_SERVER_HOST}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => (res.json()))
      .then((response) => {
        if (response.token) {
          localStorage.setItem('user', JSON.stringify(response));
        }
      });
  }

  static logout() {
    localStorage.removeItem('user');
  }

  static register(user) {
    return fetch(`${process.env.VUE_APP_SERVER_HOST}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
      });
  }
}

export default AuthService;
