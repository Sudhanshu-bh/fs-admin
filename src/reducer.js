import * as actions from './actionsList'

export const initialState = {
  user: null,
}

const reducer = (state, action) => {

  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}

export default reducer;