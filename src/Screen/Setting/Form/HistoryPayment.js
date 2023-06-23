/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import React from 'react';
import HeaderSetting from '../../../Component/Global/HeaderSetting';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalCustom from '../../../Component/Form/ModalCustom';

export default function HistoryPayment({label = '', onBack = () => {}}) {
  const {t} = useTranslation();
  const dataUser = useSelector(state => state.Profile.data);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      setIsLoading(true);
      try {
        const email = dataUser.email;
        const res = await axios.get(
          `https://imtiket.com/rest_api/rest-server/payment/view_payment_history?email=${email}`,
          {
            headers: {'X-API-KEY': 'api123'},
          },
        );
        if (res.data.status === true) {
          setHistory(res.data.data);
          setIsLoading(false);
        }
      } catch (e) {
        console.log({e: e});
        if (e.response.data.status === false) {
          alert(e.response.data.message);
        }
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    getHistory();
  }, []);

  return (
    <View style={{flex: 1}}>
      <HeaderSetting label={t('common:history')} onBack={onBack} />
      <ScrollView>
        {/* <View style={styles.line} />
        <View style={styles.row}>
          <View style={styles.text}>
            <Text style={styles.textColor}>test</Text>
          </View>
        </View>
        <View style={styles.line} /> */}
        {history.map(item => (
          <>
            <View style={styles.line} />
            <View style={styles.row}>
              <View style={styles.text}>
                <Text style={styles.textColor}>{item.eventname}</Text>
              </View>
              <View
                style={{
                  ...styles.text2,
                  backgroundColor:
                    item.status === 'expire'
                      ? '#F178A7'
                      : item.status === 'free'
                      ? '#78ED7D'
                      : item.status === 'wait'
                      ? '#E5844A'
                      : 'red',
                }}>
                <Text style={styles.textColor2}>
                  {item.status?.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.line} />
          </>
        ))}
      </ScrollView>
      {/* <FlatList
        data={history || []}
        renderItem={({item}) => (
          <>
            <View style={styles.line} />
            <View style={styles.row}>
              <View style={styles.text}>
                <Text style={styles.textColor}>{item.eventname}</Text>
              </View>
              <View
                style={{
                  ...styles.text2,
                  backgroundColor:
                    item.status === 'expire'
                      ? '#F178A7'
                      : item.status === 'free'
                      ? '#78ED7D'
                      : item.status === 'wait'
                      ? '#78ED7D'
                      : 'red',
                }}>
                <Text style={styles.textColor2}>
                  {item.status?.toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={styles.line} />
          </>
        )}
      /> */}
      <ModalCustom visible={isLoading} />
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
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  text2: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 10,
  },
  marginLeft: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  textColor: {
    color: '#000000',
  },
  textColor2: {
    color: '#FFFFFF',
  },
});
