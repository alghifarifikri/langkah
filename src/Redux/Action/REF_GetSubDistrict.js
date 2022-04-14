import axios from 'axios';

const {BASE_URL, REACT_APP_API_KEY} = process.env;

export default function REF_GetSubDistrict(param) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/kelurahan?idKecamatan=${param}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.status === 200) {
        const temp = response.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.nama_kelurahan,
            value: v.kode_kelurahan,
          };
        });
        dispatch(SetDataSubDistrict(mapping));
        dispatch(SetLoading(false));
      }
    } catch (e) {
      console.log({errornya: e});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataSubDistrict(data) {
  return {
    type: 'SET_DATA_SUBDISTRICT',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_SUBDISTRICT',
    payload: data,
  };
}
