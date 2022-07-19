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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './Form';
import {Alert, BackHandler} from 'react-native';
import {useDispatch} from 'react-redux';
import {DataProfile} from '../../Redux/Action';
import {SetDataProfile} from '../../Redux/Action/DataProfile';

export default function LogIn() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState();
  const [val, setVal] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingGmail, setLoadingGmail] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

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
          setLoadingFb(false);
          console.log('resultnya apa:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginFacebook = () => {
    setLoadingFb(true);
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
            setLoadingFb(false);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const loginGoogle = async () => {
    setLoadingGmail(true);
    GoogleSignin.configure({
      androidClientId:
        '764552466545-rp6djg90j7603307kqh1kh8lhb542d87.apps.googleusercontent.com',
      iosClientId:
        '764552466545-rp6djg90j7603307kqh1kh8lhb542d87.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.hasPlayServices();
      const signIn = await GoogleSignin.signIn();
      if (signIn) {
        await tokenGoogle();
        const data = {
          NoId: signIn.user.id,
          name: signIn.user.name,
          email: signIn.user.email,
          image: signIn.user.photo,
        };
        dispatch(SetDataProfile(data));
        setLoadingGmail(false);
        console.log({signIn});
      }
    } catch (error) {
      console.log({error, statusCodes});
      setLoadingGmail(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    // try {
    //   // const hasPlayService = await GoogleSignin.hasPlayServices();
    //   // if (hasPlayService) {
    //   //   const signIn = await GoogleSignin.signIn();
    //   //   if (signIn) {
    //   //     await tokenGoogle();
    //   //     const data = {
    //   //       NoId: signIn.user.id,
    //   //       name: signIn.user.name,
    //   //       email: signIn.user.email,
    //   //       image: signIn.user.photo,
    //   //     };
    //   //     dispatch(SetDataProfile(data));
    //   //     console.log({signIn});
    //   //   }
    //   // }
    //   await GoogleSignin.hasPlayServices()
    //     .then(async hasPlayService => {
    //       if (hasPlayService) {
    //         await GoogleSignin.signIn()
    //           .then(infoUser => {
    //             tokenGoogle();
    //             const data = {
    //               NoId: infoUser.user.id,
    //               name: infoUser.user.name,
    //               email: infoUser.user.email,
    //               image: infoUser.user.photo,
    //             };
    //             dispatch(SetDataProfile(data));
    //             console.log({infoUser});
    //           })
    //           .catch(e => {
    //             console.log({e});
    //           });
    //       }
    //     })
    //     .catch(e => {
    //       console.log('ERROR IS: ' + JSON.stringify(e));
    //     });
    // } catch (e) {
    //   console.log({e});
    //   // loginGoogle();
    // }
  };

  const tokenGoogle = async () => {
    await GoogleSignin.getTokens()
      .then(token => {
        if (token.accessToken !== null) {
          // dispatch(DataProfile());
          AsyncStorage.setItem('accessToken', token.accessToken);
          AsyncStorage.setItem('loginType', 'google');
          navigation.navigate('Journey') || navigation.navigate('Tab');
          console.log({token});
        }
      })
      .catch(e => {
        setLoadingGmail(false);
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
        AsyncStorage.setItem('dataUser', JSON.stringify(data));
        AsyncStorage.setItem('accessToken', response?.data?.data[0]?.id);
        AsyncStorage.setItem('loginType', 'email');
        setVal({});
        return navigation.navigate('Journey') || navigation.navigate('Tab');
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
      disabled2={loadingGmail}
      disabled3={loadingFb}
    />
  );
}
