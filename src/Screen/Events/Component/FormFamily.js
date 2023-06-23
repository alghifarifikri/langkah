/* eslint-disable no-alert */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import {
  DataFamily,
  DataRowFamily,
  REF_GetJerseyFamily,
} from '../../../Redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import ModalCustom from '../../../Component/Form/ModalCustom';
import NotifHeader from '../../../Component/Global/NotifHeader';
import InputCustom from '../../../Component/Form/InputCustom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function FormFamily({route, navigation}) {
  const {methodRegist, data, dataFamily, paramId, dataVal} = route?.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const eventFamily = useSelector(state => state.Family.data);
  const loading = useSelector(state => state.Family.loading);
  const dataUser = useSelector(state => state.Profile.data);
  const [family, setFamily] = useState(eventFamily);
  const [desc, setDesc] = useState('');
  const [val, setVal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const event_desc =
      methodRegist !== 'kolektif'
        ? `${data.id}-${data.eventname}-${methodRegist?.toUpperCase()}`
        : dataUser.name;
    const id = paramId;
    const description =
      methodRegist !== 'kolektif'
        ? dataFamily.filter(v => {
            return v.value === paramId;
          })[0]?.label
        : data.id;
    AsyncStorage.setItem('paramId', paramId);
    setDesc(description);
    dispatch(DataFamily(event_desc, id, description, methodRegist));
  }, []);

  useEffect(() => {
    setFamily(eventFamily);
  }, [eventFamily]);

  const onChange = e => {
    const temp = {
      ...val,
      ...e,
    };
    setVal(temp);
  };

  const rupiahFormat = e => {
    const numb = Number(e);
    const format = numb?.toString().split('').reverse().join('');
    const convert = format?.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert?.join('.').split('').reverse().join('');
    return rupiah;
  };

  const nextSubmit = async () => {
    if (!val?.group_name && methodRegist !== 'kolektif') {
      return alert('Family Name Harus Diisi!');
    }
    setIsLoading(true);
    try {
      const payload = {
        group_name: val?.group_name,
        order_id: family[0].orderid,
        total_participant: family.length,
      };
      const res = await axios.post(
        'https://imtiket.com/rest_api/rest-server/family/save_reg_temp',
        payload,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({res, payload});
      if (res.data.status === true) {
        return Alert.alert('Success', res.data.message, [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Payment', {
                data: {},
                eventId: data.id,
                addOns: [],
                addQuestionn: [],
                url: `https://imtiket.com/rest_api/rest-server/payment/view_payment?order_id=${family[0].orderid}`,
                id: family[0].orderid,
                event_name: data.eventname,
                discount_voucher: '',
                setupPrice: null,
              });
            },
          },
          ,
        ]);
      } else {
        return Alert.alert('Failed', 'Coba lagi', [
          {
            text: 'OK',
            onPress: () => {},
          },
          ,
        ]);
      }
    } catch (e) {
      console.log({e: e});
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <NotifHeader
        label={methodRegist === 'family' ? t('common:family') : 'Group'}
      />
      <View style={styles.line} />
      <ScrollView>
        {family.map(item => {
          return (
            <List.Section>
              <List.Accordion title={item.generatedid} style={styles.content}>
                {/* <View style={styles.headCard}>
                  <Text style={styles.textName}>No. Registrasi</Text>
                  <Text style={styles.labelValue}>{item.generatedid}</Text>
                </View> */}
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Order ID</Text>
                  <Text style={styles.labelValue}>{item.orderid}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Participant</Text>
                  <Text style={styles.labelValue}>{item.peserta}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Name</Text>
                  <Text style={styles.labelValue}>{item.name || '-'}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Email</Text>
                  <Text style={styles.labelValue}>{item.email}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Distance</Text>
                  <Text style={styles.labelValue}>{item.distance_name}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Category</Text>
                  <Text style={styles.labelValue}>{item.category_name}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Option</Text>
                  <Text style={styles.labelValue}>{item.option_name}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Add On</Text>
                  <Text style={styles.labelValue}>{item.addon || '-'}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Jersey</Text>
                  <Text style={styles.labelValue}>{item.jersey}</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Amount</Text>
                  <Text style={styles.labelValue}>
                    {rupiahFormat(Number(item.amount))}
                  </Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Status</Text>
                  <Text style={styles.labelValue}>
                    {item.status?.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>{''}</Text>
                  <ButtonCustom
                    label={'Edit'}
                    onClick={() => {
                      dispatch(DataRowFamily(item.generatedid, methodRegist));
                      dispatch(
                        REF_GetJerseyFamily(
                          data.id,
                          item.peserta.substring(0, item.peserta.length - 2),
                          methodRegist,
                        ),
                      );
                      navigation.navigate('FormRegister', {
                        methodRegist,
                        data: {...item, ...data},
                      });
                    }}
                    style={{
                      button: styles.buttonLogin,
                      text: styles.login,
                    }}
                  />
                </View>
              </List.Accordion>
            </List.Section>
          );
        })}
        <View style={styles.scroll}>
          {methodRegist !== 'kolektif' && (
            <InputCustom
              type="address"
              label={
                methodRegist === 'family' ? 'Family Option' : 'Group Option'
              }
              keyJson="email"
              value={desc}
              disabled={true}
              style={{
                label: styles.label,
                input: styles.addressDisabled,
                view: styles.view,
              }}
            />
          )}
          {methodRegist !== 'kolektif' && (
            <InputCustom
              type="email"
              label={methodRegist === 'family' ? 'Family Name' : 'Group Name'}
              keyJson="group_name"
              onChange={text => onChange(text)}
              value={val?.group_name}
              // keyboardType="email-address"
              style={{
                label: styles.label,
                input: styles.input,
                view: styles.view,
              }}
            />
          )}
          <InputCustom
            type="email"
            label="Total Participant"
            keyJson="email"
            value={family.length.toString()}
            disabled={true}
            style={{
              label: styles.label,
              input: styles.inputDisabled,
              view: styles.view,
            }}
          />
          <InputCustom
            type="email"
            label="Total Amount"
            keyJson="email"
            value={rupiahFormat(family[0]?.amount)}
            disabled={true}
            style={{
              label: styles.label,
              input: styles.inputDisabled,
              view: styles.view,
            }}
          />
        </View>
        <View style={styles.headCard}>
          <Text style={styles.textName}>{''}</Text>
          <ButtonCustom
            label={'Next'}
            onClick={() => nextSubmit()}
            disabled={isLoading}
            style={{
              button: styles.buttonLogin,
              text: styles.login,
            }}
          />
        </View>
      </ScrollView>
      <ModalCustom visible={loading || isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    marginBottom: 10,
  },
  picProfile: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  content: {
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: 'white',
    fontSize: 10,
  },
  text: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  formatText: {
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  textName: {
    marginLeft: '10%',
    fontWeight: 'bold',
    color: '#000000',
    alignSelf: 'center',
  },
  headCard: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonLogin: {
    width: '25%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 15,
    marginTop: 10,
  },
  labelValue: {
    marginLeft: 'auto',
    marginRight: 15,
    color: 'black',
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
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
    color: '#000000',
  },
  view: {
    marginBottom: 10,
  },
  inputDisabled: {
    height: 35,
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
    backgroundColor: '#E9ECEF',
  },
  addressDisabled: {
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
    backgroundColor: '#E9ECEF',
  },
  scroll: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
});
