import produce from 'immer';

const initialState = {
  token: null,
  signed: false,
  loading: false,
};

const auth = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        return draft;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        return draft;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        return draft;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        return draft;
      }
      default:
        return state;
    }
  });
};

export default auth;
