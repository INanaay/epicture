import React from 'react'
import {createStackNavigator} from 'react-navigation'
import LoginScreen from "../views/login";
import globalstyle from '../styles'
import HomePage from "../views/HomePage";
import SearchPage from "../views/SearchPage";

export default Application = createStackNavigator ({

    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    },
    HonePage: {
        screen: HomePage,
        navigationOptions: globalstyle.navigationOptions
    },
    SearchPage: {
        screen: SearchPage,
        navigationOptions:
            {
                headerStyle: {
                    backgroundColor: globalstyle.backgroundColor
                },
                headerTintColor: '#fff',
            },
    }

})