/* eslint-disable react-hooks/exhaustive-deps */
import {WebView} from 'react-native-webview';
import {
  BackHandler,
  Alert,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HEADER_MIDTRANS, URL_MIDTRANS_STATUS} from '../../../Utils/Url';
import axios from 'axios';
import ModalCustom from '../../../Component/Form/ModalCustom';

const Midtrans = ({route, navigation}) => {
  const {redirect_url, order_id} = route?.params;
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await axios.get(URL_MIDTRANS_STATUS + order_id + '/status', {
        headers: HEADER_MIDTRANS,
      });
      console.log({res});
      if (res.data.status_code === '200') {
        if (res.data.transaction_status === 'settlement') {
          navigation.navigate('Thanks', {order_id: order_id});
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      console.log({e: e});
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const backAction = async () => {
    const cek = await refresh();
    if (cek === false) {
      Alert.alert('Ingin Kembali ?', 'Selesaikan Pembayaran Terlebih Dahulu', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Events'),
          style: 'cancel',
        },
        // {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
    }
    // navigation.navigate('Tab');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  // return <WebView source={{uri: redirect_url}} />;
  return (
    <ScrollView
      accessibilityLabel="BannerDetailView"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            refresh();
          }}
        />
      }>
      {/* {loading ? (
        <ModalCustom visible={loading} />
      ) : (
        <WebView
          // ref={webref => (web = webref)}
          source={{uri: redirect_url}}
        />
      )} */}
      <WebView
        // ref={webref => (web = webref)}
        source={{uri: redirect_url}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonLogin: {
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 30,
    padding: 13,
    borderRadius: 10,
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Midtrans;
