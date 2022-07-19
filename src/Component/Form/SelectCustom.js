import {View, Text, StyleSheet} from 'react-native';
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
  disabled = false,
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
        style={disabled ? stylesDisabled : styles}
        useNativeAndroidPickerStyle={false}
        items={item}
        disabled={disabled}
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
const stylesDisabled = StyleSheet.create({
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
    backgroundColor: '#E9ECEF',
  },
});
