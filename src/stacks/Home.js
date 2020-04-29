import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tracks from '../screens/Tracks';
import NowPlaying from '../screens/NowPlaying';
import {TouchableOpacity, StatusBar, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0,0,0,0.1)"
        barStyle="light-content"
      />
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Tracks}
          options={{
            headerTitle: 'Music',
            headerTitleStyle: {
              fontSize: 26,
              fontFamily: 'Lato-Regular',
            },
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#884EA0',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={styles.margin}>
                <Icon name="menu" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Now Playing"
          component={NowPlaying}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  margin: {
    marginLeft: 12,
  },
});
