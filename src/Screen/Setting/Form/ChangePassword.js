import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import HeaderSetting from '../../../Component/Global/HeaderSetting';
import InputPassword from '../../../Component/Form/InputPassword';

export default function ChangePassword({label = '', onBack = () => {}}) {
  return (
    <View>
      <HeaderSetting label={label} onBack={onBack} />
      <View style={styles.container}>
        <InputPassword
          type="password"
          label="CURRENT PASSWORD"
          keyJson="password1"
          // onChange={text => onChange(text)}
          // value={val.password1}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
        <InputPassword
          type="password"
          label="NEW PASSWORD"
          keyJson="password1"
          // onChange={text => onChange(text)}
          // value={val.password1}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
        <InputPassword
          type="password"
          label="NEW PASSWORD AGAIN"
          keyJson="password1"
          // onChange={text => onChange(text)}
          // value={val.password1}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: '#8AB4F8',
    marginTop: -5,
    color: '#000000',
  },
  view: {
    marginBottom: 10,
  },
});
