/* eslint-disable no-sparse-arrays */
import axios from 'axios';
import {DataJourney} from '.';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function Likes(id, likeStatus, dataUser) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      if (likeStatus === null) {
        const body = {
          journey_id: id,
          email_lover: dataUser.email,
        };
        const res = await axios.post(
          'https://imtiket.com/rest_api/rest-server/hitlove',
          body,
          {
            headers: {'X-API-KEY': 'api123'},
          },
        );
        if (res.data.status === true) {
          dispatch(DataJourney(dataUser.email));
        }
      } else {
        const body = {
          journey_id: id,
          email_lover: dataUser.email,
        };
        const res = await axios.put(
          'https://imtiket.com/rest_api/rest-server/hitlove',
          body,
          {
            headers: {'X-API-KEY': 'api123'},
            // data: body,
          },
        );
        if (res.data.status === true) {
          dispatch(DataJourney(dataUser.email));
        }
      }
    } catch (e) {
      console.log({e: e});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataLikes(data) {
  return {
    type: 'SET_DATA_LIKES',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_LIKES',
    payload: data,
  };
}
