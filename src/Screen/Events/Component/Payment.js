import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import InputCustom from '../../../Component/Form/InputCustom';
import NotifHeader from '../../../Component/Global/NotifHeader';
import SelectCustom from '../../../Component/Form/SelectCustom';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {Checkbox, List} from 'react-native-paper';

const win = Dimensions.get('window');
const ratio = win.width / 541;

const addOn = [
  {
    type: 'FOLDING BAG',
    url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/14FFE1A1-46D8-46F2-A01F-BD9ADE25E56F.png',
    size: 'XL',
    qty: 1,
    price: 25000,
  },
  {
    type: 'TOPI',
    url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/115D2D74-D74A-4C84-8601-E120CDD1BC4D.png',
    size: 'XL',
    qty: 1,
    price: 25000,
  },
  {
    type: 'MASK',
    url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/mask.png',
    size: 'XL',
    qty: 1,
    price: 25000,
  },
  {
    type: 'SUNGLASSES',
    url: 'https://imtiket.com/IMRR_DEV2/uploads/addons/4329FFC5-920F-4FE8-8D8E-F5E364CC460A.jpg',
    size: 'XL',
    qty: 1,
    price: 25000,
  },
];

export default function Payment({route, navigation}) {
  //   const {methodRegist} = route?.params;
  const [checked, setChecked] = useState(false);
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <NotifHeader label={t('common:payment')} />
      <View style={styles.line} />
      <ScrollView style={styles.scroll}>
        <InputCustom
          type="fullname"
          label={'Order ID'}
          keyJson="order_id"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={'No Reg'}
          keyJson="no_reg"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:name')}
          keyJson="name"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={'Email'}
          keyJson="email"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:distance')}
          keyJson="distance"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:category')}
          keyJson="category"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:option')}
          keyJson="option"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <FlatList
          data={addOn}
          renderItem={({item}) => (
            <List.Section>
              <List.Accordion
                title={item.type}
                style={styles.content}
                left={() => (
                  <Image
                    style={styles.picProfile}
                    source={{
                      uri: item.url,
                    }}
                  />
                )}>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Size ({item.size})</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Qty ({item.qty})</Text>
                </View>
                <View style={styles.headCard}>
                  <Text style={styles.textName}>Price ({item.price})</Text>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          keyExtractor={item => item.id}
          // refreshing={loading}
        />
        <InputCustom
          type="fullname"
          label="Voucher"
          keyJson="voucher"
          //   onChange={text => onChange(text)}
          //   value={val.email}
          style={{
            label: styles.label,
            input: styles.input,
            view: styles.view,
          }}
        />
        <ButtonCustom
          label={t('common:activate')}
          // onClick={() => loginEmail()}
          // disabled={disabled}
          style={{
            button: styles.buttonEmail,
            text: styles.login,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:eventfee')}
          keyJson="eventfee"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:adminfeeevent')}
          keyJson="adminfeeevent"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={'Add On'}
          keyJson="addOn"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:adminfeeaddon')}
          keyJson="adminfeeaddon"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:shippingfee')}
          keyJson="shippingfee"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:totaladminfee')}
          keyJson="totaladminfee"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:totalamount')}
          keyJson="totalamount"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:discount')}
          keyJson="discount"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
        <InputCustom
          type="fullname"
          label={t('common:grandtotal')}
          keyJson="grandtotal"
          disabled={true}
          // onChange={text => onChange(text)}
          // value={val.name}
          style={{
            label: styles.label,
            input: styles.inputDisabled,
            view: styles.view,
          }}
        />
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
        <View>
          <ButtonCustom
            label={t('common:register')}
            disabled={!checked}
            // onClick={() => signUpMember()}
            style={{
              button: checked ? styles.buttonLogin : styles.buttonLoading,
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
  buttonLoading: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: 'grey',
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
