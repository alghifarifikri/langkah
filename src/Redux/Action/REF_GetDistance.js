import axios from 'axios';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function REF_GetDistance(param) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/event/getDistance?event_id=${param}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.status === 200) {
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.distance_name,
            value: v.id,
          };
        });
        // const filter = mapping.filter(
        //   v => v.label.includes('(Sold Out)') !== true,
        // );
        console.log({temp, mapping});
        dispatch(SetDataDistance(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e.response});
      if (e.response.data.status === true) {
        const temp = e.response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.distance_name,
            value: v.id,
          };
        });
        dispatch(SetDataDistance(mapping));
      } else {
        dispatch(SetDataDistance([]));
      }
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataDistance(data) {
  return {
    type: 'SET_DATA_DISTANCE',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_DISTANCE',
    payload: data,
  };
}
