import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import ListRank from '../Component/ListRank';

export default function Ranks() {
  const [active, setActive] = useState('Walk');
  const data = [
    {
      rank: 1,
      name: 'John Doe',
      distance: '15,921 KM',
      url: 'https://media.gettyimages.com/photos/keanu-reeves-attends-the-john-wick-special-screenings-at-ham-yard-on-picture-id1146739180?s=612x612',
    },
    {
      rank: 2,
      name: 'John Cena',
      distance: '14,821 KM',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/John_Cena_July_2018.jpg/220px-John_Cena_July_2018.jpg',
    },
    {
      rank: 3,
      name: 'Anthony S.',
      distance: '13,222 KM',
      url: 'https://images2.fanpop.com/image/photos/12900000/Tony-Stark-tony-stark-12952978-419-600.jpg',
    },
  ];
  // const dataContent =
  //   active === 'Miles Stone' ? dataMileStone : dataPersonalBest;
  const tab = ['Walk', 'Run', 'Ride', 'Swim'];
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
      <Text style={styles.title}>National {active} Rank</Text>
      <ListRank data={data} />
      {/* <View style={{backgroundColor: 'red', marginLeft: -20}}>
        <Text>test</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  tab: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inactiveTab: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#8D8D8D',
  },
  activeTab: {
    paddingLeft: 25,
    marginLeft: 5,
    marginRight: 5,
    paddingRight: 25,
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
});
