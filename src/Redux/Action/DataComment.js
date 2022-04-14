import axios from 'axios';

const {BASE_URL, REACT_APP_API_KEY} = process.env;

export default function DataComment(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/comment?journey_id=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataComment(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataComment([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataComment(data) {
  return {
    type: 'SET_DATA_COMMENT',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_COMMENT',
    payload: data,
  };
}
