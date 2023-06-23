/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sparse-arrays */
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import JourneyHeader from '../../Component/Global/JourneyHeader';
import FloatingButton from '../../Component/Form/FloatingButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  DataComment,
  DataDetailJourney,
  DataFollowers,
  DataJourney,
  DataMilesStones,
  DataNotification,
  DataProfile,
  DataRequest,
  Follow,
  Likes,
} from '../../Redux/Action';
import moment from 'moment';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import ModalCustom from '../../Component/Form/ModalCustom';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function Journey() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const data = useSelector(state => state.Journey.data);
  const loading = useSelector(state => state.Journey.loading);
  const dataUser = useSelector(state => state.Profile.data);
  const request = useSelector(state => state.Request.data);
  const notif = useSelector(state => state.Notification.data);

  const backAction = () => {
    BackHandler.exitApp();
  };

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(DataProfile());
  }, []);

  useEffect(() => {
    if (dataUser?.email) {
      dispatch(DataJourney(dataUser.email));
      dispatch(DataRequest(dataUser.email));
      dispatch(DataNotification(dataUser.email));
      dispatch(DataFollowers(dataUser.email));
      dispatch(DataMilesStones(dataUser.email));
    }
  }, [dataUser?.email]);

  function truncate(input) {
    if (input.length > 150) {
      return (
        <Text>
          {input.substring(0, 150) + '... '}
          <Text style={styles.more}>Read More</Text>
        </Text>
      );
    }
    return input;
  }

  const likes = async (id, likeStatus) => {
    try {
      dispatch(Likes(id, likeStatus, dataUser));
    } catch (e) {
      console.log({e: e});
    }
  };

  const following = (email, status) => {
    dispatch(Follow(email, dataUser.email, status));
  };

  return (
    <View style={styles.container}>
      <JourneyHeader length={request.length + notif.length} />
      <View style={styles.line} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <View style={styles.card}>
              <View style={styles.headCard}>
                <TouchableOpacity>
                  <Image
                    style={styles.picProfile}
                    source={{
                      uri: item.image_profile_path,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.name}>
                  <Text style={styles.textName}>{item.name}</Text>
                  <Text style={styles.textTime}>
                    {moment(item.created_date).fromNow()}
                  </Text>
                </View>
                {item.created_by !== dataUser?.email && (
                  <TouchableOpacity
                    style={styles.followIcon}
                    onPress={() => following(item.created_by, 'follow')}>
                    <SimpleLineIcons
                      name="user-follow"
                      color={'#000000'}
                      size={23}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(DataDetailJourney(item));
                    navigation.navigate('Detail');
                  }}>
                  <Image
                    style={styles.postPic}
                    source={{
                      uri: item.picture_path,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.paragraph}
                  onPress={() => {
                    dispatch(DataDetailJourney(item));
                    navigation.navigate('Detail');
                  }}>
                  <Text style={styles.align}>{truncate(item.description)}</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => likes(item.id, item.lover)}>
                    <AntDesign
                      name="heart"
                      color={item.lover ? '#F44336' : '#000000'}
                      size={23}
                    />
                  </TouchableOpacity>
                  <Text style={styles.text}>{item.jml_lovers}</Text>
                  <TouchableOpacity
                    style={styles.comment}
                    onPress={() => {
                      dispatch(DataDetailJourney(item));
                      dispatch(DataComment(item.journey_id));
                      navigation.navigate('Detail');
                    }}>
                    <MaterialCommunityIcons
                      name="comment-text-outline"
                      color={'#000000'}
                      size={23}
                    />
                  </TouchableOpacity>
                  <Text style={styles.text}>{item.jml_comment}</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottom} />
          </View>
        )}
        keyExtractor={item => item.id}
        // ListHeaderComponent={this.renderHeader}
        onRefresh={() => dispatch(DataJourney(dataUser.email))}
        refreshing={loading}
      />
      {/* <FloatingButton onPress={() => navigation.navigate('NewPost')} /> */}
      <ModalCustom visible={loading} />
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
    marginBottom: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  bottom: {
    borderBottomWidth: 10,
    borderBottomColor: '#F4F4F4',
  },
  card: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  headCard: {
    flexDirection: 'row',
  },
  picProfile: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  name: {
    marginLeft: 10,
    marginBottom: 10,
  },
  followIcon: {
    marginLeft: 'auto',
  },
  textName: {
    fontWeight: 'bold',
    color: '#000000',
  },
  textTime: {
    fontSize: 10,
    color: 'grey',
  },
  postPic: {
    resizeMode: 'cover',
    width: '100%',
    height: 250 * ratio,
    borderRadius: 20,
    marginTop: 10,
  },
  more: {
    fontWeight: 'bold',
    color: '#000000',
  },
  align: {
    textAlign: 'justify',
    color: 'grey',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    color: 'grey',
  },
  comment: {
    marginLeft: 50,
  },
});
