import { SIGN_IN } from '../actions/userActions';
const initialState = {
  user: '',
  signedIn: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
        signedIn: true
      };
    default:
      return state;
  }
};
