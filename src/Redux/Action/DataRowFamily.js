import axios from 'axios';

export default function DataRowFamily(param, type) {
  return async dispatch => {
    dispatch(SetLoadingRowFamily(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/${
          type === 'kolektif' ? 'collective' : type
        }/edit_reg_temp?noreg=${param}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.status === true) {
        const {data} = response.data;
        dispatch(SetDataRowFamily(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
      dispatch(SetDataRowFamily({}));
    } finally {
      dispatch(SetLoadingRowFamily(false));
    }
  };
}

export function SetDataRowFamily(data) {
  return {
    type: 'SET_DATA_ROW_FAMILY',
    payload: data,
  };
}

export function SetLoadingRowFamily(data) {
  return {
    type: 'SET_LOADING_DATA_ROW_FAMILY',
    payload: data,
  };
}
