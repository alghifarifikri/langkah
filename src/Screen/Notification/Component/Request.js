import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';

export default function Request({data}) {
  const {t} = useTranslation();
  return (
    <View style={styles.request}>
      <View>
        <Image
          style={styles.picProfile}
          source={{
            uri: 'https://cdn.idntimes.com/content-images/community/2020/08/naruto-seventh-hokage-wallpaper23-2251a98e7b1c9412075c372515d65633_600x400.jpg',
          }}
        />
        <Image
          style={styles.picProfile2}
          source={{
            uri: 'https://cdn.idntimes.com/content-images/community/2020/08/naruto-seventh-hokage-wallpaper23-2251a98e7b1c9412075c372515d65633_600x400.jpg',
          }}
        />
      </View>
      <View style={styles.viewText}>
        <Text style={styles.firstText}>{t('common:request')}</Text>
        <Text style={styles.secondText}>
          {data[0].email_follower} + {data.length - 1} {t('common:others')}
        </Text>
      </View>
      <TouchableOpacity style={styles.icon}>
        <Entypo name="dot-single" color={'#F65431'} size={23} />
        <FontAwesome name="chevron-right" color={'#000000'} size={23} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 'auto',
    flexDirection: 'row',
    marginTop: 15,
  },
  request: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  picProfile: {
    borderRadius: 100,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  picProfile2: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    width: 40,
    height: 40,
    marginTop: -25,
    marginLeft: 10,
  },
  viewText: {
    marginLeft: 10,
    marginTop: 7,
  },
  firstText: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
  },
  secondText: {
    fontSize: 12,
    marginTop: 2,
    color: 'grey',
  },
});
