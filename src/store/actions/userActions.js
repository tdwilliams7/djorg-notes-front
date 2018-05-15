import axios from 'axios';

export const SIGN_IN = 'SIGN_IN';

export const login = (username, password, token) => {
  return dispatch => {
    if (username && password) {
      axios
        .post('http://127.0.0.1:8000/obtain-auth-token/', {
          username,
          password
        })
        .then(({ data }) => {
          localStorage.setItem('Authorization', data.token);
          dispatch({ type: SIGN_IN, payload: data.token });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (token) {
      dispatch({ type: SIGN_IN, payload: token });
    }
  };
};
