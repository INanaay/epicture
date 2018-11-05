import React from 'react'
import {Linking, View, TouchableOpacity, Text, WebView, Dimensions, StyleSheet} from 'react-native'
import API from '../utils/api'
import {createStackNavigator} from 'react-navigation'
import globalstyle from '../styles'

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height


/**
 * This view is the login View. It is used so the user connects to Imgur via oauth2.
 */

export default class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
           url: ''
        }

    }

    /**
     * This function is called when the view is mounted. It calls the API to get the url containing the access token.
     */

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

    /**
     * We use a webview for the user to connect. We can access the callbakc url and get the token and mickname.
     * @param webViewState
     * @private
     */

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

    /**
     * Function called when token is available
     * @param token
     * @param name
     */

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

            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: globalstyle.backgroundColor}}>




                <WebView style={{width: windowWidth, backgroundColor: globalstyle.backgroundColor, height: windowHeight}} source={{uri: this.state.url}}
                         onNavigationStateChange={this._onNavigationStateChange.bind(this)}

                >


                </WebView>

                <TouchableOpacity style={styles.chooseImageButton} onPress={() => this.props.navigation.navigate("HomePage")}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>Next</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    chooseImageButton: {
        margin: 5,
        width: '50%',
        height: 30,
        backgroundColor: 'green',
        alignItems: 'center', justifyContent: 'center'
    },

});