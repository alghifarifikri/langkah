/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import MilesStone from '../Component/MilesStone';
import PersonalBest from '../Component/PersonalBest';
import {useDispatch, useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

export default function Progress() {
  const dispatch = useDispatch();
  const dataMileStone = useSelector(state => state.MilesStone.data);
  const [active, setActive] = useState('Miles Stone');
  const dataPersonalBest = [
    {
      type: 'Walk',
      total: [
        {
          range: '5K',
          time: '8:00:00',
        },
        {
          range: '10K',
          time: '8:00:00',
        },
        {
          range: '21K',
          time: '8:00:00',
        },
        {
          range: '42K',
          time: '8:00:00',
        },
        {
          range: '100K',
          time: '8:00:00',
        },
      ],
    },
    {
      type: 'Run',
      total: [
        {
          range: '5K',
          time: '8:00:00',
        },
        {
          range: '10K',
          time: '8:00:00',
        },
        {
          range: '21K',
          time: '8:00:00',
        },
        {
          range: '42K',
          time: '8:00:00',
        },
        {
          range: '100K',
          time: '8:00:00',
        },
      ],
    },
    {
      type: 'Ride',
      total: [
        {
          range: '5K',
          time: '8:00:00',
        },
        {
          range: '10K',
          time: '8:00:00',
        },
        {
          range: '21K',
          time: '8:00:00',
        },
        {
          range: '42K',
          time: '8:00:00',
        },
        {
          range: '100K',
          time: '8:00:00',
        },
      ],
    },
    {
      type: 'Swim',
      total: [
        {
          range: '5K',
          time: '8:00:00',
        },
        {
          range: '10K',
          time: '8:00:00',
        },
        {
          range: '21K',
          time: '8:00:00',
        },
        {
          range: '42K',
          time: '8:00:00',
        },
        {
          range: '100K',
          time: '8:00:00',
        },
      ],
    },
  ];
  const dataContent =
    active === 'Miles Stone' ? dataMileStone : dataPersonalBest;
  const tab = ['Miles Stone', 'Personal Best'];
  return (
    <View>
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
      {dataContent?.map((item, index) => (
        <View style={styles.row}>
          <View
            style={{
              ...styles.content,
              backgroundColor:
                index === 0
                  ? '#FFCCCC'
                  : index === 1
                  ? '#CCEDFF'
                  : index === 2
                  ? '#F8F9CC'
                  : '#CCF9E6',
            }}>
            {active === 'Miles Stone' ? (
              <MilesStone data={item} />
            ) : (
              <PersonalBest data={item} />
            )}
          </View>
          <TouchableOpacity style={styles.viewImage}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{
                uri: 'https://contents.mediadecathlon.com/p1261690/k$d4381cc8c4da7fc4eb78433760ac5a36/1080x0/1cr1/marche-sportive.jpg?format=auto',
              }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tab: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 10,
    backgroundColor: '#FFCCCC',
    borderRadius: 20,
    paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    height: width * 0.18 * 2.16,
    width: '100%',
  },
  inactiveTab: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8D8D8D',
  },
  activeTab: {
    paddingLeft: 20,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F65431',
  },
  textTab: {
    color: '#8D8D8D',
    fontSize: 12,
  },
  textActiveTab: {
    color: '#F65431',
    fontSize: 12,
  },
  viewImage: {
    marginLeft: 'auto',
    marginTop: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#8D8D8D',
  },
  image: {
    height: width * 0.18 * 2.16,
    aspectRatio: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
