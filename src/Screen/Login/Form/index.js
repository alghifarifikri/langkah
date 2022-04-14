import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import LeftHeader from '../../../Component/Global/LeftHeader';
import InputCustom from '../../../Component/Form/InputCustom';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import InputPassword from '../../../Component/Form/InputPassword';

export default function Form({
  val = '',
  loginEmail = () => {},
  loginGoogle = () => {},
  loginFacebook = () => {},
  onChange = () => {},
  disabled = false,
}) {
  const navigation = useNavigation();

  const labelApple = () => {
    return (
      <View style={styles.row}>
        <View style={styles.icon}>
          <AntDesign name="apple1" color={'white'} size={15} />
        </View>
        <View>
          <Text style={styles.login}>Continue with Apple</Text>
        </View>
      </View>
    );
  };
  const labelFacebook = () => {
    return (
      <View style={styles.row}>
        <View style={styles.icon}>
          <AntDesign name="facebook-square" color={'white'} size={15} />
        </View>
        <View>
          <Text style={styles.login}>Log in with Facebook</Text>
        </View>
      </View>
    );
  };
  const labelGoogle = () => {
    return (
      <View style={styles.row}>
        <View style={styles.icon}>
          <Image
            style={{width: 15, height: 15, marginTop: 2}}
            source={{
              uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
            }}
          />
        </View>
        <View>
          <Text style={styles.googleText}>Log in with Google</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <LeftHeader label="Back" />
      <Text style={styles.text}>Welcome Back!</Text>
      <InputCustom
        type="email"
        label="User ID"
        keyJson="email"
        onChange={text => onChange(text)}
        value={val.email}
        style={{label: styles.label, input: styles.input, view: styles.view}}
      />
      <InputPassword
        type="password"
        label="Password"
        keyJson="password"
        onChange={text => onChange(text)}
        value={val.password}
        style={{label: styles.label, input: styles.input, view: styles.view}}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.forgot}>Forgot password</Text>
      </TouchableOpacity>
      <ButtonCustom
        label="Log In"
        onClick={() => loginEmail()}
        disabled={disabled}
        style={{
          button: disabled ? styles.buttonLoading : styles.buttonLogin,
          text: styles.login,
        }}
      />
      <View style={styles.optionText}>
        <Text style={styles.optionColor}>Or login with</Text>
      </View>
      {/* <ButtonCustom
        label={labelApple()}
        disabled={disabled}
        style={{
          button: disabled ? styles.buttonLoading : styles.buttonApple,
          text: styles.login,
        }}
      /> */}
      <ButtonCustom
        label={labelFacebook()}
        onClick={() => loginFacebook()}
        disabled={disabled}
        style={{
          button: disabled ? styles.buttonLoading : styles.buttonFacebook,
          text: styles.login,
        }}
      />
      <ButtonCustom
        label={labelGoogle()}
        onClick={() => loginGoogle()}
        disabled={disabled}
        style={{
          button: disabled ? styles.buttonLoading : styles.buttonGoogle,
          text: styles.login,
        }}
      />
      <View style={styles.marginSign3}>
        <Text style={styles.text2}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text3}> Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  forgot: {
    color: '#8AB4F8',
    marginBottom: 15,
    marginTop: 5,
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  googleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
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
  buttonApple: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: '#000000',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
    borderRadius: 10,
  },
  buttonFacebook: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: '#3B5998',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
    borderRadius: 10,
  },
  buttonGoogle: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: '#CDCDCD',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
    borderRadius: 10,
  },
  optionText: {
    alignItems: 'center',
    marginBottom: 15,
  },
  optionColor: {
    color: '#000000',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 12,
    color: '#000000',
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 12,
    color: '#8AB4F8',
    fontWeight: 'bold',
  },
  marginSign3: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
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
    color: '#000000',
  },
  view: {
    marginBottom: 10,
  },
});
