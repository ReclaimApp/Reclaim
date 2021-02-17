import {
  GET_TWTR_FOLDER_NAME,
  GET_TWTR_INDEX_HTML,
  USER_TWTR_DATA,
} from '../Actions';

const initialState = {
  folderName: '',
  index: {},
  userTwtrData: false,
};

const TwitterReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_TWTR_FOLDER_NAME: {
      return { ...state, folderName: action.payload };
    }
    case GET_TWTR_INDEX_HTML: {
      return { ...state, index: action.payload };
    }
    case USER_TWTR_DATA: {
      console.log(state);
      return { ...state, userTwtrData: true };
    }
    default:
      return state;
  }
};

export default TwitterReducer;
