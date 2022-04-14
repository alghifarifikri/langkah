/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {
  const navigation = useNavigation();
  const [splash, setFlash] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      setFlash(true);
      const token = await AsyncStorage.getItem('accessToken');
      setTimeout(() => {
        if (token) {
          navigation.navigate('Tab');
        } else {
          navigation.navigate('Gate');
        }
      }, 5000);
    }, 5000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {!splash ? (
        <>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                marginLeft: '20%',
                fontWeight: 'bold',
                color: 'black',
                fontSize: 12,
              }}>
              POWERED BY
            </Text>
          </View>
          <Image
            style={{width: 236, height: 50, margin: 5}}
            source={require('../../../image/Logo2.png')}
          />
        </>
      ) : (
        <>
          <Image
            style={{width: 297, height: 404}}
            source={require('../../../image/LOGO.png')}
          />
        </>
      )}
    </View>
  );
}
