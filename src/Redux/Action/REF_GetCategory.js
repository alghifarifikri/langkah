import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function REF_GetCategory(id, distance) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/event/getCategory?event_id=${id}&distance_id=${distance}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.status === 200) {
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.categoryname,
            value: v.categoryid,
          };
        });
        dispatch(SetDataCategory(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataCategory([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataCategory(data) {
  return {
    type: 'SET_DATA_CATEGORY',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_CATEGORY',
    payload: data,
  };
}
