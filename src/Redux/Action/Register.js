/* eslint-disable no-sparse-arrays */
import axios from 'axios';
import {Alert} from 'react-native';

const {BASE_URL, REACT_APP_API_KEY} = process.env;

export default function Register(body) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/email?email=${body.email}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (response.data.status === true) {
        if (body.password1 !== body.password2) {
          Alert.alert('Register Gagal', 'Password Tidak Sesuai', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            ,
          ]);
        } else {
          delete body.password2;
          const res = await axios.post(
            'https://imtiket.com/rest_api/rest-server/user',
            body,
            {
              headers: {'X-API-KEY': 'api123'},
            },
          );
          if (res.data.status === true) {
            dispatch(SetDataRegister({success: 200, data: res.data.message}));
            dispatch(SetLoading(false));
          }
        }
      }
    } catch (e) {
      console.log({errornya: e.response});
      if (e.response.data.status === false) {
        Alert.alert('Register Gagal', 'Email sudah terdaftar', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ,
        ]);
      }
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataRegister(data) {
  return {
    type: 'SET_DATA_REGISTER',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_REGISTER',
    payload: data,
  };
}
