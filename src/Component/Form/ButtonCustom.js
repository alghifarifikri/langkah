import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

export default function ButtonCustom({
  label = '',
  style = {},
  onClick = () => {},
  disabled = false,
}) {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={style.button}
      onPress={onClick}>
      {disabled && label !== t('common:register') ? (
        <ActivityIndicator size="small" color="#F65431" />
      ) : (
        <Text style={style.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
