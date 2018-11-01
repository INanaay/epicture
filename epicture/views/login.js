import React from 'react'
import {Linking, View, TouchableOpacity, Text, WebView, Dimensions} from 'react-native'
import API from '../utils/api'
import {createStackNavigator} from 'react-navigation'
import globalstyle from '../styles'

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

export default class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
           url: ''
        }

    }

    componentDidMount () {

        API.login()
            .then((response) => {



                this.setState({
                    url: response.url
                })
            }, (error) => {
                console.log('error: ', error)
            })
    }

    _onNavigationStateChange(webViewState){
        const url = webViewState.url


        if (url.contains("access_token")) {

            const start_pos = url.indexOf('=') + 1;
            const end_pos = url.indexOf('&', start_pos);
            const token = url.substring(start_pos, end_pos)

            const substring = url.slice(url.indexOf("username=") + "username=".length);
            const end = substring.indexOf('&')
            const name = substring.substring(0, end)


            this.navigateToHomePage(token, name)
        }

    }

    navigateToHomePage(token, name)
    {

        global.token = token;
        global.name = name;
        this.props.navigation.navigate("HomePage", {
        })
    }

    render()
    {


        return (

            <View style={{width: '100%', height: '100%', backgroundColor: '#45c0ff', alignItems: 'center', justifyContent: 'center'}}>

                <WebView style={{width: windowHeight, height: windowHeight}} source={{uri: this.state.url}}
                         onNavigationStateChange={this._onNavigationStateChange.bind(this)}

                >

                </WebView>
            </View>
        )
    }
}

