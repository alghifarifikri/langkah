import axios from 'axios';

const {BASE_URL, REACT_APP_API_KEY} = process.env;

export default function DataEvent(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/event?role_id=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({response});
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataEvent(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataEvent([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataEvent(data) {
  return {
    type: 'SET_DATA_EVENT',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_EVENT',
    payload: data,
  };
}
