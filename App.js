import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from './src/actions/app.actions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './src/screens/SigInScreen';
import Navbar from './src/Components/Navbar';
import SignUpScreen from './src/screens/SignUpScreen';
import MapScreen from './src/screens/MapScreen';
import ZakazScreen from './src/screens/DestinationScreen';
// import DestinationScreen from "./src/screens/DestinationScreen";
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actions.userInfo());
    }
  }, [isAuthenticated, dispatch]);
  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? (
          <RootStack.Navigator>
            <RootStack.Screen
              name="Drawer"
              component={Navbar}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Map"
              component={MapScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="DestinationScreen"
              component={ZakazScreen}
              options={{headerShown: false}}
            />
          </RootStack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Auth"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
