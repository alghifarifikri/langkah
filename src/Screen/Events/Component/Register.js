/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {useTranslation} from 'react-i18next';
import IndividuModal from './IndividuModal';
import {useEffect} from 'react';
import {DataEvent, DataFamilyDropdown} from '../../../Redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import ModalCustom from '../../../Component/Form/ModalCustom';
import FamilyModal from './FamilyModal';
import axios from 'axios';
import {SetDataEmail} from '../../../Redux/Action/CekEmail';
import KolektifModal from './KolektifModal';

export default function Register() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const dataUser = useSelector(state => state.Profile.data);
  const event = useSelector(state => state.Event.data);
  const loading = useSelector(state => state.Event.loading);
  const [raw, setRaw] = useState({});
  const [visibleIndividu, setVisibleIndividu] = useState(false);
  const [visibleKolektif, setVisibleKolektif] = useState(false);
  const [visibleFamily, setVisibleFamily] = useState(false);
  const [data, setData] = useState(event);
  const [dataFamily, setDataFamily] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isType, setIsType] = useState('');

  useEffect(() => {
    dispatch(DataEvent(dataUser.role_id));
  }, []);

  useEffect(() => {
    setData(event);
  }, [event]);

  const handleVisible = (e, type, item) => {
    if (type === 'Individu') {
      setVisibleIndividu(e);
      setRaw(item);
      dispatch(SetDataEmail({}));
    } else {
      setVisibleKolektif(e);
      setRaw(item);
      dispatch(SetDataEmail({}));
    }
  };

  const handleVisibleFamily = (e, type, item) => {
    setVisibleFamily(e);
    setRaw(item);
    dispatch(SetDataEmail({}));
  };

  const getDataFamily = async (e, type, item) => {
    setIsLoading(true);
    setIsType(type);
    try {
      const res = await axios.get(
        `https://imtiket.com/rest_api/rest-server/${type}?event_id=${item.id}`,
        {
          headers: {'X-API-KEY': 'api123'},
        },
      );
      if (res.status === 200) {
        const temp = res.data.data;
        const mapping = temp.map(v => {
          return {
            label: v.description,
            value: v.id,
          };
        });
        setDataFamily(mapping);
        dispatch(DataFamilyDropdown(mapping));
        handleVisibleFamily(e, type, item);
      }
    } catch (err) {
      console.log({err});
      alert(err?.response?.data?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  console.log({data});

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <List.Section>
            <List.Accordion
              title={item.eventname}
              style={styles.content}
              left={() => (
                <Image
                  style={styles.picProfile}
                  source={{
                    uri: item.logo,
                  }}
                />
              )}>
              {item.package?.map(v => {
                return (
                  <View style={styles.headCard}>
                    <Text style={styles.textName}>{v.package_name}</Text>
                    <ButtonCustom
                      label={'Register'}
                      onClick={() => {
                        if (v.package_name === 'INDIVIDU') {
                          handleVisible(true, 'Individu', item);
                        } else if (v.package_name === 'FAMILY') {
                          getDataFamily(true, 'family', item);
                        } else if (v.package_name === 'GROUP') {
                          getDataFamily(true, 'group', item);
                        } else {
                          handleVisible(true, 'kolektif', item);
                        }
                      }}
                      style={{
                        button: styles.buttonLogin,
                        text: styles.login,
                      }}
                    />
                  </View>
                );
              })}
              {/* <View style={styles.headCard}>
                <Text style={styles.textName}>{t('common:individu')}</Text>
                <ButtonCustom
                  label={'Register'}
                  onClick={() => handleVisible(true, 'Individu', item)}
                  style={{
                    button: styles.buttonLogin,
                    text: styles.login,
                  }}
                />
              </View>
              <View style={styles.headCard}>
                <Text style={styles.textName}>{t('common:family')}</Text>
                <ButtonCustom
                  label={'Register'}
                  onClick={() => getDataFamily(true, 'family', item)}
                  disabled={isLoading}
                  style={{
                    button: styles.buttonLogin,
                    text: styles.login,
                  }}
                />
              </View>
              <View style={styles.headCard}>
                <Text style={styles.textName}>{t('common:group')}</Text>
                <ButtonCustom
                  label={'Register'}
                  onClick={() => getDataFamily(true, 'group', item)}
                  disabled={isLoading}
                  style={{
                    button: styles.buttonLogin,
                    text: styles.login,
                  }}
                />
              </View> */}
            </List.Accordion>
          </List.Section>
        )}
        keyExtractor={item => item.id}
        // ListHeaderComponent={this.renderHeader}
        onRefresh={() => dispatch(DataEvent(dataUser.role_id))}
        refreshing={loading}
      />
      <IndividuModal
        visible={visibleIndividu}
        handleVisible={(param, type) => handleVisible(param, type)}
        data={raw}
      />
      <KolektifModal
        visible={visibleKolektif}
        handleVisible={(param, type) => handleVisible(param, type)}
        data={raw}
      />
      <FamilyModal
        visible={visibleFamily}
        handleVisible={(param, type) => handleVisibleFamily(param, type)}
        dataFamily={dataFamily}
        data={raw}
        type={isType}
      />
      <ModalCustom visible={loading || isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picProfile: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  content: {
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
    backgroundColor: 'white',
  },
  text: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  formatText: {
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  textName: {
    fontWeight: 'bold',
    color: '#000000',
    alignSelf: 'center',
  },
  headCard: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonLogin: {
    width: '25%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 15,
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});
