import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

export default function ListRank({data}) {
  return (
    <View>
      <View style={styles.row}>
        <View>
          <Text style={styles.textRank}>{data[1].rank}nd</Text>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: data[1].url,
            }}
          />
          <Text style={styles.textName}>{data[1].name}</Text>
          <Text style={styles.textDistance}>{data[1].distance}</Text>
        </View>
        <View style={styles.first}>
          <Text style={styles.textRank}>{data[0].rank}st</Text>
          <Image
            style={styles.imageSt}
            resizeMode="cover"
            source={{
              uri: data[0].url,
            }}
          />
          <Text style={styles.textName}>{data[0].name}</Text>
          <Text style={styles.textDistance}>{data[0].distance}</Text>
        </View>
        <View>
          <Text style={styles.textRank}>{data[2].rank}rd</Text>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: data[2].url,
            }}
          />
          <Text style={styles.textName}>{data[2].name}</Text>
          <Text style={styles.textDistance}>{data[2].distance}</Text>
        </View>
      </View>
      <View style={styles.marginTop}>
        <View style={styles.rowList}>
          <View style={styles.viewList}>
            <Text style={styles.textList}>4</Text>
          </View>
          <Image
            style={styles.imageList}
            resizeMode="cover"
            source={{
              uri: 'https://www.greenscene.co.id/wp-content/uploads/2021/05/Sasuke-2.jpg',
            }}
          />
          <View style={styles.viewList}>
            <Text style={styles.textNameList}>Sasuke Uchiha</Text>
          </View>
          <View style={styles.distanceList}>
            <Text style={styles.textDistanceList}>12.521 KM</Text>
          </View>
        </View>
        <View style={styles.rowList}>
          <View style={styles.viewList}>
            <Text style={styles.textList}>4</Text>
          </View>
          <Image
            style={styles.imageList}
            resizeMode="cover"
            source={{
              uri: 'https://www.greenscene.co.id/wp-content/uploads/2021/05/Sasuke-2.jpg',
            }}
          />
          <View style={styles.viewList}>
            <Text style={styles.textNameList}>Sasuke Uchiha</Text>
          </View>
          <View style={styles.distanceList}>
            <Text style={styles.textDistanceList}>12.521 KM</Text>
          </View>
        </View>
        <View style={styles.rowList}>
          <View style={styles.viewList}>
            <Text style={styles.textList}>4</Text>
          </View>
          <Image
            style={styles.imageList}
            resizeMode="cover"
            source={{
              uri: 'https://www.greenscene.co.id/wp-content/uploads/2021/05/Sasuke-2.jpg',
            }}
          />
          <View style={styles.viewList}>
            <Text style={styles.textNameList}>Sasuke Uchiha</Text>
          </View>
          <View style={styles.distanceList}>
            <Text style={styles.textDistanceList}>12.521 KM</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    marginTop: 10,
  },
  marginTop: {
    marginTop: 20,
  },
  rowList: {
    flexDirection: 'row',
    marginTop: -1,
    paddingTop: 5,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#8D8D8D',
  },
  image: {
    height: width * 0.08 * 2.16,
    aspectRatio: 1,
    borderRadius: 100,
  },
  imageList: {
    height: width * 0.06 * 2.16,
    aspectRatio: 1,
    borderRadius: 100,
  },
  imageSt: {
    height: width * 0.1 * 2.16,
    aspectRatio: 1,
    borderRadius: 100,
  },
  textRank: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textName: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  textDistance: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },
  first: {
    marginTop: -25,
  },
  textList: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  textNameList: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  textDistanceList: {
    fontSize: 12,
    color: '#000000',
    fontWeight: 'bold',
  },
  viewList: {
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
  distanceList: {
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 'auto',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
  },
});
