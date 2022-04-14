import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function LeftHeader({label = ''}) {
  const navigation = useNavigation();

  return (
    <View style={styles.backIcon}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="chevron-left" color={'#000000'} size={23} />
      </TouchableOpacity>
      <Text style={styles.back}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  backIcon: {
    marginTop: 35,
    marginBottom: 5,
    flexDirection: 'row',
  },
});
