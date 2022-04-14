import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import InputCustom from '../../../Component/Form/InputCustom';
import InputPassword from '../../../Component/Form/InputPassword';

export default function Section1({val = {}, onChange = () => {}}) {
  return (
    <View>
      <InputCustom
        type="fullname"
        label="Full Name"
        keyJson="name"
        onChange={text => onChange(text)}
        value={val.name}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
      <InputCustom
        type="email"
        label="Email"
        keyJson="email"
        onChange={text => onChange(text)}
        value={val.email}
        keyboardType="email-address"
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
      <InputPassword
        type="password"
        label="Password"
        keyJson="password1"
        onChange={text => onChange(text)}
        value={val.password1}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
      <InputPassword
        type="password"
        label="Repeat Password"
        keyJson="password2"
        onChange={text => onChange(text)}
        value={val.password2}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
  },
  view: {
    marginBottom: 10,
  },
});
