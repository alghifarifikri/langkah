import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function DataPayment(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/registrasi?generated_id=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataPayment(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataPayment([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataPayment(data) {
  return {
    type: 'SET_DATA_PAYMENT',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_PAYMENT',
    payload: data,
  };
}
