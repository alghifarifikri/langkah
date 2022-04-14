import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import HeaderSetting from '../../../Component/Global/HeaderSetting';
import InputCustom from '../../../Component/Form/InputCustom';

export default function Email({label = '', val = '', onBack = () => {}}) {
  return (
    <View>
      <HeaderSetting label={label} onBack={onBack} />
      <View style={styles.container}>
        <InputCustom
          type="email"
          label="EMAIL ADDRESS"
          keyJson="email"
          // onChange={text => onChange(text)}
          value={val}
          keyboardType="email-address"
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
    borderColor: '#79B01F',
    marginTop: -5,
    color: '#000000',
  },
  view: {
    marginBottom: 10,
  },
});
