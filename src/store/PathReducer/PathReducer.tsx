import { GET_DOCUMENTS_PATH } from '../Actions';

const initialState = {
  documentsPath: '',
};

const PathReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENTS_PATH: {
      console.log(action);
      return { ...state, documentsPath: action.payload };
    }
    default:
      return state;
  }
};

export default PathReducer;
