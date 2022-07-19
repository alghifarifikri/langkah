/* eslint-disable prettier/prettier */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, ScrollView, StyleSheet, Alert, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import NotifHeader from '../../../Component/Global/NotifHeader';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {useDispatch, useSelector} from 'react-redux';
import LabelCustom from '../../../Component/Form/LabelCustom';
import SelectLabelCustom from '../../../Component/Form/SelectLabelCustom';
import {DataPayment} from '../../../Redux/Action';
import axios from 'axios';
import {HEADER_MIDTRANS, URL_MIDTRANS} from '../../../Utils/Url';
import moment from 'moment';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function Payment({route, navigation}) {
  const {data, id, event_name, discount_voucher, setupPrice} = route?.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const paymentData = useSelector(state => state.Payment.data);
  const dataUser = useSelector(state => state.Profile.data);
  const refJersey = useSelector(state => state.REF_Jersey.data);
  const [payment, setDataPayment] = useState(paymentData);

  useEffect(() => {
    dispatch(DataPayment(id));
    setDataPayment(paymentData);
  }, [paymentData]);

  const rupiahFormat = e => {
    const numb = Number(e);
    const format = numb?.toString().split('').reverse().join('');
    const convert = format?.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert?.join('.').split('').reverse().join('');
    return rupiah;
  };

  let priceEvent = setupPrice !== null ? setupPrice : payment[0]?.price_event;
  let total = 0;

  if (discount_voucher) {
    if (Number(discount_voucher.nominal > 0)) {
      priceEvent =
        Number(priceEvent) - Number(discount_voucher.nominal);
      total = Number(payment[0]?.grandTotal) - Number(discount_voucher.nominal);
    } else if (Number(discount_voucher.percent > 0)) {
      priceEvent =
        Number(priceEvent) -
        Number(priceEvent) *
          (Number(discount_voucher.percent) / 100);
      total =
        Number(payment[0]?.grandTotal) -
        Number(payment[0]?.grandTotal) *
          (Number(discount_voucher.percent) / 100);
    }
  } else {
    priceEvent = Number(priceEvent);
    total = Number(payment[0]?.grandTotal);
  }

  const pay = async () => {
    setLoading(true);
    if (payment[0]?.price_event === '0') {
      return Alert.alert(
        'Gagal Bayar',
        'Event Fee Belum Diatur, Hubungi Admin!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}, ,],
      );
    }
    const payload = {
      transaction_details: {
        order_id: payment[0]?.orderid,
        gross_amount: total,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: dataUser.name,
        last_name: '',
        email: dataUser.email,
        phone: dataUser.notelp,
        billing_address: {},
        shipping_address: {},
      },
      item_details: [
        {
          id: event_name,
          price: priceEvent || 0,
          quantity: 1,
          name: payment[0]?.distance_name.concat(payment[0]?.category_name),
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(payment[0]?.disc) * -1 || 0,
          quantity: 1,
          name: 'Voucher / Disc Event',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(payment[0]?.admin_fee) || 0,
          quantity: 1,
          name: 'Admin Fee Event',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(payment[0]?.amount_addon) || 0,
          quantity: 1,
          name: 'Add On',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(payment[0]?.admin_fee_addon) || 0,
          quantity: 1,
          name: 'Admin Fee Add On',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(payment[0]?.shipping_fee) || 0,
          quantity: 1,
          name: 'Shipping Fee',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        ,
      ],
      expiry: {
        start_time: moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format(
          'YYYY-MM-DD HH:mm:ss[Z]',
        ),
        unit: 'minutes',
        duration: 10,
      },
    };

    console.log({payload});
    try {
      const res = await axios.post(URL_MIDTRANS + 'transactions', payload, {
        headers: HEADER_MIDTRANS,
      });
      if (res.status === 201) {
        const url = res.data.redirect_url;
        navigation.navigate('Midtrans', {
          redirect_url: url,
          order_id: payment[0]?.orderid,
        });
      }
    } catch (e) {
      console.log({e: e});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const validateDiscount = e => {
    if (discount_voucher) {
      if (Number(discount_voucher.nominal > 0)) {
        return Number(e) - Number(discount_voucher.nominal);
      } else if (Number(discount_voucher.percent > 0)) {
        return Number(e) - Number(e) * (Number(discount_voucher.percent) / 100);
      }
    } else {
      return Number(e);
    }
  };

  return (
    <View style={styles.container}>
      <NotifHeader label={t('common:payment')} />
      <View style={styles.line} />
      <ScrollView style={styles.scroll}>
        <LabelCustom
          type="fullname"
          label={'Order ID'}
          keyJson="orderid"
          disabled={true}
          // onChange={text => onChange(text)}
          value={payment[0]?.orderid}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={'No Reg'}
          keyJson="generatedid"
          disabled={true}
          // onChange={text => onChange(text)}
          value={payment[0]?.generatedid}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={'Email'}
          keyJson="email_pendaftar"
          disabled={true}
          // onChange={text => onChange(text)}
          value={payment[0]?.email_pendaftar}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:distance')}
          keyJson="distance_name"
          disabled={true}
          // onChange={text => onChange(text)}
          value={payment[0]?.distance_name}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:category')}
          keyJson="category_name"
          disabled={true}
          // onChange={text => onChange(text)}
          value={payment[0]?.category_name}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:option')}
          keyJson="option_name"
          disabled={true}
          // onChange={text => onChange(text)}
          value={payment[0]?.option_name}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <SelectLabelCustom
          label={t('common:jersey')}
          placeholders={t('common:selectdistance')}
          keyJson="jersey_id"
          disabled={true}
          // onChange={text => onChange(text)}
          // onChangeParam={e => onChangeCategory(e)}
          value={data?.jersey_id}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
          item={refJersey}
        />
        <LabelCustom
          type="fullname"
          label={t('common:eventfee')}
          keyJson="eventfee"
          disabled={true}
          // onChange={text => onChange(text)}
          value={
            rupiahFormat(validateDiscount(payment[0]?.price_event)) ||
            rupiahFormat('0')
          }
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:adminfeeevent')}
          keyJson="admin_fee"
          disabled={true}
          // onChange={text => onChange(text)}
          value={rupiahFormat(payment[0]?.admin_fee) || rupiahFormat('0')}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={'Add On'}
          keyJson="amount_addon"
          disabled={true}
          // onChange={text => onChange(text)}
          value={rupiahFormat(payment[0]?.amount_addon) || rupiahFormat('0')}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:adminfeeaddon')}
          keyJson="admin_fee_addon"
          disabled={true}
          // onChange={text => onChange(text)}
          value={rupiahFormat(payment[0]?.admin_fee_addon) || rupiahFormat('0')}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:shippingfee')}
          keyJson="shipping_fee"
          disabled={true}
          // onChange={text => onChange(text)}
          value={rupiahFormat(payment[0]?.shipping_fee) || rupiahFormat('0')}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:totaladminfee')}
          keyJson="totaladminfee"
          disabled={true}
          // onChange={text => onChange(text)}
          value={
            rupiahFormat(
              Number(payment[0]?.admin_fee) +
                Number(payment[0]?.admin_fee_addon),
            ).toString() || rupiahFormat('0')
          }
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        {/* <LabelCustom
          type="fullname"
          label={t('common:totalamount')}
          keyJson="totalamount"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        /> */}
        <LabelCustom
          type="fullname"
          label={t('common:discount')}
          keyJson="disc"
          disabled={true}
          // onChange={text => onChange(text)}
          value={payment[0]?.disc || '0'}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <LabelCustom
          type="fullname"
          label={t('common:grandtotal')}
          keyJson="grandTotal"
          disabled={true}
          // onChange={text => onChange(text)}
          value={rupiahFormat(validateDiscount(payment[0]?.grandTotal))}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        {/* <View style={styles.check}>
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
        </View> */}
        <View>
          <ButtonCustom
            label={t('common:register')}
            onClick={() => pay()}
            disabled={loading}
            style={{
              button: !loading ? styles.buttonLogin : styles.buttonLoading,
              text: styles.login,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  check: {
    flexDirection: 'row',
    marginTop: 20,
  },
  term: {
    color: '#000000',
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    // alignSelf: 'center',
    // justifyContent: 'space-between',
  },
  content: {
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: 'white',
  },
  picProfile: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  textName: {
    fontWeight: 'bold',
    color: '#000000',
    alignSelf: 'center',
  },
  headCard: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  scroll: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
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
  inputDisabled: {
    height: 35,
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
    backgroundColor: '#E9ECEF',
  },
  inputDisabled2: {
    height: 35,
    marginTop: -5,
    color: '#000000',
    marginLeft: 'auto',
  },
  view: {
    marginBottom: 10,
  },
  view2: {
    // marginBottom: 10,
    flexDirection: 'row',
  },
  address: {
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
  },
  postPic: {
    resizeMode: 'cover',
    width: '100%',
    height: 200 * ratio,
    borderRadius: 20,
    alignSelf: 'center',
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  size: {
    marginLeft: 20,
    width: '50%',
  },
  viewImage: {
    width: '50%',
  },
  buttonLogin: {
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 30,
    padding: 13,
    borderRadius: 10,
  },
  buttonLoading: {
    width: '100%',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginBottom: 30,
    padding: 13,
    borderRadius: 10,
  },
  buttonEmail: {
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    padding: 13,
    borderRadius: 10,
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});
