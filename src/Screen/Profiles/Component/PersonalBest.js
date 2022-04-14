import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function PersonalBest({data}) {
  return (
    <View style={styles.rowFlex}>
      <View>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Personal Best of {data.type}</Text>
        </View>
        {data?.total?.map((item, index) => (
          <View style={styles.row}>
            <View style={styles.right}>
              <Text style={styles.title}>{item.range}</Text>
            </View>
            <View>
              <Text style={styles.title}>
                {'   '}:{'   '}
              </Text>
            </View>
            <View>
              <Text style={styles.title}> {item.time} </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
  },
  viewTitle: {
    marginBottom: 5,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 25,
  },
  subtitle: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
  },
  time: {
    color: '#000000',
    fontSize: 9,
  },
  distance: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 22,
  },
  right: {
    alignItems: 'flex-end',
    width: 35,
  },
});
