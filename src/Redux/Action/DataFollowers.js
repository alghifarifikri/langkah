import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function DataFollowers(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/hitfollow/follow_status?user_email=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataFollowers(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataFollowers([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataFollowers(data) {
  return {
    type: 'SET_DATA_FOLLOWERS',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_FOLLOWERS',
    payload: data,
  };
}
