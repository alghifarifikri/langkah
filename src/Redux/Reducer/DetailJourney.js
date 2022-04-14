const initialState = {
  data: {},
  loading: false,
};
export default function reducer(state = initialState, action) {
  if (action.type === 'SET_DATA_DETAIL_JOURNEY') {
    return {
      ...state,
      data: action.payload,
    };
  } else {
    return state;
  }
}
