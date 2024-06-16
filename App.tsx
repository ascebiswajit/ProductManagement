import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import auth from '@react-native-firebase/auth';

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const RootStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

const App = () => {
  const isLoggedIn = auth()?.currentUser?.isAnonymous;

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootStack.Navigator>
            {isLoggedIn === undefined ? (
              <>
                <RootStack.Screen name='Auth' component={AuthNavigator} options={{ headerShown: false }} />
                <RootStack.Screen name='APP' component={AppNavigator} options={{ headerShown: false }} />
              </>
            ) : (
              !isLoggedIn ? (
                <>
                  <RootStack.Screen name='APP' component={AppNavigator} options={{ headerShown: false }} />
                  <RootStack.Screen name='Auth' component={AuthNavigator} options={{ headerShown: false }} />
                </>
              ) : (
                <>
                  <RootStack.Screen name='Auth' component={AuthNavigator} options={{ headerShown: false }} />
                  <RootStack.Screen name='APP' component={AppNavigator} options={{ headerShown: false }} />
                </>
              )
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
