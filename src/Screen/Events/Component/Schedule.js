import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function Schedule() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.content}>
          <View>
            <Image
              style={styles.picProfile}
              source={{
                uri: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=5249025385148635&height=50&width=50&ext=1648608719&hash=AeRWW58fnE_yLx8v9_c',
              }}
            />
          </View>
          <View style={styles.text}>
            <Text style={styles.formatText}>Konoha Running </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picProfile: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  },
  text: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  formatText: {
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    fontSize: 12,
  },
});
