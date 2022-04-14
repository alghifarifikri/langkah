import {View, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

export default function Achievement() {
  const data = [
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCSm3X73-SuV5TusxX1Bo5G3ZpDfOdiAlPg&usqp=CAU?format=auto',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsfW3nS_emrn4NLMIkoNFEbmstJgoN3r-ag&usqp=CAU?format=auto',
    },
    {
      url: 'https://www.outsideonline.com/wp-content/uploads/2015/05/14/best-medals-walt-disney-world-marathon_s.jpg?format=auto',
    },
  ];
  return (
    <View style={styles.row}>
      {data?.map((item, index) => (
        <View style={styles.box}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: item.url,
            }}
          />
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
  image: {
    height: width * 0.14 * 2.16,
    aspectRatio: 1,
  },
});
