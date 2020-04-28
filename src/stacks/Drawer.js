import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './Home';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
