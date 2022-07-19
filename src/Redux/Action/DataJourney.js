/* eslint-disable no-sparse-arrays */
import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function DataJourney(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/journey?email_login=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({REACT_APP_BASE_URL, REACT_APP_API_KEY, env: process.env});
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataJourney(data));
      }
    } catch (e) {
      console.log({errornya: e});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataJourney(data) {
  return {
    type: 'SET_DATA_JOURNEY',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_JOURNEY',
    payload: data,
  };
}
