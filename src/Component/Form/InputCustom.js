import {View, Text, TextInput} from 'react-native';
import React from 'react';

export default function InputCustom({
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
  const replaceRange = (s, start, end, substitute) => {
    return s.substring(0, start) + '•••••••••' + s.substring(end);
  };
  return (
    <View style={style.view}>
      <Text style={style.label}>{label}</Text>
      <TextInput
        secureTextEntry={secure}
        placeholder={placeholder}
        keyboardType={`${keyboardType}`}
        style={style.input}
        value={
          type === 'mobileHide'
            ? replaceRange(value, 0, 9)
            : type === 'addressHide' && disabled
            ? value?.replace(/./g, '•')
            : value
        }
        multiline
        numberOfLines={type === 'address' || type === 'addressHide' ? 4 : 1}
        editable={!disabled}
        onChangeText={text => {
          onChange({[keyJson]: text});
        }}
      />
    </View>
  );
}
