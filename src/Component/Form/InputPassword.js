import {View, Text, TextInput} from 'react-native';
import React from 'react';

export default function InputPassword({
  type = '',
  label = '',
  style = {},
  keyboardType = '',
  onChange = () => {},
  value = '',
  keyJson = '',
  disabled = false,
}) {
  return (
    <View style={style.view}>
      <Text style={style.label}>{label}</Text>
      <TextInput
        secureTextEntry={true}
        style={style.input}
        value={value}
        editable={!disabled}
        onChangeText={text => {
          onChange({[keyJson]: text});
        }}
      />
    </View>
  );
}
