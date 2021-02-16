import { GET_TWTR_FOLDER_NAME } from '../Actions';

const initialState = {
  folderName: '',
};

const TwitterReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_TWTR_FOLDER_NAME: {
      return { ...state, folderName: action.payload };
    }
    default:
      return state;
  }
};

export default TwitterReducer;
