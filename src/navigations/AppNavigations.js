import React, { Component } from 'react'
import { Text, View,StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenLogin from '../screens/Login/ScreenLogin'
import ScreenRegister from '../screens/Login/ScreenRegister'
import HomeScreen from '../screens/Home/HomeScreen'
import CartPage from '../screens/Cart/Page/CartPage'
import CheckoutPage from '../screens/Cart/Page/CheckoutPage'
import SettingUserPage from '../screens/User/Page/SettingUserPage'
import CartStatusPage from '../screens/User/CartStatusScreen'

import ProductScreen from '../screens/Product/ProductScreen'

import ShipperScreen from '../screens/Shipper/ShipperScreen'

import CheckoutLoaderPage from '../screens/Load/CheckoutLoaderPage'
export default class AppNavigations extends Component {
    render() {
        const Stack = createStackNavigator()
        return (
            <NavigationContainer>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"default"}/>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    {/* <Stack.Screen name="Login" component={ScreenLogin} />
                    <Stack.Screen name="Register" component={ScreenRegister} /> */}
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="CartPage" component={CartPage} />
                    <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
                    <Stack.Screen name="SettingUserPage" component={SettingUserPage} />
                    <Stack.Screen name="CartStatusPage" component={CartStatusPage} />

                    <Stack.Screen name="ProductScreen" component={ProductScreen} />
                    <Stack.Screen name="ShipperScreen" component={ShipperScreen} />
                    {/* Loading page */}
                    <Stack.Screen name="CheckoutLoaderPage" component={CheckoutLoaderPage} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
