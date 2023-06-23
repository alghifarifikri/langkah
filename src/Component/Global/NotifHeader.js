import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export default function NotifHeader({label = ''}) {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={styles.backIcon}>
      {(label === t('common:notification') ||
        label === t('common:settings') ||
        label === t('common:language') ||
        label === t('common:eventregister') ||
        label === t('common:payment') ||
        label === t('common:family') ||
        label === 'Group' ||
        label === '') && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" color={'#000000'} size={23} />
        </TouchableOpacity>
      )}
      <View style={styles.centerText}>
        <Text style={styles.back}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  backIcon: {
    marginTop: 35,
    marginBottom: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  centerText: {
    alignItems: 'center',
    width: '90%',
  },
});
