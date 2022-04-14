import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import NotifHeader from '../../Component/Global/NotifHeader';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SetDataProfile} from '../../Redux/Action/DataProfile';
import Form from './Form';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

export default function Setting() {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;
  const dataUser = useSelector(state => state.Profile.data);
  const navigation = useNavigation();
  const [detail, setDetail] = useState(false);
  const [activeLabel, setActiveLabel] = useState('');
  const [val, setVal] = useState('');
  const more = ['Help & Support', 'Legal', 'About'];

  const dataLabel = [
    {
      label: 'Email',
      value: dataUser.email,
    },
    {
      label: 'Change Password',
      value: '',
    },
    {
      label: 'Language',
      value: selectedLanguageCode === 'en' ? 'English' : 'Indonesian',
    },
    {
      label: 'History Payment',
      value: '',
    },
    {
      label: 'Connected Trackers',
      value: '',
    },
    {
      label: 'Privacy Settings',
      value: '',
    },
    {
      label: 'Notification',
      value: '',
    },
    {
      label: 'Units',
      value: 'Metrics (kilometer)',
    },
    {
      label: 'Restore Purchases',
      value: '',
    },
  ];
  const logout = async () => {
    const type = await AsyncStorage.getItem('loginType');
    if (type === 'facebook') {
      LoginManager.logOut();
    } else if (type === 'google') {
      GoogleSignin.signOut();
    }
    AsyncStorage.removeItem('accessToken');
    dispatch(SetDataProfile({}));
    navigation.navigate('LogIn');
  };

  const handleClick = (flag, label, value) => {
    setActiveLabel(label);
    setDetail(flag);
    setVal(value);
  };

  const handleBack = () => {
    setActiveLabel('');
    setDetail(false);
    setVal('');
  };

  return (
    <View style={styles.container}>
      {detail ? (
        <Form label={activeLabel} val={val} onBack={handleBack} />
      ) : (
        <>
          <NotifHeader label={t('common:settings')} />
          <ScrollView>
            <View style={styles.head}>
              <View>
                <Image
                  style={styles.picProfile}
                  resizeMode="cover"
                  source={{
                    uri:
                      dataUser?.image ||
                      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
                  }}
                />
              </View>
              <View style={styles.username}>
                <Text style={styles.name}>{dataUser.name}</Text>
                <TouchableOpacity style={styles.row}>
                  <Text style={styles.editProfile}>
                    {t('common:editprofile')}
                  </Text>
                  <Entypo
                    name="chevron-thin-right"
                    color={'#8AB4F8'}
                    size={13}
                    style={styles.marginIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.premium}>
              <View>
                <Text style={styles.join}>Join Langkah Plus!</Text>
                <Text style={styles.premiumColor}>Try 30 days for free</Text>
              </View>
              <TouchableOpacity style={styles.rightArrow}>
                <Entypo name="chevron-thin-right" color={'#757575'} size={23} />
              </TouchableOpacity>
            </View>
            <View style={styles.setting}>
              <Text style={styles.settingTitle}>SETTINGS</Text>
            </View>
            {dataLabel.map((item, index) => (
              <View style={styles.premium}>
                <View>
                  <Text style={styles.settingContent}>{item.label}</Text>
                </View>
                <TouchableOpacity
                  style={styles.rightArrow}
                  onPress={() => {
                    item.label === 'Email'
                      ? handleClick(true, item.label, item.value)
                      : item.label === 'Change Password'
                      ? handleClick(true, item.label, '')
                      : item.label === 'Language'
                      ? handleClick(true, item.label, item.value)
                      : null;
                  }}>
                  {item.value ? (
                    <Text style={styles.settingValue}>{item.value}</Text>
                  ) : null}
                  <Entypo
                    name="chevron-thin-right"
                    color={'#757575'}
                    size={23}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.setting}>
              <Text style={styles.settingTitle}>More Info</Text>
            </View>
            {more.map((item, index) => (
              <View style={styles.premium}>
                <View>
                  <Text style={styles.settingContent}>{item}</Text>
                </View>
                <TouchableOpacity style={styles.rightArrow}>
                  <Entypo
                    name="chevron-thin-right"
                    color={'#757575'}
                    size={23}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.setting}>
              <Text style={styles.settingTitle}> </Text>
            </View>
            <View style={styles.logout}>
              <TouchableOpacity onPress={() => logout()}>
                <Text style={styles.settingContent}>Log out</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.delete}>
              <TouchableOpacity>
                <Text style={styles.deleteTitle}> DELETE ACCOUNT </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
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
  head: {
    backgroundColor: '#F1F1F1',
    padding: 15,
    flexDirection: 'row',
  },
  setting: {
    backgroundColor: '#F1F1F1',
    padding: 15,
  },
  delete: {
    backgroundColor: '#F1F1F1',
    padding: 15,
    alignItems: 'center',
  },
  premium: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  },
  logout: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderColor: '#F1F1F1',
    alignItems: 'center',
  },
  picProfile: {
    borderRadius: 100,
    width: width * 0.25,
    height: width * 0.12 * 2.16,
  },
  username: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  name: {
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    fontSize: 16,
  },
  settingTitle: {
    fontWeight: 'bold',
    color: '#757575',
    fontSize: 16,
    marginTop: 10,
    marginBottom: -5,
  },
  deleteTitle: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
  },
  join: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 14,
  },
  settingContent: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 15,
  },
  settingValue: {
    fontWeight: 'bold',
    color: '#757575',
    fontSize: 15,
  },
  editProfile: {
    fontSize: 12,
    color: '#8AB4F8',
  },
  premiumColor: {
    color: '#8AB4F8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  marginIcon: {
    marginTop: 2,
  },
  rightArrow: {
    marginLeft: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 'auto',
  },
});
