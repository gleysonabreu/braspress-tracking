import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Homepage from '../pages/Homepage';
import Tracking from '../pages/Tracking';

function AppStack(){
  return(
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Homepage" component={Homepage} />
        <Screen name="Tracking" component={Tracking} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;