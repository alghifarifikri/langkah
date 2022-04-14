/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputCustom from '../../../Component/Form/InputCustom';
import ButtonCustom from '../../../Component/Form/ButtonCustom';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import NotifHeader from '../../../Component/Global/NotifHeader';
import {DataComment, Likes, SubmitComment} from '../../../Redux/Action';

const win = Dimensions.get('window');
const ratio = win.width / 541;

export default function Detail() {
  const dispatch = useDispatch();
  const dataDetail = useSelector(state => state.DetailJourney.data);
  const dataJourney = useSelector(state => state.Journey.data);
  const dataUser = useSelector(state => state.Profile.data);
  const dataComments = useSelector(state => state.Comment.data);
  const loading = useSelector(state => state.Comment.loading);
  const [like, setLike] = useState(false);
  const [data, setData] = useState(dataDetail);
  const [firstRender, setFirstRender] = useState(true);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    if (firstRender === false) {
      filterData();
      setCaption('');
    } else {
      dispatch(DataComment(dataDetail.id));
      setFirstRender(false);
    }
  }, [dataJourney]);

  const filterData = () => {
    const temp = dataJourney.filter(e => {
      return e.id === dataDetail.id;
    });
    setData(temp[0]);
  };

  const comment = () => {
    const body = {
      journey_id: dataDetail.id,
      comment: caption.caption,
      email_comment: dataUser.email,
      email_creator: dataDetail.created_by,
    };
    dispatch(SubmitComment(body));
  };

  return (
    <View style={styles.container}>
      <NotifHeader label="" />
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.headCard}>
            <TouchableOpacity>
              <Image
                style={styles.picProfile}
                source={{
                  uri: data.image_profile_path || dataUser.image,
                }}
              />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.textName}>{data.name}</Text>
              <Text style={styles.textTime}>
                {moment(data.created_date).fromNow()}
              </Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.postPic}
              source={{
                uri: data.picture_path,
              }}
            />
            <View style={styles.caption}>
              <Text style={styles.align}>{data.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom} />
        <View style={styles.card}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                dispatch(Likes(data.id, data.lover, dataUser));
              }}>
              <AntDesign
                name="heart"
                color={data.lover ? '#F44336' : '#000000'}
                size={23}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              {data.lover ? (
                <Text style={styles.text}>
                  {' '}
                  Anda{Number(data.jml_lovers) > 1 && data.lover ? ' dan' : ''}
                </Text>
              ) : null}
              <Text style={!like ? styles.text : ''}>
                {data.jml_lovers === '0'
                  ? ''
                  : Number(data.jml_lovers) > 1 && data.lover
                  ? `${data.jml_lovers - 1} orang lainnya menyukai ini`
                  : data.jml_lovers === '1' && data.lover
                  ? 'menyukai ini'
                  : Number(data.jml_lovers) > 1
                  ? `${data.jml_lovers} orang lainnya menyukai ini`
                  : ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom} />
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#F65431" />
          ) : (
            <>
              <FlatList
                data={dataComments}
                renderItem={({item}) => (
                  <View style={styles.headCard}>
                    <TouchableOpacity>
                      <Image
                        style={styles.picProfile}
                        source={{
                          uri: data.photo || dataUser.image,
                        }}
                      />
                    </TouchableOpacity>
                    <View style={styles.name}>
                      <View style={styles.headCard}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textTimeComment}>
                          {moment(item.created_date).fromNow()}
                        </Text>
                      </View>
                      <Text style={styles.comment}>{item.comment}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
                // ListHeaderComponent={this.renderHeader}
                // onRefresh={() => dispatch(DataJourney(dataUser.email))}
                refreshing={loading}
              />
              {/* {dataComments.map(e => { */}
              {/* <View style={styles.headCard}>
                <TouchableOpacity>
                  <Image
                    style={styles.picProfile}
                    source={{
                      uri: data.photo || dataUser.image,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.name}>
                  <Text style={styles.textName}>{data.name}</Text>
                  <Text style={styles.comment}>test</Text>
                </View>
              </View> */}
              {/* })} */}
            </>
          )}
          <View>
            <InputCustom
              type="address"
              label=""
              placeholder="Tulis Komentar"
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
              label="Komentari"
              disabled={loading}
              onClick={() => comment()}
              style={{
                button: loading ? styles.buttonLoading : styles.buttonSection,
                text: styles.login,
              }}
            />
          </View>
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
  },
  bottom: {
    borderBottomWidth: 10,
    borderBottomColor: '#F4F4F4',
  },
  card: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
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
    padding: 7,
    marginRight: 17,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
  },
  header: {
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 17,
    borderRadius: 10,
  },
  textName: {
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 20,
  },
  textTime: {
    fontSize: 10,
    color: 'grey',
  },
  textTimeComment: {
    fontSize: 9,
    color: 'grey',
    alignSelf: 'center',
    marginLeft: 'auto',
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
    marginLeft: 5,
    color: 'grey',
  },
  comment: {
    color: 'grey',
  },
  caption: {
    marginBottom: 10,
    marginTop: 10,
  },
  view: {
    marginBottom: 10,
  },
  address: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
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
});
