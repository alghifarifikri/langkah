import {View, Modal, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import SelectCustom from '../../../Component/Form/SelectCustom';
import {useTranslation} from 'react-i18next';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {useNavigation} from '@react-navigation/native';

export default function KolektifModal({
  visible = false,
  handleVisible = () => {},
  data = {},
}) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [val, setVal] = useState('');

  const onChange = value => {
    setVal(value);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modal}>
        <View style={styles.content}>
          <SelectCustom
            label={t('common:registermethod')}
            placeholders={'Pilih Jenis Daftar'}
            keyJson="methodRegist"
            onChange={text => onChange(text)}
            value={val.methodRegist}
            style={{
              label: styles.label,
              input: styles.input,
              view: styles.view,
            }}
            item={[
              {label: '2 Orang', value: '2'},
              {label: '3 Orang', value: '3'},
              {label: '4 Orang', value: '4'},
              {label: '5 Orang', value: '5'},
              {label: '6 Orang', value: '6'},
              {label: '7 Orang', value: '7'},
              {label: '8 Orang', value: '8'},
              {label: '9 Orang', value: '9'},
              {label: '10 Orang', value: '10'},
            ]}
          />
          <View style={styles.row}>
            <ButtonCustom
              label="Cancel"
              onClick={() => handleVisible(false, 'kolektif')}
              style={{button: styles.buttonCancel, text: styles.cancel}}
            />
            <ButtonCustom
              label="Register"
              onClick={() => {
                handleVisible(false, 'kolektif');
                navigation.navigate('FormFamily', {
                  methodRegist: 'kolektif',
                  data: data,
                  paramId: val.methodRegist,
                  dataVal: {},
                });
                setVal({});
              }}
              style={{
                button: styles.buttonSection,
                text: styles.login,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  view: {
    marginBottom: 10,
  },
  input: {
    height: 35,
    borderBottomWidth: 1,
    marginTop: -5,
    color: '#000000',
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  cancel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonSection: {
    width: '40%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
  },
  buttonCancel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    width: '40%',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
  },
});
