import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import SelectCustom from '../../../Component/Form/SelectCustom';
import InputCustom from '../../../Component/Form/InputCustom';

export default function Section3({
  province = [],
  city = [],
  district = [],
  subDistrict = [],
  onChangeProv = () => {},
  onChangeCity = () => {},
  onChangeDistrict = () => {},
  onChangeSubDistrict = () => {},
  val = {},
  onChange = () => {},
}) {
  return (
    <View>
      <View>
        <Text style={styles.text}>
          (Temporary or permanent addres in Indonesia)
        </Text>
      </View>
      <SelectCustom
        label={'Province'}
        placeholders={'Select Province'}
        keyJson="provinceid"
        onChange={onChange}
        onChangeParam={onChangeProv}
        value={val.provinceid}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={province}
      />
      <SelectCustom
        label={'City'}
        placeholders={'Kota / Kabupaten'}
        keyJson="cityid"
        onChange={onChange}
        onChangeParam={onChangeCity}
        value={val.cityid}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={city}
      />
      <SelectCustom
        label={'District'}
        placeholders={'Kecamatan'}
        keyJson="subdistrictid"
        onChange={onChange}
        onChangeParam={onChangeDistrict}
        value={val.subdistrictid}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={district}
      />
      <SelectCustom
        label={'Sub District'}
        placeholders={'Kelurahan / Desa'}
        keyJson="kelurahanid"
        onChange={onChange}
        onChangeParam={onChangeSubDistrict}
        value={val.kelurahanid}
        style={{
          label: styles.label,
          input: styles.input,
          view: styles.view,
        }}
        item={subDistrict}
      />
      <InputCustom
        type="address"
        label="Address"
        keyJson="address"
        onChange={text => onChange(text)}
        value={val.address}
        style={{
          label: styles.label,
          input: styles.address,
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
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
  },
  text: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
});
