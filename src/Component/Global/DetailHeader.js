import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DetailHeader({onBack = () => {}}) {
  return (
    <View style={styles.backIcon}>
      <TouchableOpacity onPress={() => onBack()}>
        <FontAwesome name="chevron-left" color={'#000000'} size={23} />
      </TouchableOpacity>
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
    marginBottom: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  centerText: {
    alignItems: 'center',
    width: '90%',
  },
});
