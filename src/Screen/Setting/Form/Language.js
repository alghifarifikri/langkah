import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import HeaderSetting from '../../../Component/Global/HeaderSetting';
import {useTranslation} from 'react-i18next';

const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'id', label: 'Indonesian'},
];

export default function Language({label = '', onBack = () => {}}) {
  const {t, i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  return (
    <View>
      <HeaderSetting label={t('common:language')} onBack={onBack} />
      <View style={styles.line} />
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.textColor}>English</Text>
        </View>
        <View style={styles.marginLeft}>
          <RadioButton
            value={selectedLanguageCode}
            status={selectedLanguageCode === 'en' ? 'checked' : 'unchecked'}
            onPress={() => setLanguage('en')}
          />
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={styles.textColor}>Indonesian</Text>
        </View>
        <View style={styles.marginLeft}>
          <RadioButton
            value={selectedLanguageCode}
            status={selectedLanguageCode === 'id' ? 'checked' : 'unchecked'}
            onPress={() => setLanguage('id')}
          />
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  marginLeft: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  textColor: {
    color: '#000000',
  },
});
