import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

export default function Achievement() {
  const data = [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCSm3X73-SuV5TusxX1Bo5G3ZpDfOdiAlPg&usqp=CAU?format=auto',
      name: 'JAKMAR 2023',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsfW3nS_emrn4NLMIkoNFEbmstJgoN3r-ag&usqp=CAU?format=auto',
      name: 'BUMN Running',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsfW3nS_emrn4NLMIkoNFEbmstJgoN3r-ag&usqp=CAU?format=auto',
      name: 'BUMN Running II',
    },
    {
      url: 'https://www.outsideonline.com/wp-content/uploads/2015/05/14/best-medals-walt-disney-world-marathon_s.jpg?format=auto',
      name: 'Marathon Challange Jakarta 2023',
    },
  ];
  return (
    <View style={styles.row}>
      {data?.map((item, index) => (
        <View style={Platform.OS === 'android' ? styles.box : styles.boxIphone}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: item.url,
            }}
          />
          <View style={styles.marginTop}>
            <Text style={styles.name}>{item?.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  box: {
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 56, height: 13},
    width: '45%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
    borderRadius: 20,
    margin: 5,
  },
  boxIphone: {
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    elevation: 5,
    shadowRadius: 15,
    shadowOffset: {width: 5, height: 5},
    width: '45%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 10,
    padding: 13,
    borderRadius: 20,
    margin: 5,
  },
  image: {
    height: width * 0.14 * 2.16,
    aspectRatio: 1,
  },
  marginTop: {
    marginTop: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});
