import axios from 'axios';

export default function REF_GetJersey(id, distance, category, option) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/event/getJersey?event_id=${id}&distance_id=${distance}&category_id=${category}&option_id=${option}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.status === 200) {
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.sizename,
            value: v.size_id,
          };
        });
        dispatch(SetDataJersey(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e});
      dispatch(SetDataJersey([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataJersey(data) {
  return {
    type: 'SET_DATA_JERSEY',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_JERSEY',
    payload: data,
  };
}
