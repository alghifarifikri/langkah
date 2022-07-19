/* eslint-disable no-sparse-arrays */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputCustom from '../../../Component/Form/InputCustom';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import NotifHeader from '../../../Component/Global/NotifHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {DataJourney} from '../../../Redux/Action';
import {useNavigation} from '@react-navigation/native';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function NewPost() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataUser = useSelector(state => state.Profile.data);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  // const [uri, setUri] = useState(null);
  const [caption, setCaption] = useState('');

  const handleChoosePhoto = () => {
    setLoading(true);
    launchImageLibrary({noData: true}, response => {
      if (response) {
        const body = {
          name: response.assets?.[0].fileName,
          type: response.assets?.[0].type,
          uri:
            Platform.OS === 'ios'
              ? response.assets?.[0].uri.replace('file://', '')
              : response.assets?.[0].uri,
        };
        cloudinaryUpload(body);
      }
    });
  };

  const cloudinaryUpload = async param => {
    const data = new FormData();
    data.append('file', param);
    data.append('upload_preset', 'jxhnf6wl');
    data.append('cloud_name', 'dhmfr5tzu');

    try {
      fetch('https://api.cloudinary.com/v1_1/dhmfr5tzu/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(response => {
          if (response) {
            console.log({response});
            setPhoto(response.secure_url);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log({err});
          setLoading(false);
        });
      // const result = await axios.post(
      //   'https://api.cloudinary.com/v1_1/dhmfr5tzu/upload',
      //   {
      //     body: data,
      //   },
      // );
      // console.log({result});
    } catch (e) {
      console.log({e: e.response});
    }
  };

  const posting = async () => {
    try {
      const body = {
        title: '',
        description: caption.caption,
        picture_path: photo,
        email: dataUser.email,
      };
      if (!body.picture_path) {
        return Alert.alert('Posting Gagal', 'Uplaod Foto Terlebih Dahulu', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ,
        ]);
      }
      const res = await axios.post(
        'https://imtiket.com/rest_api/rest-server/journey',
        body,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      console.log({res, body, dataUser});
      if (res.data.status === true) {
        dispatch(DataJourney(dataUser.email));
        navigation.navigate('Tab');
      }
    } catch (e) {
      console.log({e: e});
    }
  };

  return (
    <View style={styles.container}>
      <NotifHeader label="" />
      <ScrollView>
        {photo ? (
          <TouchableOpacity style={styles.image} onPress={handleChoosePhoto}>
            <Image
              style={styles.postPic}
              source={{
                uri: photo,
              }}
            />
          </TouchableOpacity>
        ) : loading ? (
          <ActivityIndicator size="large" color="#F65431" />
        ) : (
          <TouchableOpacity style={styles.upload} onPress={handleChoosePhoto}>
            <AntDesign name="upload" color={'grey'} size={23} />
            <Text style={styles.text}>Upload Photo</Text>
          </TouchableOpacity>
        )}
        <View style={styles.caption}>
          <InputCustom
            type="address"
            label=""
            placeholder="Tulis Caption"
            keyJson="caption"
            onChange={text => setCaption(text)}
            value={caption}
            style={{
              label: {},
              input: styles.address,
              view: styles.view,
            }}
          />
        </View>
        <View style={styles.row}>
          <ButtonCustom
            label="Posting"
            disabled={loading}
            onClick={() => posting()}
            style={{
              button: loading ? styles.buttonLoading : styles.buttonSection,
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
  upload: {
    backgroundColor: '#F4F4F4',
    width: '50%',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: 'grey',
    flexDirection: 'row',
    margin: 15,
    padding: 10,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    alignSelf: 'center',
    margin: 50,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    marginLeft: 15,
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    color: 'grey',
    marginLeft: 10,
  },
  view: {
    marginBottom: 10,
  },
  address: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    color: '#000000',
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonLoading: {
    width: '35%',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  buttonSection: {
    width: '35%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  postPic: {
    resizeMode: 'cover',
    width: '100%',
    height: 250 * ratio,
    borderRadius: 20,
  },
});
