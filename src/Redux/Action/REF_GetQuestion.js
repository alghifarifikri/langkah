import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function REF_GetQuestion(param) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/pertanyaan?event_id=${param}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.status === 200) {
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            ...v,
            answer: '',
          };
        });
        dispatch(SetDataQuestion(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataQuestion([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataQuestion(data) {
  return {
    type: 'SET_DATA_QUESTION',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_QUESTION',
    payload: data,
  };
}
