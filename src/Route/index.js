/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Journey from '../Screen/Journey';
import Events from '../Screen/Events';
import Profiles from '../Screen/Profiles';
import Splash from '../Screen/Splash';
import Gate from '../Screen/Gate';
import LogIn from '../Screen/Login';
import SignUp from '../Screen/SignUp';
import Notification from '../Screen/Notification';
import Forgot from '../Screen/Forgot';
import Setting from '../Screen/Setting';
import NewPost from '../Screen/Journey/Form/NewPost';
import Detail from '../Screen/Journey/Form/Detail';
import FormRegister from '../Screen/Events/Component/FormRegister';
import Payment from '../Screen/Events/Component/Payment';
import {useSelector} from 'react-redux';
import EditProfile from '../Screen/Setting/Form/EditProfile';
import Midtrans from '../Screen/Events/Component/Midtrans';
import Thanks from '../Screen/Events/Component/Thanks';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const {width} = Dimensions.get('window');

function Lounge() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Coming Soon</Text>
    </View>
  );
}
function Training() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Coming Soon</Text>
    </View>
  );
}

function TabScreens() {
  const dataUser = useSelector(state => state.Profile.data);

  return (
    <Tab.Navigator
      initialRouteName="Journey"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Journey"
        component={Journey}
        options={{
          tabBarLabel: 'Journey',
          tabBarIcon: ({color}) => (
            <Entypo name="compass" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Lounge"
        component={Lounge}
        options={{
          tabBarLabel: 'Lounge',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="sofa-outline"
              color={color}
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Training"
        component={Training}
        options={{
          tabBarLabel: 'Training',
          tabBarIcon: ({color}) => (
            <Octicons name="stopwatch" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({color}) => (
            <AntDesign name="staro" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={Profiles}
        options={{
          tabBarLabel: 'Profiles',
          tabBarIcon: ({color}) => (
            <Image
              style={styles.picProfile}
              resizeMode="cover"
              source={{
                uri:
                  dataUser?.image ||
                  'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function stackScreen() {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Gate" component={Gate} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="NewPost" component={NewPost} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="FormRegister" component={FormRegister} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Midtrans" component={Midtrans} />
        <Stack.Screen name="Thanks" component={Thanks} />
        <Stack.Screen name="Tab" component={TabScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Route() {
  return stackScreen();
}

const styles = StyleSheet.create({
  picProfile: {
    borderRadius: 100,
    width: width * 0.075,
    height: width * 0.033 * 2.16,
  },
});
