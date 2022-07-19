/* eslint-disable no-sparse-arrays */
import axios from 'axios';
import {Alert} from 'react-native';

const {REACT_APP_BASE_URL, REACT_APP_API_KEY} = process.env;

export default function CekEmail(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/email?email=${body}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.message === 'Data Email tidak ditemukan') {
        Alert.alert('Cek Gagal', 'Email tidak terdaftar', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ,
        ]);
      }
    } catch (e) {
      console.log({errornya: e.response});
      if (e.response.data.data.length > 0) {
        dispatch(SetDataEmail(e.response.data.data[0]));
      }
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataEmail(data) {
  return {
    type: 'SET_DATA_EMAIL',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_EMAIL',
    payload: data,
  };
}
