import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

export default function ModalCustom({visible}) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modal}>
        <ActivityIndicator size="large" color="#F65431" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
