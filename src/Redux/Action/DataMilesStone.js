/* eslint-disable no-sparse-arrays */
import axios from 'axios';

const {BASE_URL, REACT_APP_API_KEY} = process.env;

export default function DataMilesStones(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/profile/miles_stone?user_email=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({response});
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataMiles(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      const dataMileStone = [
        {
          sports: 'Walk',
          Total_distance: '0',
          this_week: '0',
          this_month: '0',
        },
        {
          sports: 'Run',
          Total_distance: '0',
          this_week: '0',
          this_month: '0',
        },
        {
          sports: 'Ride',
          Total_distance: '0',
          this_week: '0',
          this_month: '0',
        },
        {
          sports: 'Swim',
          Total_distance: '0',
          this_week: '0',
          this_month: '0',
        },
      ];
      dispatch(SetDataMiles(dataMileStone));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataMiles(data) {
  return {
    type: 'SET_DATA_MILES',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_MILES',
    payload: data,
  };
}
