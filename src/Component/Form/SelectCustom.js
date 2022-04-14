import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function SelectCustom({
  type = '',
  label = '',
  style = {},
  keyboardType = '',
  onChange = () => {},
  onChangeParam = () => {},
  value = '',
  keyJson = '',
  item = [],
  placeholders = '',
}) {
  return (
    <View style={style.view}>
      <Text style={style.label}>{label}</Text>
      <RNPickerSelect
        placeholder={{label: placeholders, value: null, color: 'grey'}}
        value={value}
        onValueChange={val => {
          onChange({[keyJson]: val});
          if (onChangeParam) {
            onChangeParam(val);
          }
        }}
        style={styles}
        useNativeAndroidPickerStyle={false}
        items={item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderBottomWidth: 1,
    marginTop: -5,
  },
  inputAndroid: {
    height: 40,
    borderBottomWidth: 1,
    marginTop: -5,
    color: 'black',
  },
});
