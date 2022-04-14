import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function HeaderSetting({label = '', onBack = () => {}}) {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={() => onBack()}>
          <FontAwesome name="chevron-left" color={'#000000'} size={23} />
        </TouchableOpacity>
        <View>
          <Text style={styles.back}>{label}</Text>
        </View>
        {label !== 'Language' && label !== 'Bahasa' ? (
          <TouchableOpacity>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        ) : (
          <Text> </Text>
        )}
      </View>
      <View style={styles.line} />
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
    justifyContent: 'space-between',
  },
  save: {
    color: '#8AB4F8',
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
});
