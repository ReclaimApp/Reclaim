import { GET_TWTR_FOLDER_NAME, USER_TWTR_DATA } from '../Actions';

const initialState = {
  folderName: '',
  userTwtrData: false,
};

const TwitterReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_TWTR_FOLDER_NAME: {
      return { ...state, folderName: action.payload };
    }
    case USER_TWTR_DATA: {
      return { ...state, userTwtrData: true };
    }
    default:
      return state;
  }
};

export default TwitterReducer;
