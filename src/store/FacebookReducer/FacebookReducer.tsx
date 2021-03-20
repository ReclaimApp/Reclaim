import {
  GET_FB_INDEX_HTML,
  POPULATE_CATEGORIES,
  USER_FB_DATA,
  GET_DATA_STATUS
} from '../Actions';

const initialState = {
  index: {},
  categories: [],
  userFbData: false,
  dataStatus: 'Starting reclaim process, please enter your Facebook credentials when the window pops up.'
};

const FacebookReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_FB_INDEX_HTML: {
      return { ...state, index: action.payload };
    }
    case POPULATE_CATEGORIES: {
      return { ...state, categories: [...state.categories, action.payload] };
    }
    case USER_FB_DATA: {
      return { ...state, userFbData: true };
    }
    case GET_DATA_STATUS: {
      console.log(action.payload)
      return {...state, dataStatus: action.payload}
    }
    default:
      return state;
  }
};

export default FacebookReducer;
