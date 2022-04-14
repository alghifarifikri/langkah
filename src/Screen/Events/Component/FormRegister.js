import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import InputCustom from '../../../Component/Form/InputCustom';
import NotifHeader from '../../../Component/Global/NotifHeader';
import SelectCustom from '../../../Component/Form/SelectCustom';
import ButtonCustom from '../../../Component/Form/ButtonCustom';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function FormRegister({route, navigation}) {
  const {methodRegist} = route?.params;
  const {t} = useTranslation();
  const addOn = [
    {
      type: 'FOLDING BAG',
      url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/14FFE1A1-46D8-46F2-A01F-BD9ADE25E56F.png',
    },
    {
      type: 'TOPI',
      url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/115D2D74-D74A-4C84-8601-E120CDD1BC4D.png',
    },
    {
      type: 'MASK',
      url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/mask.png',
    },
    {
      type: 'SUNGLASSES',
      url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/4329FFC5-920F-4FE8-8D8E-F5E364CC460A.jpg',
    },
  ];
  return (
    <View style={styles.container}>
      <NotifHeader label={t('common:eventregister')} />
      <View style={styles.line} />
      <ScrollView style={styles.scroll}>
        {methodRegist === 'Orang Lain' && (
          <>
            <InputCustom
              type="email"
              label="Email"
              keyJson="email"
              //   onChange={text => onChange(text)}
              //   value={val.email}
              keyboardType="email-address"
              style={{
                label: styles.label,
                input: styles.input,
                view: styles.view,
              }}
            />
            <ButtonCustom
              label="Cek Email"
              // onClick={() => loginEmail()}
              // disabled={disabled}
              style={{
                button: styles.buttonEmail,
                text: styles.login,
              }}
            />
          </>
        )}
        <InputCustom
          type="fullname"
          label={t('common:community')}
          keyJson="community"
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
        <SelectCustom
          label={t('common:distance')}
          placeholders={t('common:selectdistance')}
          keyJson="distance"
          // onChange={text => onChange(text)}
          // value={val.gender}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
          item={[
            {label: '5K', value: '5'},
            {label: '10K', value: '10'},
            {label: '21K', value: '21'},
          ]}
        />
        <SelectCustom
          label={t('common:category')}
          placeholders={t('common:selectcategory')}
          keyJson="category"
          // onChange={text => onChange(text)}
          // value={val.gender}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
          item={[
            {label: 'PELAJAR', value: 'PELAJAR'},
            {label: 'UMUM', value: 'UMUM'},
          ]}
        />
        <SelectCustom
          label={t('common:option')}
          placeholders={t('common:selectoption')}
          keyJson="option"
          // onChange={text => onChange(text)}
          // value={val.gender}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
          item={[
            {label: 'SMALL', value: 'SMALL'},
            {label: 'MEDIUM', value: 'MEDIUM'},
            {label: 'FULL', value: 'FULL'},
            {label: 'MEDAL ONLY', value: 'MEDAL ONLY'},
          ]}
        />
        <SelectCustom
          label={t('common:jersey')}
          placeholders={t('common:selectjersey')}
          keyJson="jersey"
          // onChange={text => onChange(text)}
          // value={val.gender}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
          item={[
            {label: 'S', value: 'S'},
            {label: 'M', value: 'M'},
            {label: 'L', value: 'L'},
            {label: 'XL', value: 'XL'},
            {label: '2XL', value: '2XL'},
            {label: 'L KIDS', value: 'L KIDS'},
          ]}
        />
        <InputCustom
          type="address"
          label={t('common:diseasehistory')}
          keyJson="address"
          // onChange={text => onChange(text)}
          // value={val.address}
          style={{
            label: styles.label,
            input: styles.address,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={'Darimana dapat info event ini?'}
          keyJson="community"
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
        <FlatList
          data={addOn}
          renderItem={({item}) => (
            <View style={styles.row}>
              <View style={styles.viewImage}>
                <Image
                  style={styles.postPic}
                  source={{
                    uri: item.url,
                  }}
                />
                <Text style={styles.text}>{item.type}</Text>
              </View>
              <View style={styles.size}>
                <SelectCustom
                  label="Size"
                  placeholders="Select Size"
                  keyJson="category"
                  // onChange={text => onChange(text)}
                  // value={val.gender}
                  style={{
                    label: styles.label,
                    input: styles.input,
                    view: styles.view,
                  }}
                  item={[
                    {label: 'S', value: 'S'},
                    {label: 'M', value: 'M'},
                    {label: 'L', value: 'L'},
                    {label: 'XL', value: 'XL'},
                  ]}
                />
                <SelectCustom
                  label="Qty"
                  placeholders="Select Qty"
                  keyJson="category"
                  // onChange={text => onChange(text)}
                  // value={val.gender}
                  style={{
                    label: styles.label,
                    input: styles.input,
                    view: styles.view,
                  }}
                  item={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                    {label: '3', value: '3'},
                    {label: '4', value: '4'},
                    {label: '5', value: '5'},
                  ]}
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
          // refreshing={loading}
        />
        <ButtonCustom
          label="Submit"
          onClick={() => navigation.navigate('Payment')}
          // disabled={disabled}
          style={{
            button: styles.buttonLogin,
            text: styles.login,
          }}
        />
      </ScrollView>
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
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    padding: 13,
    borderRadius: 10,
  },
  buttonEmail: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
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
