import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle, XCircle } from 'lucide-react-native';
import { useTheme } from '../../Theme/ThemeContext';

export const Toast = ({ message, type = 'success', visible }) => {
  const { colors } = useTheme();

  if (!visible) return null;

  const backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';

  return (
    <View style={[styles.toastContainer, { backgroundColor }]}>
      {type === 'success' ? (
        <CheckCircle color="white" size={20} style={styles.icon} />
      ) : (
        <XCircle color="white" size={20} style={styles.icon} />
      )}
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },
  toastText: {
    color: 'white',
    marginLeft: 8,
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
});
