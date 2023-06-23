import axios from 'axios';

export default function DataPayment(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(body, {
        headers: {'X-API-KEY': 'api123'},
      });
      console.log({response});
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
