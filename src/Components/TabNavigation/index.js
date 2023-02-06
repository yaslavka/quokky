import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import DashboardScreen from "../../screens/DashboardScreen";
import Svg, {Path} from "react-native-svg";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SearchScreen from "../../screens/SearchScreen";
import SettingScreen from "../../screens/SetingScreen";
import CartScreen from "../../screens/CartScreen";
import MapScreen from "../../screens/MapScreen";

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();
function TabNavigator(){
    const Home = <Svg width={30} height={30} fill="#335616"
        focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CabinIcon" tabIndex="-1" title="Cabin">
        <Path d="M10 1c0 1.66-1.34 3-3 3-.55 0-1 .45-1 1H4c0-1.66 1.34-3 3-3 .55 0 1-.45 1-1h2zm2 2L6 7.58V6H4v3.11L1 11.4l1.21 1.59L4 11.62V21h16v-9.38l1.79 1.36L23 11.4 12 3zm1.94 4h-3.89L12 5.52 13.94 7zm-6.5 2h9.12L18 10.1v.9H6v-.9L7.44 9zM18 13v2H6v-2h12zM6 19v-2h12v2H6z"/>
    </Svg>
    const Search = <Svg width={30} height={30} fill="#335616"
        focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchIcon" tabIndex="-1" title="Search">
        <Path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </Svg>
    const Cart = <Svg width={30} height={30} fill="#335616"
        focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShoppingCartIcon" tabIndex="-1"
        title="ShoppingCart">
        <Path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
    </Svg>
    const Settings = <Svg width={30} height={30} fill="#335616"
        focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SettingsIcon" tabIndex="-1"
        title="Settings">
        <Path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </Svg>
    return(
        <>
            <Tab.Navigator>
                <Tab.Screen
                    component={DashboardScreen}
                    name="Dashboard"
                    options={{
                        headerShown: false,
                        tabBarLabel: "Home",
                        tabBarLabelStyle:{
                            fontSize: 10,
                            fontWeight: '500',
                            color:'rgb(70,85,31)'
                        },
                        tabBarIcon:()=>(
                            Home
                        )
                    }}
                />
                <Tab.Screen
                    component={SearchScreen}
                    name="Search"
                    options={{
                        headerShown: false,
                        tabBarLabel: "Search",
                        tabBarLabelStyle:{
                            fontSize: 10,
                            fontWeight: '500',
                            color:'rgb(70,85,31)'
                        },
                        tabBarIcon:()=>(
                            Search
                        )
                    }}
                />
                <Tab.Screen
                    component={CartScreen}
                    name="Cart"
                    options={{
                        headerShown: false,
                        tabBarLabel: "Cart",
                        tabBarLabelStyle:{
                            fontSize: 10,
                            fontWeight: '500',
                            color:'rgb(70,85,31)'
                        },
                        tabBarIcon:()=>(
                            Cart
                        )
                    }}
                />
                <Tab.Screen
                    component={SettingScreen}
                    name="Settings"
                    options={{
                        headerShown: false,
                        tabBarLabel: "Settings",
                        tabBarLabelStyle:{
                            fontSize: 10,
                            fontWeight: '500',
                            color:'rgb(70,85,31)'
                        },
                        tabBarIcon:()=>(
                            Settings
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}
export default TabNavigator
