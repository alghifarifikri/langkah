import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DataNotification, DataRequest} from '../../Redux/Action';

export default function JourneyHeader({label = '', length = 0}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataUser = useSelector(state => state.Profile.data);

  return (
    <View style={styles.backIcon}>
      <Image
        style={{width: 103, height: 26}}
        source={{uri: 'https://i.ibb.co/Wkc04Wc/image-9.png'}}
      />
      <TouchableOpacity
        style={styles.notif}
        onPress={() => {
          navigation.navigate('Notification');
          dispatch(DataRequest(dataUser.email));
          dispatch(DataNotification(dataUser.email));
        }}>
        {length !== 0 && (
          <Badge style={styles.bedge} size={16}>
            {length}
          </Badge>
        )}
        <AntDesign name="bells" color={'#000000'} size={23} />
      </TouchableOpacity>
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
  notif: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  bedge: {
    backgroundColor: '#F65431',
    color: '#FFFFFF',
    marginRight: -5,
    marginBottom: 10,
  },
});
