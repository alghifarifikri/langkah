import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

export default function LabelCustom({
  type = '',
  label = '',
  style = {},
  keyboardType = '',
  onChange = () => {},
  value = '',
  keyJson = '',
  secure = false,
  placeholder = '',
  disabled = false,
}) {
  return (
    <View style={style.view}>
      <Text style={style.label}>{label}</Text>
      <TextInput
        secureTextEntry={secure}
        placeholder={placeholder}
        keyboardType={`${keyboardType}`}
        style={style.input}
        value={value}
        multiline
        numberOfLines={type === 'address' ? 4 : 1}
        editable={!disabled}
        onChangeText={text => {
          onChange({[keyJson]: text});
        }}
      />
    </View>
  );
}
