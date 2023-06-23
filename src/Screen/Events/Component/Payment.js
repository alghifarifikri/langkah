/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  RefreshControl,
} from 'react-native';
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
import InputCustom from '../../../Component/Form/InputCustom';
import ModalCustom from '../../../Component/Form/ModalCustom';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function Payment({route, navigation}) {
  const {data, id, eventId, event_name, setupPrice, url} = route?.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const paymentData = useSelector(state => state.Payment.data);
  const dataUser = useSelector(state => state.Profile.data);
  const refJersey = useSelector(state => state.REF_Jersey.data);
  // const [payment, setDataPayment] = useState(paymentData);
  const [val, setVal] = useState({});
  const [total, setTotal] = useState(paymentData?.[0]?.grandTotal);
  const [disc, setDisc] = useState('0');
  const [isVoucher, setIsVoucher] = useState(false);

  useEffect(() => {
    dispatch(DataPayment(url));
  }, []);

  useEffect(() => {
    setTotal(paymentData?.[0]?.grandTotal);
    setDisc(paymentData?.[0]?.disc);
  }, [paymentData]);

  const rupiahFormat = e => {
    const numb = Number(e);
    const format = numb?.toString().split('').reverse().join('');
    const convert = format?.match(/\d{1,3}/g);
    const rupiah = 'Rp ' + convert?.join('.').split('').reverse().join('');
    return rupiah;
  };

  const voucherValidate = async () => {
    try {
      const distance = data?.distance_id || paymentData?.[0]?.distance_id;
      const category = data?.category_id || paymentData?.[0]?.category_id;
      const option = data?.option_id || paymentData?.[0]?.option_id;
      const res = await axios.get(
        `https://imtiket.com/rest_api/rest-server/Voucher/cekVoucher?event_id=${eventId}&distance_id=${distance}&category_id=${category}&option_id=${option}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.data.status === 'true') {
        return res.data.message;
      }
    } catch (e) {
      console.log({e: e});
      if (e.response.data.status === 'false') {
        return e.response.data.message;
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const voucherCheck = async (voucher, amount) => {
    setLoading(true);
    try {
      const distance = data?.distance_id || paymentData?.[0]?.distance_id;
      const category = data?.category_id || paymentData?.[0]?.category_id;
      const option = data?.option_id || paymentData?.[0]?.option_id;
      const res = await axios.get(
        `https://imtiket.com/rest_api/rest-server/Voucher/getDiscVoucher?event_id=${eventId}&distance_id=${distance}&category_id=${category}&option_id=${option}&total_amount=${amount}&voucher_code=${voucher}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.data.status === true) {
        Alert.alert('Success', res.data.message, [
          {
            text: 'OK',
            onPress: () => {
              setTotal(res.data.total_amount);
              setDisc(res.data.disc_value);
              setLoading(false);
              setIsVoucher(true);
            },
          },
          ,
        ]);
      }
    } catch (e) {
      console.log({e: e});
      if (e.response.data.status === false) {
        Alert.alert('Failed', e.response.data.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ,
        ]);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const pay = async () => {
    setLoading(true);
    if (paymentData[0]?.price_event === '0') {
      return Alert.alert(
        'Gagal Bayar',
        'Event Fee Belum Diatur, Hubungi Admin!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}, ,],
      );
    }

    const validate = await voucherValidate();
    let priceEvent =
      setupPrice !== null
        ? setupPrice
        : paymentData[0]?.price_event;

    console.log({ validate, isVoucher });
    if (isVoucher === false && validate === 'Please firstly enter and activate the voucher correctly. (Silahkan masukkan dan aktivasi voucher dengan benar terlebih dahulu)') {
      return alert(validate);
    }

    const payload = {
      transaction_details: {
        order_id: paymentData[0]?.orderid,
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
          price: Number(priceEvent) || 0,
          quantity: 1,
          name: paymentData[0]?.distance_name.concat(
            paymentData[0]?.category_name,
          ),
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(disc) * -1 || 0,
          quantity: 1,
          name: 'Voucher / Disc Event',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(paymentData[0]?.admin_fee) || 0,
          quantity: 1,
          name: 'Admin Fee Event',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(paymentData[0]?.amount_addon) || 0,
          quantity: 1,
          name: 'Add On',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(paymentData[0]?.admin_fee_addon) || 0,
          quantity: 1,
          name: 'Admin Fee Add On',
          brand: 'IMRR',
          category: '',
          merchant_name: 'IMRR',
        },
        {
          id: event_name,
          price: Number(paymentData[0]?.shipping_fee) || 0,
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

    try {
      const res = await axios.post(URL_MIDTRANS + 'transactions', payload, {
        headers: HEADER_MIDTRANS,
      });
      if (res.status === 201) {
        const mid_url = res.data.redirect_url;
        navigation.navigate('Midtrans', {
          redirect_url: mid_url,
          order_id: paymentData[0]?.orderid,
        });
      }
    } catch (e) {
      console.log({e: e});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onChange = e => {
    const temp = {
      ...val,
      ...e,
    };
    setVal(temp);
  };

  return (
    <View style={styles.container}>
      <NotifHeader label={t('common:payment')} />
      <View style={styles.line} />
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              dispatch(DataPayment(url));
              setIsVoucher(false);
              setVal({});
            }}
          />
        }>
        <LabelCustom
          type="fullname"
          label={'Order ID'}
          keyJson="orderid"
          disabled={true}
          // onChange={text => onChange(text)}
          value={paymentData[0]?.orderid}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        {paymentData[0]?.generatedid && (
          <LabelCustom
            type="fullname"
            label={'No Reg'}
            keyJson="generatedid"
            disabled={true}
            // onChange={text => onChange(text)}
            value={paymentData[0]?.generatedid}
            style={{
              label: styles.label,
              input: styles.inputDisabled2,
              view: styles.view2,
            }}
          />
        )}
        {paymentData[0]?.email_pendaftar && (
          <LabelCustom
            type="fullname"
            label={'Email'}
            keyJson="email_pendaftar"
            disabled={true}
            // onChange={text => onChange(text)}
            value={paymentData[0]?.email_pendaftar}
            style={{
              label: styles.label,
              input: styles.inputDisabled2,
              view: styles.view2,
            }}
          />
        )}
        <LabelCustom
          type="fullname"
          label={t('common:distance')}
          keyJson="distance_name"
          disabled={true}
          // onChange={text => onChange(text)}
          value={paymentData[0]?.distance_name}
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
          value={paymentData[0]?.category_name}
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
          value={paymentData[0]?.option_name}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        {data?.jersey_id && (
          <SelectLabelCustom
            label={t('common:jersey')}
            placeholders={t('common:selectdistance')}
            keyJson="jersey_id"
            disabled={true}
            value={data?.jersey_id}
            style={{
              label: styles.label,
              input: styles.inputDisabled2,
              view: styles.view2,
            }}
            item={refJersey}
          />
        )}
        <LabelCustom
          type="fullname"
          label={t('common:eventfee')}
          keyJson="eventfee"
          disabled={true}
          // onChange={text => onChange(text)}
          value={rupiahFormat(paymentData[0]?.price_event) || rupiahFormat('0')}
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
          value={rupiahFormat(paymentData[0]?.admin_fee) || rupiahFormat('0')}
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
          value={
            rupiahFormat(paymentData[0]?.amount_addon) || rupiahFormat('0')
          }
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
          value={
            rupiahFormat(paymentData[0]?.admin_fee_addon) || rupiahFormat('0')
          }
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
          value={
            rupiahFormat(paymentData[0]?.shipping_fee) || rupiahFormat('0')
          }
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
              Number(paymentData[0]?.admin_fee) +
                Number(paymentData[0]?.admin_fee_addon),
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
          value={rupiahFormat(disc) || rupiahFormat('0')}
          style={{
            label: styles.label,
            input: styles.inputDisabled2,
            view: styles.view2,
          }}
        />
        <View style={styles.line2} />
        <LabelCustom
          type="fullname"
          label={t('common:grandtotal')}
          keyJson="grandTotal"
          disabled={true}
          // onChange={text => onChange(text)}
          value={rupiahFormat(total)}
          style={{
            label: styles.labelTotal,
            input: styles.inputDisabled3,
            view: styles.view2,
          }}
        />
        <InputCustom
          type="fullname"
          label="Voucher"
          keyJson="voucher_code"
          onChange={text => onChange(text)}
          value={val.voucher_code}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
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
            label={'Click to Activate'}
            onClick={() =>
              voucherCheck(val.voucher_code, paymentData[0]?.grandTotal)
            }
            disabled={loading}
            style={{
              button: !loading ? styles.buttonActivate : styles.buttonLoading,
              text: styles.login,
            }}
          />
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
      <ModalCustom visible={loading || paymentData.length === 0} />
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
  line2: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginTop: 10,
    marginBottom: 20,
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
  labelTotal: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
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
  inputDisabled3: {
    height: 35,
    marginTop: -5,
    color: '#000000',
    marginLeft: 'auto',
    fontWeight: 'bold',
    // fontSize: 16,
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
  buttonActivate: {
    width: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    marginBottom: 10,
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
