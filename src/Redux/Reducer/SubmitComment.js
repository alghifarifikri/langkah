const initialState = {
  data: {},
  loading: false,
};
export default function reducer(state = initialState, action) {
  if (action.type === 'SET_DATA_SUBMIT_COMMENT') {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === 'SET_LOADING_DATA_SUBMIT_COMMENT') {
    return {
      ...state,
      loading: action.payload,
    };
  } else {
    return state;
  }
}
