import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

export default function ProfileHeader({label = ''}) {
  const navigation = useNavigation();

  return (
    <View style={styles.backIcon}>
      <View>
        <Text style={styles.back}>Profile</Text>
      </View>
      <TouchableOpacity
        style={styles.notif}
        onPress={() => navigation.navigate('Setting')}>
        <AntDesign name="setting" color={'#000000'} size={23} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    fontWeight: 'bold',
    color: '#000000',
  },
  backIcon: {
    marginTop: 35,
    marginBottom: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  notif: {
    marginLeft: 'auto',
  },
});
