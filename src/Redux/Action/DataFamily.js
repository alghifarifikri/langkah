import axios from 'axios';

export default function DataFamily(temp, param, value, type) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/${type}/view_reg_temp?${
          type === 'family'
            ? `id=${param}&description=${value}&event_desc=${temp}`
            : type === 'kolektif'
            ? `qty=${param}&event_id=${value}&user_login=${temp}`
            : `id=${param}`
        }`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataFamily(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataFamily([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataFamily(data) {
  return {
    type: 'SET_DATA_FAMILY',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_FAMILY',
    payload: data,
  };
}
