/* eslint-disable no-sparse-arrays */
import axios from 'axios';
import {DataJourney} from '.';

const {BASE_URL, REACT_APP_API_KEY} = process.env;

export default function Follow(email, email_user, status) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      if (status === 'follow') {
        const body = {
          email: email,
          email_follower: email_user,
        };
        const res = await axios.post(
          'https://imtiket.com/rest_api/rest-server/hitfollow',
          body,
          {
            headers: {'X-API-KEY': 'api123'},
          },
        );
        if (res.data.status === true) {
          dispatch(DataJourney(email_user));
        }
      } else {
        const body = {
          user_email: email,
          email_follower: email_user,
          approved: 1,
        };
        const res = await axios.put(
          'https://imtiket.com/rest_api/rest-server/hitfollow/follow_unfollow',
          body,
          {
            headers: {'X-API-KEY': 'api123'},
            // data: body,
          },
        );
        console.log({res, body, status});
        if (res.data.status === true) {
          dispatch(DataJourney(email_user));
        }
      }
    } catch (e) {
      console.log({e: e});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataFollow(data) {
  return {
    type: 'SET_DATA_FOLLOW',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_FOLLOW',
    payload: data,
  };
}
