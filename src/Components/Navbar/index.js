import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from '../TabNavigation';
import Svg, {Path} from 'react-native-svg';
import KurerScreen from '../../screens/KurerScreen';
import KurersScreen from '../../screens/KurersScreen';
import PaymentsScreen from '../../screens/PaymentsScreen';
import SettingScreen from '../../screens/SetingScreen';
import HelpScreen from '../../screens/HelpScreen';
import DrawerContent from '../DrawerContent';
import MapScreen from '../../screens/MapScreen';
import MessagesScreen from '../../screens/MessagesScreen';

const Drawer = createDrawerNavigator();
function Navbar() {
  const Home = (
    <Svg
      width={30}
      height={30}
      fill="#335616"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="CabinIcon"
      tabIndex="-1"
      title="Cabin">
      <Path d="M10 1c0 1.66-1.34 3-3 3-.55 0-1 .45-1 1H4c0-1.66 1.34-3 3-3 .55 0 1-.45 1-1h2zm2 2L6 7.58V6H4v3.11L1 11.4l1.21 1.59L4 11.62V21h16v-9.38l1.79 1.36L23 11.4 12 3zm1.94 4h-3.89L12 5.52 13.94 7zm-6.5 2h9.12L18 10.1v.9H6v-.9L7.44 9zM18 13v2H6v-2h12zM6 19v-2h12v2H6z" />
    </Svg>
  );
  const Busines = (
    <Svg
      width={30}
      height={30}
      fill="#335616"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="BusinessIcon"
      tabIndex="-1"
      title="Business">
      <Path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </Svg>
  );
  const Bike = (
    <Svg
      width={30}
      height={30}
      fill="#335616"
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="MopedIcon"
      tabIndex="-1"
      title="Moped">
      <Path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z" />
      <Path d="M5 6h5v2H5zm14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </Svg>
  );
  const Payments = (
    <Svg
      width={30}
      height={30}
      fill="#335616"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="PaymentIcon"
      tabIndex="-1"
      title="Payment">
      <Path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </Svg>
  );
  const Settings = (
    <Svg
      width={30}
      height={30}
      fill="#335616"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="SettingsIcon"
      tabIndex="-1"
      title="Settings">
      <Path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </Svg>
  );
  const Messages = (
    <Svg
      width={30}
      height={30}
      fill="#335616"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ForumIcon"
      tabIndex="-1"
      title="Forum">
      <Path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
    </Svg>
  );
  const Help = (
    <Svg
      width={30}
      height={30}
      fill="#335616"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="SupportIcon"
      tabIndex="-1"
      title="Support">
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.46 7.12-2.78 1.15c-.51-1.36-1.58-2.44-2.95-2.94l1.15-2.78c2.1.8 3.77 2.47 4.58 4.57zM12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zM9.13 4.54l1.17 2.78c-1.38.5-2.47 1.59-2.98 2.97L4.54 9.13c.81-2.11 2.48-3.78 4.59-4.59zM4.54 14.87l2.78-1.15c.51 1.38 1.59 2.46 2.97 2.96l-1.17 2.78c-2.1-.81-3.77-2.48-4.58-4.59zm10.34 4.59-1.15-2.78c1.37-.51 2.45-1.59 2.95-2.97l2.78 1.17c-.81 2.1-2.48 3.77-4.58 4.58z" />
    </Svg>
  );
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          title: 'Кабинет',
          drawerIcon: () => Home,
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(201,227,152)',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerItemStyle: {
            backgroundColor: 'rgb(216,243,160)',
            borderRadius: 20,
          },
          swipeMinDistance: {
            marginTop: 20,
          },
          drawerStyle: {
            backgroundColor: 'rgb(98,133,42)',
          },
          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: '500',
            color: 'rgb(70,85,31)',
          },
        }}
      />
      <Drawer.Screen
        name="Kurer"
        component={KurerScreen}
        options={{
          title: 'Стать курьером',
          drawerIcon: () => Busines,
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(201,227,152)',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerItemStyle: {
            backgroundColor: 'rgb(216,243,160)',
            borderRadius: 20,
          },
          swipeMinDistance: {
            marginTop: 20,
          },
          drawerStyle: {
            backgroundColor: 'rgb(98,133,42)',
          },
          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: '500',
            color: 'rgb(70,85,31)',
          },
        }}
      />
      {/*<Drawer.Screen*/}
      {/*  name="Map"*/}
      {/*  component={MapScreen}*/}
      {/*  options={{*/}
      {/*    title: 'Отследить',*/}
      {/*    drawerIcon: () => Bike,*/}
      {/*    headerShown: false,*/}
      {/*    headerStyle: {*/}
      {/*      backgroundColor: 'rgb(201,227,152)',*/}
      {/*    },*/}
      {/*    headerTintColor: '#ffffff',*/}
      {/*    headerTitleStyle: {*/}
      {/*      fontWeight: 'bold',*/}
      {/*    },*/}
      {/*    drawerItemStyle: {*/}
      {/*      backgroundColor: 'rgb(216,243,160)',*/}
      {/*      borderRadius: 20,*/}
      {/*    },*/}
      {/*    swipeMinDistance: {*/}
      {/*      marginTop: 20,*/}
      {/*    },*/}
      {/*    drawerStyle: {*/}
      {/*      backgroundColor: 'rgb(98,133,42)',*/}
      {/*    },*/}
      {/*    drawerLabelStyle: {*/}
      {/*      fontSize: 20,*/}
      {/*      fontWeight: '500',*/}
      {/*      color: 'rgb(70,85,31)',*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}
      <Drawer.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          title: 'Платежи',
          drawerIcon: () => Payments,
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(201,227,152)',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerItemStyle: {
            backgroundColor: 'rgb(216,243,160)',
            borderRadius: 20,
          },
          swipeMinDistance: {
            marginTop: 20,
          },
          drawerStyle: {
            backgroundColor: 'rgb(98,133,42)',
          },
          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: '500',
            color: 'rgb(70,85,31)',
          },
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: 'Settings',
          drawerIcon: () => Settings,
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(201,227,152)',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerItemStyle: {
            backgroundColor: 'rgb(216,243,160)',
            borderRadius: 20,
          },
          swipeMinDistance: {
            marginTop: 20,
          },
          drawerStyle: {
            backgroundColor: 'rgb(98,133,42)',
          },
          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: '500',
            color: 'rgb(70,85,31)',
          },
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Messages',
          drawerIcon: () => Messages,
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(201,227,152)',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerItemStyle: {
            backgroundColor: 'rgb(216,243,160)',
            borderRadius: 20,
          },
          swipeMinDistance: {
            marginTop: 20,
          },
          drawerStyle: {
            backgroundColor: 'rgb(98,133,42)',
          },
          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: '500',
            color: 'rgb(70,85,31)',
          },
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: 'Help',
          drawerIcon: () => Help,
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(201,227,152)',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerItemStyle: {
            backgroundColor: 'rgb(216,243,160)',
            borderRadius: 20,
          },
          swipeMinDistance: {
            marginTop: 20,
          },
          drawerStyle: {
            backgroundColor: 'rgb(98,133,42)',
          },
          drawerLabelStyle: {
            fontSize: 20,
            fontWeight: '500',
            color: 'rgb(70,85,31)',
          },
        }}
      />
    </Drawer.Navigator>
  );
}
export default Navbar;
