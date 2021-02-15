import {
  GET_INDEX_HTML,
  GET_FOLDER_NAME,
  POPULATE_CATEGORIES,
  USER_FB_DATA,
} from './Actions';

const initialState = {
  index: {},
  categories: [],
  folderName: '',
  userFbData: false,
};

const Reducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_INDEX_HTML: {
      return { ...state, index: action.payload };
    }
    case GET_FOLDER_NAME: {
      return { ...state, folderName: action.payload };
    }
    case POPULATE_CATEGORIES: {
      return { ...state, categories: [...state.categories, action.payload] };
    }
    case USER_FB_DATA: {
      console.log(state);
      return { ...state, userFbData: true };
    }
    default:
      return state;
  }
};

export default Reducer;
