import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ButtonCustom from '../../../Component/Form/ButtonCustom';

export default function Thanks({route, navigation}) {
  const {order_id} = route?.params;
  return (
    <View style={styles.container}>
      {/* <LeftHeader label="Back" /> */}
      <Text style={styles.text}>Thank You For Registration</Text>
      <Text style={styles.text2}># Registration Number : {order_id}</Text>
      <Text style={styles.text3}>
        Participants who choose credit card as a payment method, the transaction
        will be paid automatically.
      </Text>
      <Text style={styles.text3}>
        Participants who choose other method (except credit card), please check
        email inbox/junk/promotion to see the payment procedure, which should be
        paid immadiately within 1x24 hours.
      </Text>
      <ButtonCustom
        label="Kembali"
        onClick={() =>
          navigation.navigate('Events') || navigation.navigate('Tab')
        }
        style={{
          button: styles.buttonLogin,
          text: styles.login,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20,
    marginTop: 20,
  },
  text2: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 14,
    marginTop: 20,
  },
  text3: {
    // fontWeight: 'bold',
    color: '#000000',
    fontSize: 12,
    marginTop: 20,
    textAlign: 'justify',
  },
  buttonLogin: {
    width: '100%',
    backgroundColor: '#F65431',
    alignItems: 'center',
    marginBottom: 15,
    padding: 13,
    borderRadius: 10,
    marginTop: 50,
  },
  login: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});
