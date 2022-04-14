/* eslint-disable no-sparse-arrays */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './Form';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {DataProfile} from '../../Redux/Action';
import {SetDataProfile} from '../../Redux/Action/DataProfile';

export default function LogIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
  const [val, setVal] = useState({});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function fetch() {
  //     console.log({token: await AsyncStorage.getItem('accessToken')});
  //     try {
  //       const response = await axios.get(
  //         'https://rickandmortyapi.com/api/character/75',
  //       );
  //       console.log({response});
  //     } catch (e) {
  //       console.log({e});
  //     }
  //   }
  //   fetch();
  // }, []);

  const getToken = token => {
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
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(result);
          dispatch(DataProfile());
          console.log('resultnya apa:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            AsyncStorage.setItem('accessToken', accessToken);
            AsyncStorage.setItem('loginType', 'facebook');
            navigation.navigate('Tab');
            console.log({accessToken});
            getToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const loginGoogle = async () => {
    GoogleSignin.configure({
      androidClientId:
        '764552466545-rp6djg90j7603307kqh1kh8lhb542d87.apps.googleusercontent.com',
      iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
    });
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices();
      if (hasPlayService) {
        const signIn = await GoogleSignin.signIn();
        if (signIn) {
          tokenGoogle();
          console.log({signIn});
        }
      }
      // await GoogleSignin.hasPlayServices()
      //   .then(async hasPlayService => {
      //     if (hasPlayService) {
      //       await GoogleSignin.signIn()
      //         .then(infoUser => {
      //           tokenGoogle();
      //           console.log({infoUser});
      //         })
      //         .catch(e => {
      //           console.log(e);
      //         });
      //     }
      //   })
      //   .catch(e => {
      //     console.log('ERROR IS: ' + JSON.stringify(e));
      //   });
    } catch (e) {
      console.log({e});
    }
  };

  const tokenGoogle = async () => {
    await GoogleSignin.getTokens()
      .then(token => {
        if (token !== null) {
          dispatch(DataProfile());
          AsyncStorage.setItem('accessToken', token.accessToken);
          AsyncStorage.setItem('loginType', 'google');
          navigation.navigate('Tab');
          console.log({token});
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };

  const loginEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://imtiket.com/rest_api/rest-server/auth?email=${val.email}&password=${val.password}`,
        {headers: {'X-API-KEY': 'api123'}},
      );
      if (response.status === 200) {
        const data = {
          ...response.data.data[0],
        };
        dispatch(SetDataProfile(data));
        AsyncStorage.setItem('accessToken', response?.data?.data[0]?.id);
        AsyncStorage.setItem('loginType', 'email');
        navigation.navigate('Tab');
      }
    } catch (e) {
      console.log({e});
      Alert.alert('Log In Gagal', `${e.response?.data?.message}`, [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onChange = e => {
    const temp = {...val, ...e};
    setVal(temp);
  };

  return (
    <Form
      val={val}
      onChange={onChange}
      loginEmail={() => loginEmail()}
      loginGoogle={() => loginGoogle()}
      loginFacebook={() => loginFacebook()}
      disabled={loading}
    />
  );
}
