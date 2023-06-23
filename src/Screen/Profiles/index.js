/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ProfileHeader from '../../Component/Global/ProfileHeader';
import Progress from './Form/Progress';
import Achievement from './Form/Achievement';
import Ranks from './Form/Ranks';
import {useDispatch, useSelector} from 'react-redux';
import {DataFollowers, DataMilesStones, DataProfile} from '../../Redux/Action';
import {useTranslation} from 'react-i18next';
import ModalCustom from '../../Component/Form/ModalCustom';

const {width} = Dimensions.get('window');
const tab = ['Progress', 'Achievement', 'Ranks'];

export default function Profiles() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const dataUser = useSelector(state => state.Profile.data);
  const loading = useSelector(state => state.Profile.loading);
  const followers = useSelector(state => state.Followers.data);
  const following = followers.filter(item => item.sts_follow === '1');
  const [active, setActive] = useState('Progress');

  useEffect(() => {
    dispatch(DataProfile());
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(DataProfile());
    dispatch(DataFollowers(dataUser.email));
    dispatch(DataMilesStones(dataUser.email));
  }, []);

  console.log({dataUser});

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={styles.line} />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <View style={styles.viewImage}>
          <Image
            style={styles.picProfile}
            resizeMode="cover"
            source={{
              uri:
                dataUser?.image ||
                'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
            }}
          />
          <View style={styles.premiumBox}>
            <Text style={styles.premium}>PREMIUM</Text>
          </View>
          <View style={styles.marginTop}>
            <Text style={styles.name}>{dataUser?.name}</Text>
          </View>
          <View>
            <Text style={styles.bio}>Hello there, I'm {dataUser?.name}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.follow}>
              <View>
                <Text style={styles.desc}>{t('common:following')}</Text>
              </View>
              <View>
                <Text style={styles.count}>{following.length}</Text>
              </View>
            </View>
            <View style={styles.follow2}>
              <View>
                <Text style={styles.desc}>{t('common:followers')}</Text>
              </View>
              <View>
                <Text style={styles.count}>{followers.length}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tab}>
          {tab?.map((item, index) => (
            <TouchableOpacity
              onPress={() => setActive(item)}
              style={active === item ? styles.activeTab : styles.inactiveTab}>
              <Text
                style={active === item ? styles.textActiveTab : styles.textTab}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.tabContent}>
          {active === 'Progress' ? (
            <Progress />
          ) : active === 'Achievement' ? (
            <Achievement />
          ) : (
            <Ranks />
          )}
        </View>
      </ScrollView>
      <ModalCustom visible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 12,
    textTransform: 'none',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonFacebook: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '100%',
    backgroundColor: '#3B5998',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
    borderRadius: 10,
  },
  picProfile: {
    borderRadius: 100,
    width: width * 0.25,
    height: width * 0.12 * 2.16,
  },
  viewImage: {
    alignItems: 'center',
    margin: 20,
  },
  premium: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  premiumBox: {
    backgroundColor: '#30D840',
    borderRadius: 20,
    width: '20%',
    alignItems: 'center',
    padding: 5,
    marginTop: -20,
  },
  marginTop: {
    marginTop: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#000000',
  },
  bio: {
    fontWeight: 'bold',
    color: '#8D8D8D',
    fontSize: 12,
  },
  count: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20,
    alignSelf: 'center',
  },
  desc: {
    color: '#8D8D8D',
    fontSize: 10,
    alignSelf: 'center',
  },
  follow: {
    alignSelf: 'center',
    paddingRight: 30,
    borderRightWidth: 1,
    borderColor: '#A7A7A7',
  },
  follow2: {
    alignSelf: 'center',
    paddingLeft: 30,
  },
  tab: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F3F3',
  },
  inactiveTab: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  activeTab: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: '#F65431',
  },
  textTab: {
    color: '#8D8D8D',
    fontSize: 12,
  },
  textActiveTab: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  tabContent: {
    marginBottom: 20,
  },
});
