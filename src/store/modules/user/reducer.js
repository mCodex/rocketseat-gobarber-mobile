import produce from 'immer';

const initialState = {
    profile: null,
};

const user = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCCESS': {
                draft.profile = action.payload.user;
                return draft;
            }
            case '@user/UPDATE_PROFILE_SUCCESS': {
                draft.profile = action.payload.profile;
                return draft;
            }
            case '@auth/SIGN_OUT': {
                draft.profile = null;
                return draft;
            }
            default:
                return state;
        }
    });
};

export default user;
