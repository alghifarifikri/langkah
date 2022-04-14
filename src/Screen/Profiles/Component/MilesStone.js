import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function MilesStone({data}) {
  return (
    <View style={styles.rowFlex}>
      <View>
        <View>
          <Text style={styles.title}>{data.sports}</Text>
          <Text style={styles.distance}>
            {Number(data.Total_distance)?.toFixed(2) || 0} KM
          </Text>
          <Text style={styles.subtitle}>Total Distance</Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.time}>This Week</Text>
            <Text style={styles.subtitle}>
              {Number(data.this_week)?.toFixed(2) || 0} KM
            </Text>
          </View>
          <View style={styles.marginLeft}>
            <Text style={styles.time}>This Month</Text>
            <Text style={styles.subtitle}>
              {Number(data.this_month)?.toFixed(2) || 0} KM
            </Text>
          </View>
        </View>
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
    marginTop: 20,
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
    // fontWeight: 'bold',
    color: '#000000',
    fontSize: 9,
  },
  distance: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 22,
  },
});
