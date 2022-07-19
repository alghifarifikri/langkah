import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function DataNotification(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/notification/notification_history?user_email=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataNotification(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataNotification([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataNotification(data) {
  return {
    type: 'SET_DATA_NOTIFICATION',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_NOTIFICATION',
    payload: data,
  };
}
