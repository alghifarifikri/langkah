/* eslint-disable no-sparse-arrays */
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import NotifHeader from '../../Component/Global/NotifHeader';
import ButtonCustom from '../../Component/Form/ButtonCustom';
import InputCustom from '../../Component/Form/InputCustom';
import {useNavigation} from '@react-navigation/native';

export default function Forgot() {
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(false);
  const [val, setVal] = useState({});

  const handleChange = e => {
    const temp = {...val, ...e};
    setVal(temp);
  };

  const resetPassword = () => {
    Alert.alert('Reset Berhasil', 'Silahkan cek email anda', [
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('LogIn');
        },
      },
      ,
    ]);
  };

  return (
    <View style={styles.container}>
      <NotifHeader label="Forgot your Password ?" />
      <View style={styles.line} />
      <InputCustom
        type="email"
        label="User ID"
        keyJson="email"
        onChange={text => handleChange(text)}
        value={val.email}
        style={{label: styles.label, input: styles.input, view: styles.view}}
      />
      <ButtonCustom
        label="Reset Password"
        onClick={() => resetPassword()}
        disabled={disabled}
        style={{
          button: disabled ? styles.buttonLoading : styles.buttonLogin,
          text: styles.login,
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
        <Text style={styles.forgot}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    marginBottom: 10,
  },
  forgot: {
    color: '#8AB4F8',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 35,
    marginTop: 20,
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonLogin: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
  },
  buttonLoading: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
  },
  label: {
    color: '#000000',
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
  view: {
    marginBottom: 10,
  },
});
