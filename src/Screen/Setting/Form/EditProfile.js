/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Checkbox} from 'react-native-paper';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import {SetDataRegister} from '../../Redux/Action/Register';
import {useTranslation} from 'react-i18next';
import LeftHeader from '../../../Component/Global/LeftHeader';
import Section1 from '../../SignUp/Form/Section1';
import Section2 from '../../SignUp/Form/Section2';
import Section3 from '../../SignUp/Form/Section3';
import Section4 from '../../SignUp/Form/Section4';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {ParsedDate} from '../../../Utils/ParseDate';
import {
  REF_GetCity,
  REF_GetDistrict,
  REF_GetIdentity,
  REF_GetNationality,
  REF_GetProvince,
  REF_GetSubDistrict,
} from '../../../Redux/Action';

export default function EditProfile() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const dataUser = useSelector(state => state.Profile.data);
  const navigation = useNavigation();
  const nationality = useSelector(state => state.REF_Nationality.data);
  const province = useSelector(state => state.REF_Province.data);
  const identity = useSelector(state => state.REF_Identity.data);
  const city = useSelector(state => state.REF_City.data);
  const district = useSelector(state => state.REF_District.data);
  const subDistrict = useSelector(state => state.REF_SubDistrict.data);
  const ResultRegister = useSelector(state => state.Register.data);
  const loading = useSelector(state => state.Register.loading);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateShow, setDateShow] = useState('');
  const [val, setVal] = useState(dataUser);
  const [date, setDate] = useState('');
  const [checked, setChecked] = useState(false);
  const [section, setSection] = useState(1);
  const [provParam, setProvParam] = useState('');
  const [cityParam, setCityParam] = useState('');
  const [disParam, setDisParam] = useState('');
  const [subDisParam, setSubDisParam] = useState('');

  if (ResultRegister.success === 200) {
    Alert.alert(`${ResultRegister.data}`, 'Silahkan lakukan verifikasi email', [
      {
        text: 'OK',
        onPress: () => {
          // dispatch(SetDataRegister({}));
          // navigation.navigate('LogIn');
        },
      },
      ,
    ]);
  }
  useEffect(() => {
    dispatch(REF_GetNationality());
    dispatch(REF_GetProvince());
    dispatch(REF_GetIdentity());
  }, []);

  useEffect(() => {
    dispatch(REF_GetCity(provParam));
  }, [provParam]);

  useEffect(() => {
    dispatch(REF_GetDistrict(cityParam));
  }, [cityParam]);

  useEffect(() => {
    dispatch(REF_GetSubDistrict(disParam));
  }, [disParam]);

  const handleConfirm = dates => {
    const temp = ParsedDate(dates);
    setDate(moment(dates, 'DD-MM-YYYY').format('DD-MM-YYYY'));
    setDateShow(temp);
  };

  const onChange = e => {
    const temp = {
      ...val,
      ...e,
      dob: date,
      role_id: 2,
      is_active: 0,
    };
    setVal(temp);
  };

  const signUpMember = () => {
    try {
      const nationFilter = nationality.filter(v => {
        return v.value === val.nationid;
      });
      const kewarganegaraan = nationFilter[0]?.label;
      const payload = {
        ...val,
        kewarganegaraan,
        date_created: moment(new Date(), 'DD-MM-YYYY').format('DD-MM-YYYY'),
      };
      // dispatch(Register(payload));
    } catch (e) {
      console.log({e});
    }
  };

  return (
    <View style={styles.container}>
      <LeftHeader label="Back" />
      <ScrollView style={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.section}>
            {section === 1 ? (
              <Section1 val={val} onChange={onChange} />
            ) : section === 2 ? (
              <Section2
                handleConfirm={e => handleConfirm(e)}
                isDatePickerVisible={isDatePickerVisible}
                setDatePickerVisibility={e => setDatePickerVisibility(e)}
                dateShow={dateShow}
                nationality={nationality}
                identity={identity}
                val={val}
                onChange={onChange}
              />
            ) : section === 3 ? (
              <Section3
                province={province}
                onChangeProv={v => setProvParam(v)}
                onChangeCity={v => setCityParam(v)}
                onChangeDistrict={v => setDisParam(v)}
                onChangeSubDistrict={v => setSubDisParam(v)}
                city={city}
                district={district}
                subDistrict={subDistrict}
                val={val}
                onChange={onChange}
              />
            ) : (
              <Section4 val={val} onChange={onChange} />
            )}
          </View>
          {section === 1 ? (
            <ButtonCustom
              label="Continue"
              onClick={() => setSection(section + 1)}
              style={{button: styles.buttonLogin, text: styles.login}}
            />
          ) : section === 4 ? (
            <>
              <View style={styles.check}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <View>
                  <Text style={styles.term}>
                    I have read and agree to the website
                  </Text>
                  <Text style={styles.term}>terms and condition</Text>
                </View>
              </View>
              <View style={styles.row}>
                <ButtonCustom
                  label="Back"
                  onClick={() => setSection(section - 1)}
                  style={{button: styles.buttonSection, text: styles.login}}
                />
                <ButtonCustom
                  label={t('common:register')}
                  disabled={!checked || loading}
                  onClick={() => signUpMember()}
                  style={{
                    button: checked
                      ? styles.buttonSection
                      : styles.buttonLoading,
                    text: styles.login,
                  }}
                />
              </View>
            </>
          ) : (
            <View style={styles.row}>
              <ButtonCustom
                label="Back"
                onClick={() => setSection(section - 1)}
                style={{button: styles.buttonSection, text: styles.login}}
              />
              <ButtonCustom
                label="Continue"
                onClick={() => setSection(section + 1)}
                style={{button: styles.buttonSection, text: styles.login}}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 35,
    marginTop: 20,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    marginTop: -5,
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
  scroll: {
    marginBottom: 20,
  },
  check: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  term: {
    color: '#000000',
    fontWeight: 'bold',
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonLogin: {
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
  },
  buttonSection: {
    width: '45%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
  },
  section: {
    marginBottom: 20,
  },
  buttonLoading: {
    width: '45%',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
  },
});
