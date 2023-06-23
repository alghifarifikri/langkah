/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Email from './Email';
import ChangePassword from './ChangePassword';
import Language from './Language';
import HistoryPayment from './HistoryPayment';

export default function Form({label = '', val = '', onBack = () => {}}) {
  return (
    <View style={{flex: 1}}>
      {label === 'Email' ? (
        <Email label={label.concat(' Address')} val={val} onBack={onBack} />
      ) : label === 'Change Password' ? (
        <ChangePassword label={label} onBack={onBack} />
      ) : label === 'Language' ? (
        <Language label={label} onBack={onBack} />
      ) : label === 'History Payment' ? (
        <HistoryPayment label={label} onBack={onBack} />
      ) : null}
    </View>
  );
}
