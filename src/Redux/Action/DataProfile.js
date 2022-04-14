import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk-next';

export default function DataProfile() {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const type = await AsyncStorage.getItem('loginType');
      let dataUser = {};
      if (type === 'facebook') {
        const token = await AsyncStorage.getItem('accessToken');
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id, name,  first_name, last_name, email, picture',
          },
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, result) => {
            if (error) {
              console.log({error});
            } else {
              dataUser = result;
              const data = {
                NoId: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
                image: dataUser.picture.data.url,
              };
              dispatch(SetDataProfile(data));
            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
      } else if (type === 'google') {
        dataUser = await GoogleSignin.getCurrentUser();
        const data = {
          NoId: dataUser.user.id,
          name: dataUser.user.name,
          email: dataUser.user.email,
          image: dataUser.user.photo,
        };
        dispatch(SetDataProfile(data));
      }
    } catch (e) {
      console.log({errornya: e.response});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataProfile(data) {
  return {
    type: 'SET_DATA_PROFILE',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_PROFILE',
    payload: data,
  };
}
