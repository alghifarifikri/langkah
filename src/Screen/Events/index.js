import {View, StyleSheet} from 'react-native';
import React from 'react';
import NotifHeader from '../../Component/Global/NotifHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Register from './Component/Register';
import Schedule from './Component/Schedule';
import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

export default function Events() {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <NotifHeader label="Events" />
      <View style={styles.line} />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.labelStyle,
          tabBarItemStyle: {height: 45, marginTop: -15},
          tabBarIndicatorStyle: {backgroundColor: '#F65431'},
        }}>
        <Tab.Screen
          name="Register"
          component={Register}
          options={{tabBarLabel: t('common:registernow')}}
        />
        <Tab.Screen
          name="Schedule"
          component={Schedule}
          options={{tabBarLabel: t('common:schedule')}}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 12,
    textTransform: 'none',
    fontWeight: 'bold',
  },
});
