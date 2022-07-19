/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import InputCustom from '../../../Component/Form/InputCustom';
import NotifHeader from '../../../Component/Global/NotifHeader';
import SelectCustom from '../../../Component/Form/SelectCustom';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {
  CekEmail,
  REF_GetAddOns,
  REF_GetCategory,
  REF_GetCity,
  REF_GetDistance,
  REF_GetDistrict,
  REF_GetJersey,
  REF_GetNationality,
  REF_GetOption,
  REF_GetProvince,
  REF_GetQuestion,
  REF_GetSubDistrict,
} from '../../../Redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function FormRegister({route, navigation}) {
  const dispatch = useDispatch();
  const {methodRegist, data} = route?.params;
  const {t} = useTranslation();
  const dataUser = useSelector(state => state.Profile.data);
  const refDistance = useSelector(state => state.REF_Distance.data);
  const refOption = useSelector(state => state.REF_Option.data);
  const refCategory = useSelector(state => state.REF_Category.data);
  const refJersey = useSelector(state => state.REF_Jersey.data);
  const Question = useSelector(state => state.REF_Question.data);
  const dataAdd = useSelector(state => state.REF_AddOns.data);
  const dataEmail = useSelector(state => state.CekEmail.data);
  const nationality = useSelector(state => state.REF_Nationality.data);
  const province = useSelector(state => state.REF_Province.data);
  const city = useSelector(state => state.REF_City.data);
  const district = useSelector(state => state.REF_District.data);
  const subDistrict = useSelector(state => state.REF_SubDistrict.data);
  const [val, setVal] = useState({});
  const [addOn, setAddOn] = useState(dataAdd);
  const [refQuestion, setRefQuestion] = useState(Question);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(REF_GetQuestion(data.id));
    dispatch(REF_GetAddOns(data.id));
    dispatch(REF_GetJersey(data.id));
    dispatch(REF_GetDistance(data.id));
    dispatch(REF_GetNationality());
    dispatch(REF_GetProvince());
    dispatch(REF_GetCity(dataUser.propinsiid));
    dispatch(REF_GetDistrict(dataUser.kotakabid));
    dispatch(REF_GetSubDistrict(dataUser.kecamatanid));
    // dispatch(REF_GetOption(data.id));
  }, [data.id]);

  useEffect(() => {
    setAddOn(dataAdd);
    setRefQuestion(Question);
  }, [Question, dataAdd]);

  const onChange = e => {
    const temp = {
      ...val,
      ...e,
    };
    setVal(temp);
  };

  const splitStr = e => {
    const temp = e.split('|');
    const mapping = temp.map(v => {
      return {
        label: v,
        value: v,
      };
    });
    return mapping;
  };

  const addOnOption = e => {
    const mapping = e?.map(v => {
      return {
        label:
          v.quota !== '0'
            ? v.size + ` (${v.quota} pcs)`
            : v.size + ' (SOLD OUT)',
        value: v.size_id,
      };
    });
    return mapping;
  };

  const onChangeSize = (e, i) => {
    const temp = addOn.map(v => {
      const mapping = {
        ...v,
        size_id: v.add_on_package === i ? e.size_id : v.size_id,
      };
      return mapping;
    });
    setAddOn(temp);
  };

  const onChangeQty = (e, i, availSize) => {
    const temp = addOn.map(v => {
      const mapping = {
        ...v,
        qty: v.add_on_package === i ? e.qty : v.qty,
      };
      return mapping;
    });
    const filter = temp.filter(item => {
      return item.add_on_package === i;
    });
    const filterValidate = availSize.filter(item => {
      return item.size_id === filter[0].size_id;
    });
    if (Number(filterValidate[0]?.quota) < Number(e.qty)) {
      alert('Jumlah pesanan melebihi kuota');
      const temp2 = addOn.map(v => {
        const mapping = {
          ...v,
          qty: v.add_on_package === i ? filterValidate[0]?.quota : v.qty,
        };
        return mapping;
      });
      console.log({filterValidate, e, temp2});
      setAddOn(temp2);
    } else {
      setAddOn(temp);
    }
  };

  const onChangeCategory = e => {
    dispatch(REF_GetCategory(data.id, e));
  };

  const onChangeOption = e => {
    dispatch(REF_GetOption(data.id, val.distance_id, e));
  };

  const onChangeAdditional = (e, i) => {
    const temp = refQuestion.map(v => {
      const mapping = {
        ...v,
        answer: v.id === i ? e.answer : v.answer,
      };
      return mapping;
    });
    setRefQuestion(temp);
  };

  const submitRegister = async () => {
    setLoading(true);
    const pertanyaan = refQuestion.map(v => {
      return {
        seq_no: v.seq_no,
        code: v.code,
        short_question: v.short_question,
        question: v.question,
        jawaban: v.answer,
      };
    });

    const size = addOn
      .filter(v => {
        return v.size_id !== '' && v.qty !== '';
      })
      .map(item => {
        const sizeAddOn = item.size.filter(temp => {
          return temp.size_id === item.size_id;
        });
        return {
          addon_id: sizeAddOn[0].addon_id,
          size_id: item.size_id,
          size_addon: sizeAddOn[0].size,
          qty: item.qty,
          price: item.price,
        };
      });
    const payload = {
      ...val,
      voucher_code: val.voucher_code || '-',
      disease: val.disease || '-',
      event_id: data.id,
      pertanyaan,
      size,
      userid: dataUser.name,
      email_pendaftar: dataUser.email,
      email_peserta: val.email || '-',
    };

    if (
      !payload.distance_id ||
      !payload.category_id ||
      !payload.option_id ||
      !payload.jersey_id
    ) {
      setLoading(false);
      return alert('Silahkan isi semua form');
    }

    const validate = await voucherValidate(
      data.id,
      payload.distance_id,
      payload.category_id,
      payload.option_id,
    );

    let check = '';
    let setupPrice = null;
    if (val.voucher_code) {
      check = await voucherCheck(val.voucher_code, dataUser.email);
    }

    const price = await checkPrice(
      data.id,
      payload.distance_id,
      payload.category_id,
      payload.option_id,
    );
    const now = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');

    if (
      now > price.start_period_earlybird &&
      now < price.end_period_earlybird
    ) {
      setupPrice = Number(price.earlybird_price);
    }

    if (validate.validation === 'WAJIB VOUCHER' && !val.voucher_code) {
      return alert(validate.message);
    }

    try {
      const res = await axios.post(
        'https://imtiket.com/rest_api/rest-server/registrasi',
        payload,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.data.status === true) {
        const id = res.data.generate_id;
        navigation.navigate('Payment', {
          data: val,
          addOns: addOn,
          addQuestionn: refQuestion,
          id: id,
          event_name: data.eventname,
          discount_voucher: check.message === 'Voucher ada' ? check.count : '',
          setupPrice: setupPrice,
        });
      }
    } catch (e) {
      console.log({e: e});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const voucherValidate = async (event, distance, category, option) => {
    try {
      const res = await axios.get(
        `https://imtiket.com/rest_api/rest-server/Voucher/cekVoucher?event_id=${event}&distance_id=${distance}&category_id=${category}&option_id=${option}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.status === 200) {
        const result = {
          validation: res.data.data[0].voucher_validation,
          message: res.data.message,
        };

        return result;
      }
    } catch (e) {
      console.log({e: e});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const checkPrice = async (event, distance, category, option) => {
    try {
      const res = await axios.get(
        `https://imtiket.com/rest_api/rest-server/Earlybird/getEarlybird?event_id=${event}&distance_id=${distance}&category_id=${category}&option_id=${option}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.status === 200) {
        const result = res.data.data[0];

        return result;
      }
    } catch (e) {
      console.log({e: e});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const checkingEmail = () => {
    dispatch(CekEmail(val.email));
  };

  const voucherCheck = async (voucher, email) => {
    try {
      const res = await axios.get(
        `https://imtiket.com/rest_api/rest-server/Voucher/getDiscVoucher?voucher_code=${voucher}&email=${email}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({res});
      if (res.data.message === 'Voucher ada') {
        const result = {
          message: res.data.message,
          count: res.data.data[0],
        };

        return result;
      }
    } catch (e) {
      console.log({e: e});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <NotifHeader label={t('common:eventregister')} />
      <View style={styles.line} />
      <ScrollView style={styles.scroll}>
        {methodRegist === 'Orang Lain' && (
          <>
            <InputCustom
              type="email"
              label="Email Peserta"
              keyJson="email"
              onChange={text => onChange(text)}
              value={val.email}
              style={{
                label: styles.label,
                input: styles.input,
                view: styles.view,
              }}
            />
            <InputCustom
              type="fullname"
              label="Name"
              keyJson="Name"
              // onChange={text => onChange(text)}
              value={dataEmail.name}
              disabled={true}
              style={{
                label: styles.label,
                input: styles.inputDisabled,
                view: styles.view,
              }}
            />
            <InputCustom
              type="email"
              label="No. Handphone"
              keyJson="no_hp"
              onChange={text => onChange(text)}
              value={dataEmail.notelp}
              disabled={true}
              // keyboardType="email-address"
              style={{
                label: styles.label,
                input: styles.inputDisabled,
                view: styles.view,
              }}
            />
            <ButtonCustom
              label="Cek Email"
              onClick={() => checkingEmail()}
              // disabled={disabled}
              style={{
                button: styles.buttonEmail,
                text: styles.login,
              }}
            />
          </>
        )}
        <InputCustom
          type="email"
          label="Email"
          keyJson="email"
          onChange={text => onChange(text)}
          value={dataUser.email}
          disabled={true}
          // keyboardType="email-address"
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="email"
          label="Participant Name"
          keyJson="email"
          onChange={text => onChange(text)}
          value={dataUser.name}
          disabled={true}
          // keyboardType="email-address"
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="email"
          label="Identity"
          keyJson="email"
          onChange={text => onChange(text)}
          value={dataUser.jenis_id}
          disabled={true}
          // keyboardType="email-address"
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="email"
          label="Identity No."
          keyJson="email"
          onChange={text => onChange(text)}
          value={dataUser.NoId}
          disabled={true}
          // keyboardType="email-address"
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <SelectCustom
          label={'Gender'}
          placeholders={'Select Gender'}
          keyJson="gender"
          onChange={text => onChange(text)}
          value={dataUser.gender}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
          item={[
            {label: 'Female', value: '0'},
            {label: 'Male', value: '1'},
          ]}
        />
        <InputCustom
          type="email"
          label="Mobile Number"
          keyJson="email"
          onChange={text => onChange(text)}
          value={dataUser.notelp}
          disabled={true}
          // keyboardType="email-address"
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="email"
          label="Birthday"
          keyJson="email"
          onChange={text => onChange(text)}
          value={dataUser.dob}
          disabled={true}
          // keyboardType="email-address"
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <SelectCustom
          label={'Nationality'}
          placeholders={'Select Nationality'}
          keyJson="nationid"
          onChange={text => onChange(text)}
          value={dataUser.nation_id}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
          item={nationality}
        />
        <SelectCustom
          label={'Province'}
          placeholders={'Select Province'}
          keyJson="provinceid"
          onChange={onChange}
          value={dataUser.propinsiid}
          // onChangeParam={onChangeProv}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
          item={province}
        />
        <SelectCustom
          label={'City'}
          placeholders={'Kota / Kabupaten'}
          keyJson="cityid"
          onChange={onChange}
          // onChangeParam={onChangeCity}
          value={dataUser.kotakabid}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
          item={city}
        />
        <SelectCustom
          label={'District'}
          placeholders={'Kecamatan'}
          keyJson="subdistrictid"
          onChange={onChange}
          // onChangeParam={onChangeDistrict}
          value={dataUser.kecamatanid}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
          item={district}
        />
        <SelectCustom
          label={'Sub District'}
          placeholders={'Kelurahan / Desa'}
          keyJson="kelurahanid"
          onChange={onChange}
          // onChangeParam={onChangeSubDistrict}
          value={dataUser.kelurahanid}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
          item={subDistrict}
        />
        <InputCustom
          type="address"
          label="Address"
          keyJson="address"
          onChange={text => onChange(text)}
          value={dataUser.address}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.addressDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:community')}
          keyJson="community"
          // onChange={text => onChange(text)}
          disabled={true}
          value={data.eventname}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <SelectCustom
          label={'Blood Type'}
          placeholders={'Select Blood Type'}
          keyJson="goldarah"
          onChange={text => onChange(text)}
          value={dataUser.goldarah}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
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
          type="fullname"
          label="Emergency Name"
          keyJson="emergencyname"
          onChange={text => onChange(text)}
          value={dataUser.emergencyname}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <SelectCustom
          label={'Relationship'}
          placeholders={'Select Relationship'}
          keyJson="emergencyrelationship"
          onChange={text => onChange(text)}
          value={dataUser.emergencyrelationship}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
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
        <InputCustom
          type="phone"
          label="Emergency Mobile Number"
          keyboardType="phone-pad"
          keyJson="emergencyphone"
          onChange={text => onChange(text)}
          value={dataUser.emergencyphone}
          disabled={true}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <SelectCustom
          label={t('common:distance')}
          placeholders={t('common:selectdistance')}
          keyJson="distance_id"
          onChange={text => onChange(text)}
          onChangeParam={e => onChangeCategory(e)}
          value={val.distance_id}
          disabled={
            !dataEmail.name && methodRegist === 'Orang Lain' ? true : false
          }
          style={{
            label: styles.label,
            input:
              !dataEmail.name && methodRegist === 'Orang Lain'
                ? styles.input
                : styles.inputDisabled,
            view: styles.view,
          }}
          item={refDistance}
        />
        <SelectCustom
          label={t('common:category')}
          placeholders={t('common:selectcategory')}
          keyJson="category_id"
          onChange={text => onChange(text)}
          onChangeParam={e => onChangeOption(e)}
          value={val.category_id}
          disabled={
            !dataEmail.name && methodRegist === 'Orang Lain' ? true : false
          }
          style={{
            label: styles.label,
            input:
              !dataEmail.name && methodRegist === 'Orang Lain'
                ? styles.input
                : styles.inputDisabled,
            view: styles.view,
          }}
          item={refCategory}
        />
        <SelectCustom
          label={t('common:option')}
          placeholders={t('common:selectoption')}
          keyJson="option_id"
          onChange={text => onChange(text)}
          value={val.option_id}
          disabled={
            !dataEmail.name && methodRegist === 'Orang Lain' ? true : false
          }
          style={{
            label: styles.label,
            input:
              !dataEmail.name && methodRegist === 'Orang Lain'
                ? styles.input
                : styles.inputDisabled,
            view: styles.view,
          }}
          item={refOption}
        />
        <SelectCustom
          label={t('common:jersey')}
          placeholders={t('common:selectjersey')}
          keyJson="jersey_id"
          onChange={text => onChange(text)}
          value={val.jersey_id}
          disabled={
            !dataEmail.name && methodRegist === 'Orang Lain' ? true : false
          }
          style={{
            label: styles.label,
            input:
              !dataEmail.name && methodRegist === 'Orang Lain'
                ? styles.input
                : styles.inputDisabled,
            view: styles.view,
          }}
          item={refJersey}
        />
        <InputCustom
          type="address"
          label={t('common:diseasehistory')}
          keyJson="disease"
          onChange={text => onChange(text)}
          value={val.disease}
          style={{
            label: styles.label,
            input:
              !dataEmail.name && methodRegist === 'Orang Lain'
                ? styles.addressDisabled
                : styles.address,
            view: styles.view,
          }}
        />
        <FlatList
          data={Question.length > 0 ? refQuestion : []}
          renderItem={({item, index}) => (
            <>
              {item.type === 'text' ? (
                <InputCustom
                  type="fullname"
                  label={`${index + 1}. ${item.question}`}
                  keyJson="answer"
                  onChange={text => onChangeAdditional(text, item.id)}
                  value={item.answer}
                  disabled={
                    !dataEmail.name && methodRegist === 'Orang Lain'
                      ? true
                      : false
                  }
                  style={{
                    label: styles.label,
                    input:
                      !dataEmail.name && methodRegist === 'Orang Lain'
                        ? styles.input
                        : styles.inputDisabled,
                    view: styles.view,
                  }}
                />
              ) : item.type === 'combobox' ? (
                <SelectCustom
                  label={`${index + 1}. ${item.question}`}
                  placeholders={`Pilih ${item.question}`}
                  keyJson="answer"
                  onChange={text => onChangeAdditional(text, item.id)}
                  value={item.answer}
                  disabled={
                    !dataEmail.name && methodRegist === 'Orang Lain'
                      ? true
                      : false
                  }
                  style={{
                    label: styles.label,
                    input:
                      !dataEmail.name && methodRegist === 'Orang Lain'
                        ? styles.input
                        : styles.inputDisabled,
                    view: styles.view,
                  }}
                  item={splitStr(item.jawaban)}
                />
              ) : null}
            </>
          )}
          keyExtractor={item => item.id}
          // refreshing={loading}
        />
        <FlatList
          data={dataAdd.length > 0 ? addOn : []}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginBottom: 20}}
          renderItem={({item}) => (
            <View style={styles.row}>
              <View style={styles.viewImage}>
                <Image
                  resizeMode="contain"
                  style={styles.postPic}
                  source={{
                    uri: item.image,
                  }}
                />
                <Text style={styles.text}>{item.add_on_package}</Text>
              </View>
              <View style={styles.size}>
                <SelectCustom
                  label="Size"
                  placeholders="Select Size"
                  keyJson="size_id"
                  onChange={text => onChangeSize(text, item.add_on_package)}
                  value={item.size_id}
                  disabled={
                    !dataEmail.name && methodRegist === 'Orang Lain'
                      ? true
                      : false
                  }
                  style={{
                    label: styles.label,
                    input:
                      !dataEmail.name && methodRegist === 'Orang Lain'
                        ? styles.input
                        : styles.inputDisabled,
                    view: styles.view,
                  }}
                  item={addOnOption(item.size)}
                />
                <SelectCustom
                  label="Qty"
                  placeholders="Select Qty"
                  keyJson="qty"
                  onChange={text =>
                    onChangeQty(text, item.add_on_package, item.size)
                  }
                  value={item.qty}
                  disabled={
                    !dataEmail.name && methodRegist === 'Orang Lain'
                      ? true
                      : false
                  }
                  style={{
                    label: styles.label,
                    input:
                      !dataEmail.name && methodRegist === 'Orang Lain'
                        ? styles.input
                        : styles.inputDisabled,
                    view: styles.view,
                  }}
                  item={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                    {label: '3', value: '3'},
                  ]}
                />
                {/* <InputCustom
                  label="Qty"
                  placeholders="Select Qty"
                  keyJson="qty"
                  onChange={text =>
                    onChangeQty(text, item.add_on_package, item.size)
                  }
                  value={item.qty}
                  style={{
                    label: styles.label,
                    input: styles.input,
                    view: styles.view,
                  }}
                /> */}
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          // refreshing={loading}
        />
        <InputCustom
          type="fullname"
          label="Voucher"
          keyJson="voucher_code"
          onChange={text => onChange(text)}
          value={val.voucher_code}
          disabled={
            !dataEmail.name && methodRegist === 'Orang Lain' ? true : false
          }
          style={{
            label: styles.label,
            input:
              !dataEmail.name && methodRegist === 'Orang Lain'
                ? styles.inputDisabled
                : styles.input,
            view: styles.view,
          }}
        />
        {/* <ButtonCustom
            label={t('common:activate')}
            // onClick={() => loginEmail()}
            disabled={loading}
            style={{
              button: styles.buttonEmail,
              text: styles.login,
            }}
          /> */}
        <ButtonCustom
          label="Register"
          disabled={
            (!dataEmail.name && methodRegist === 'Orang Lain') || loading
              ? true
              : false
          }
          onClick={
            () => submitRegister()
            // navigation.navigate('Payment', {
            //   data: val,
            //   addOns: addOn,
            //   addQuestionn: refQuestion,
            // })
          }
          // disabled={disabled}
          style={{
            button:
              (!dataEmail.name && methodRegist === 'Orang Lain') || loading
                ? styles.buttonLoading
                : styles.buttonLogin,
            text: styles.login,
          }}
        />
      </ScrollView>
      {/* <ModalCustom
          visible={
            refQuestion.length === 0 && addOn.length === 0 ? true : false
          }
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputDisabled: {
    height: 35,
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
    backgroundColor: '#E9ECEF',
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
  view: {
    marginBottom: 10,
  },
  address: {
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
  },
  addressDisabled: {
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
    backgroundColor: '#E9ECEF',
  },
  postPic: {
    // resizeMode: 'cover',
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
    marginTop: 10,
    padding: 13,
    borderRadius: 10,
  },
  buttonLoading: {
    width: '100%',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
    padding: 13,
    borderRadius: 10,
  },
  buttonEmail: {
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginTop: 10,
    padding: 13,
    borderRadius: 10,
    marginBottom: 20,
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});
