import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DatePickerCustom from '../../../Component/Form/DatePickerCustom';
import SelectCustom from '../../../Component/Form/SelectCustom';
import InputCustom from '../../../Component/Form/InputCustom';

export default function Section2({
  handleConfirm = () => {},
  isDatePickerVisible = false,
  setDatePickerVisibility = () => {},
  dateShow = '',
  nationality = [],
  identity = [],
  val = {},
  onChange = () => {},
}) {
  return (
    <View>
      <DatePickerCustom
        handleConfirm={handleConfirm}
        hideDatePicker={() => setDatePickerVisibility(false)}
        isDatePickerVisible={isDatePickerVisible}
        dateShow={dateShow}
        showDatePicker={() => setDatePickerVisibility(true)}
        styles={{
          label: styles.label,
          date: styles.date,
          view: styles.view,
          textDate: styles.textDate,
        }}
      />
      <SelectCustom
        label={'Identity Type'}
        placeholders={'Select Identity Type'}
        keyJson="jenis_id"
        onChange={text => onChange(text)}
        value={val.jenis_id}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={identity}
      />
      <InputCustom
        type="phone"
        label="Identity Number"
        keyboardType="phone-pad"
        keyJson="noid"
        onChange={text => onChange(text)}
        value={val.noid}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
      <SelectCustom
        label={'Gender'}
        placeholders={'Select Gender'}
        keyJson="gender"
        onChange={text => onChange(text)}
        value={val.gender}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={[
          {label: 'Female', value: '0'},
          {label: 'Male', value: '1'},
        ]}
      />
      <SelectCustom
        label={'Blood Type'}
        placeholders={'Select Blood Type'}
        keyJson="goldarah"
        onChange={text => onChange(text)}
        value={val.goldarah}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={[
          {label: 'A', value: 'A'},
          {label: 'B', value: 'B'},
          {label: 'AB', value: 'AB'},
          {label: 'O', value: 'O'},
        ]}
      />
      <InputCustom
        type="phone"
        label="Phone Number"
        keyboardType="phone-pad"
        keyJson="telpno"
        onChange={text => onChange(text)}
        value={val.telpno}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
      />
      <SelectCustom
        label={'Nationality'}
        placeholders={'Select Nationality'}
        keyJson="nationid"
        onChange={text => onChange(text)}
        value={val.nationid}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={nationality}
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
});
