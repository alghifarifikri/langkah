import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import ButtonCustom from '../../Component/Form/ButtonCustom';
import {useNavigation} from '@react-navigation/native';

export default function Gate() {
  const navigation = useNavigation();

  const LogIn = () => {
    navigation.navigate('LogIn');
  };

  return (
    <ImageBackground
      source={require('../../../image/Background.png')}
      resizeMode="cover"
      style={styles.image}>
      <Image
        style={styles.image2}
        source={require('../../../image/logo3.png')}
      />
      <View style={styles.marginSign}>
        <Text style={styles.text}>All of your activities in</Text>
      </View>
      <View style={styles.marginSign2}>
        <Text style={styles.text}>one app.</Text>
      </View>
      <ButtonCustom
        label="Log In"
        onClick={() => LogIn()}
        style={{button: styles.button, text: styles.login}}
      />
      <View style={styles.marginSign3}>
        <Text style={styles.text2}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.text3}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
  },
  image2: {
    width: 236,
    height: 92,
    marginTop: '20%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  text2: {
    fontSize: 12,
    color: 'white',
  },
  text3: {
    fontSize: 12,
    color: '#8AB4F8',
  },
  marginSign: {
    marginTop: 'auto',
  },
  marginSign2: {
    marginBottom: 20,
  },
  marginSign3: {
    marginBottom: '10%',
    flexDirection: 'row',
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: '80%',
    backgroundColor: '#F65431',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
    borderRadius: 10,
  },
});
