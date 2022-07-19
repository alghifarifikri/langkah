import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function REF_GetNationality() {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        'https://imtiket.com/rest_api/rest-server/nationality',
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.status === 200) {
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.nationname,
            value: v.id,
          };
        });
        dispatch(SetDataNationality(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataNationality(data) {
  return {
    type: 'SET_DATA_NATIONALITY',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_NATIONALITY',
    payload: data,
  };
}
