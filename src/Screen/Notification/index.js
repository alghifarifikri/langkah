/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import NotifHeader from '../../Component/Global/NotifHeader';
import Request from './Component/Request';
import ButtonCustom from '../../Component/Form/ButtonCustom';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

export default function Notification() {
  const {t} = useTranslation();
  const request = useSelector(state => state.Request.data);
  const notif = useSelector(state => state.Notification.data);

  return (
    <View style={styles.container}>
      <NotifHeader label={t('common:notification')} />
      <View style={styles.line} />
      <ScrollView>
        {request.length > 0 ? (
          <>
            <Request data={request} />
            <View style={styles.line} />
          </>
        ) : null}
        <View style={styles.content}>
          <Text style={styles.text}>{t('common:thisweek')}</Text>
          {notif?.map((item, index) => (
            <View style={styles.headCard}>
              <Image
                style={styles.picProfile}
                source={{
                  uri: 'https://cdn.idntimes.com/content-images/community/2020/08/naruto-seventh-hokage-wallpaper23-2251a98e7b1c9412075c372515d65633_600x400.jpg',
                }}
              />
              <View style={styles.name}>
                <Text style={styles.textName}>{item.email_tujuan}</Text>
                {item.action === 'follow' ? (
                  <Text style={styles.textTime}>
                    {' '}
                    {t('common:started')} {t('common:followingyou')}
                  </Text>
                ) : item.action === 'comment' ? (
                  <Text style={styles.textTime}> {t('common:comment')}</Text>
                ) : (
                  <Text style={styles.textTime}> {t('common:like')}</Text>
                )}
                <Text style={styles.textTime}>5 minutes ago</Text>
              </View>
              {item.action === 'follow' ? (
                <ButtonCustom
                  label={
                    item.following === false
                      ? `${t('common:follow')}`
                      : `${t('common:following')}`
                  }
                  // onClick={() => LogIn()}
                  style={{
                    button:
                      item.following === false
                        ? styles.buttonLogin
                        : styles.buttonFollow,
                    text:
                      item.following === false
                        ? styles.login
                        : styles.following,
                  }}
                />
              ) : (
                <View style={styles.imageView}>
                  <Image
                    style={styles.picContent}
                    source={{
                      uri: 'https://cdn.idntimes.com/content-images/community/2020/08/naruto-seventh-hokage-wallpaper23-2251a98e7b1c9412075c372515d65633_600x400.jpg',
                    }}
                  />
                </View>
              )}
            </View>
          ))}
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
  row: {
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    marginBottom: 10,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  headCard: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  picProfile: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  picContent: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  imageView: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  name: {
    marginLeft: 20,
    marginBottom: 10,
  },
  textName: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
  },
  textTime: {
    fontSize: 11,
    color: 'grey',
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  following: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonLogin: {
    width: '25%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 15,
    padding: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  buttonFollow: {
    width: '25%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    marginBottom: 15,
    padding: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
});
