/* eslint-disable no-sparse-arrays */
/* eslint-disable no-alert */
import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import HeaderSetting from '../../../Component/Global/HeaderSetting';
import InputPassword from '../../../Component/Form/InputPassword';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import ModalCustom from '../../../Component/Form/ModalCustom';

export default function ChangePassword({label = '', onBack = () => {}}) {
  const dataUser = useSelector(state => state.Profile.data);
  const [val, setVal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = e => {
    const temp = {
      ...val,
      ...e,
    };
    setVal(temp);
  };

  const getOldPassword = async () => {
    if (!val.new_password || !val.confirm_password) {
      return alert('Isi semua form terlebih dahulu!');
    }
    if (val.new_password !== val.confirm_password) {
      return alert('Password yang dimasukan tidak cocok');
    }
    setIsLoading(true);
    try {
      const email = dataUser.email;
      const res = await axios.get(
        `https://imtiket.com/rest_api/rest-server/user/get_Password?email=${email}&password_lama=${val.current_password}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.data.status === true) {
        updatePassword();
      }
    } catch (e) {
      console.log({e: e});
      if (e.response.data.status === false) {
        alert(e.response.data.message);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async () => {
    try {
      const payload = {
        email: dataUser.email,
        password_baru: val.new_password,
      };
      const res = await axios.put(
        'https://imtiket.com/rest_api/rest-server/user/change_Password',
        payload,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.data.status === true) {
        Alert.alert('Success', res.data?.message, [
          {text: 'OK', onPress: () => onBack()},
          ,
        ]);
        setIsLoading(false);
      }
    } catch (e) {
      console.log({e});
      Alert.alert('Failed', e.response?.data?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        ,
      ]);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <HeaderSetting label={label} onBack={onBack} onSave={getOldPassword} />
      <View style={styles.container}>
        <InputPassword
          type="password"
          label="CURRENT PASSWORD"
          keyJson="current_password"
          onChange={text => onChange(text)}
          value={val.current_password}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
        <InputPassword
          type="password"
          label="NEW PASSWORD"
          keyJson="new_password"
          onChange={text => onChange(text)}
          value={val.new_password}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
        <InputPassword
          type="password"
          label="NEW PASSWORD AGAIN"
          keyJson="confirm_password"
          onChange={text => onChange(text)}
          value={val.confirm_password}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
      </View>
      <ModalCustom visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: '#8AB4F8',
    marginTop: -5,
    color: '#000000',
  },
  view: {
    marginBottom: 10,
  },
});
