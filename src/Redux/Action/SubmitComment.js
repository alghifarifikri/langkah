import axios from 'axios';
import {DataComment, DataJourney} from '.';

const {BASE_URL, REACT_APP_API_KEY} = process.env;

export default function SubmitComment(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const res = await axios.post(
        'https://imtiket.com/rest_api/rest-server/comment',
        body,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({res, body});
      if (res.data.status === true) {
        dispatch(DataComment(body.journey_id));
        dispatch(DataJourney(body.email_creator));
      }
    } catch (e) {
      console.log({e: e});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataSubmitComment(data) {
  return {
    type: 'SET_DATA_SUBMIT_COMMENT',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_SUBMIT_COMMENT',
    payload: data,
  };
}
