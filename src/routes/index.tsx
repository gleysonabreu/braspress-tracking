import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from '../pages/Homepage';
import Tracking from '../pages/Tracking';
import AddTracking from '../pages/AddTracking';

export type RootStackParamList = {
  Homepage: undefined;
  AddTracking: undefined;
  Tracking: {
    typeDoc: string;
    docIdentify: string;
    numberIdentify: string;
  };
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Homepage"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Homepage" component={Homepage} />
        <Screen name="AddTracking" component={AddTracking} />
        <Screen name="Tracking" component={Tracking} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
