/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {useTranslation} from 'react-i18next';
import IndividuModal from './IndividuModal';
import {useEffect} from 'react';
import {DataEvent} from '../../../Redux/Action';
import {useDispatch, useSelector} from 'react-redux';
import ModalCustom from '../../../Component/Form/ModalCustom';

export default function Register() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const dataUser = useSelector(state => state.Profile.data);
  const event = useSelector(state => state.Event.data);
  const loading = useSelector(state => state.Event.loading);
  const [visibleIndividu, setVisibleIndividu] = useState(false);

  console.log({event});

  useEffect(() => {
    dispatch(DataEvent(dataUser.role_id));
  }, []);

  const handleVisible = (e, type) => {
    if (type === 'Individu') {
      setVisibleIndividu(e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={event}
        renderItem={({item}) => (
          <List.Section>
            <List.Accordion
              title={item.event_name}
              style={styles.content}
              left={() => (
                <Image
                  style={styles.picProfile}
                  source={{
                    uri: item.logo,
                  }}
                />
              )}>
              <View style={styles.headCard}>
                <Text style={styles.textName}>{t('common:individu')}</Text>
                <ButtonCustom
                  label={'Register'}
                  onClick={() => handleVisible(true, 'Individu')}
                  style={{
                    button: styles.buttonLogin,
                    text: styles.login,
                  }}
                />
              </View>
              <View style={styles.headCard}>
                <Text style={styles.textName}>{t('common:collective')}</Text>
                <ButtonCustom
                  label={'Register'}
                  // onClick={() => LogIn()}
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
                  // onClick={() => LogIn()}
                  style={{
                    button: styles.buttonLogin,
                    text: styles.login,
                  }}
                />
              </View>
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
      />
      <ModalCustom visible={loading} />
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
    // paddingLeft: 20,
    // paddingRight: 20,
    // paddingTop: 10,
    // paddingBottom: 10,
    // flexDirection: 'row',
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
