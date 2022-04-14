import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function FloatingButton({onPress = () => {}}) {
  return (
    <View style={styles.MainContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.TouchableOpacityStyle}>
        <Image
          source={{
            uri: 'https://i.ibb.co/5B6VrYC/Vector.png',
          }}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
