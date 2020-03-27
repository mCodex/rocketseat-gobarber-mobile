import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default () => {
  const isSigned = useSelector(state => state.auth.signed);

  const NewStack = () => (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>
        ),
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      })}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{ title: 'Selecione o prestador' }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{ title: 'Selecione um horário' }}
      />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        {!isSigned ? (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator
            tabBarOptions={{
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#8d41a8',
              },
            }}
          >
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                title: 'Agendamentos',
                tabBarIcon: ({ color }) => (
                  <Icon name="event" size={20} color={color} />
                ),
              }}
            />

            <Tab.Screen
              name="New"
              component={NewStack}
              options={{
                tabBarVisible: false,
                title: 'Agendar',
                tabBarIcon: ({ color }) => (
                  <Icon name="add-circle-outline" size={20} color={color} />
                ),
              }}
            />

            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                title: 'Meu Perfil',
                tabBarIcon: ({ color }) => (
                  <Icon name="person" size={20} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
