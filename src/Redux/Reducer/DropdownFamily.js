const initialState = {
  data: [],
  loading: false,
};
export default function reducer(state = initialState, action) {
  if (action.type === 'SET_DATA_FAMILY_DROPDOWN') {
    return {
      ...state,
      data: action.payload,
    };
  } else {
    return state;
  }
}
