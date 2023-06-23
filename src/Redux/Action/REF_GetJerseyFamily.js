import axios from 'axios';

export default function REF_GetJerseyFamily(param, type, method) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/${method}/get_jersey?event_id=${param}&${
          method === 'family' ? `&nama_jenis=${type}` : ''
        }`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({jersey: response});
      if (response.status === 200) {
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.sizename,
            value: v.size_id,
          };
        });
        dispatch(SetDataJerseyFamily(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e});
      dispatch(SetDataJerseyFamily([]));
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataJerseyFamily(data) {
  return {
    type: 'SET_DATA_JERSEY_FAMILY',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_JERSEY_FAMILY',
    payload: data,
  };
}
