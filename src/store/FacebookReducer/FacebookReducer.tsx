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
  dataStatus: ''
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
      return {...state, dataStatus: action.payload}
    }
    default:
      return state;
  }
};

export default FacebookReducer;
