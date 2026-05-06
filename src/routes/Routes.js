import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './Auth';
import Main from './Main';
import CreateProfile from '../screens/authStack/CreateProfile';
import {useSelector} from 'react-redux';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const {token, user} = useSelector(state => state?.persistedData);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!token ? (
        <Stack.Screen name="Auth" component={Auth} />
      ) : !user?.isCreated ? (
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
      ) : (
        <Stack.Screen name="Main" component={Main} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
