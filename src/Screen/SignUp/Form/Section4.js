import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import SelectCustom from '../../../Component/Form/SelectCustom';
import InputCustom from '../../../Component/Form/InputCustom';

export default function Section4({val = {}, onChange = () => {}}) {
  return (
    <View>
      <View>
        <Text style={styles.text}>(Emergency Contact)</Text>
      </View>
      <InputCustom
        type="fullname"
        label="Emergency Name"
        keyJson="emergencyname"
        onChange={text => onChange(text)}
        value={val.emergencyname}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
      <InputCustom
        type="phone"
        label="Emergency Mobile Number"
        keyboardType="phone-pad"
        keyJson="emergencyphone"
        onChange={text => onChange(text)}
        value={val.emergencyphone}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
      <SelectCustom
        label={'Relationship'}
        placeholders={'Select Relationship'}
        keyJson="emergencyrelationship"
        onChange={text => onChange(text)}
        value={val.emergencyrelationship}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={[
          {label: 'Father', value: '1'},
          {label: 'Mother', value: '2'},
          {label: 'Brother', value: '3'},
          {label: 'Sister', value: '4'},
          {label: 'Wife', value: '5'},
          {label: 'Husband', value: '6'},
          {label: 'Friend', value: '7'},
        ]}
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
  date: {
    height: 30,
    borderBottomWidth: 1,
  },
  view: {
    marginBottom: 10,
  },
  textDate: {
    color: '#000000',
    marginLeft: 2,
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
  },
  address: {
    // height: 100,
    borderBottomWidth: 1,
    marginTop: -5,
  },
  text: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
});
