import React from 'react'
import {createStackNavigator} from 'react-navigation'
import LoginScreen from "../views/login";
import globalstyle from '../styles'
import HomePage from "../views/HomePage";
import SearchPage from "../views/SearchPage";
import AlbumPage from "../views/AlbumPage";

/**
 * This is the main stack navigator. The home page is the login screen. Once logged in,
 * we move to the HomePage. The search Page is also in that navigator.
 */

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
    },
    AlbumPage: {
        screen: AlbumPage,
        navigationOptions:
            {
                headerStyle: {
                    backgroundColor: globalstyle.backgroundColor
                },
                headerTintColor: '#fff',
            },
    }

})