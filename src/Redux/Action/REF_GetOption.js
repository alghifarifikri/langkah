import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function REF_GetOption(param, distance, category) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/event/getOption?event_id=${param}&distance_id=${distance}&category_id=${category}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.status === 200) {
        console.log({response, distance, category, param});
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.option_name,
            value: v.option_id,
          };
        });
        dispatch(SetDataOption(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataOption([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataOption(data) {
  return {
    type: 'SET_DATA_OPTION',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_OPTION',
    payload: data,
  };
}
