import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    Image,
    ListView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import React from "react";
import API from "../utils/api";
import {MaterialIcons} from "@expo/vector-icons";
import globalstyle from "../styles";
import Toast from "react-native-easy-toast";


let windowWidth = Dimensions.get('window').width


/**
 * This is the users images view.
 */

export default class UserImagesPage extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            avatar : null,
            background: null,
            reputation: null,
        }
    }

    componentDidFocus() {
        API.getAccountInfo(global.name, global.token)
            .then((response) => {

                const data = response.data
                console.log(response)
                console.log("Cover = " + response.data)
                this.setState({
                    loading: false,
                    avatar: data.avatar,
                    background: data.cover,
                    reputation: data.reputation

                })
            }, (error) => {
                console.log('error: ', error)
                this.setState({
                    error: true,
                })
            })
    }

    componentDidMount() {

        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.componentDidFocus()),
        ];
    }



    logoutFromImgur()
    {

    }

    render() {


        let {loading, images} = this.state


        if (loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color={"green"}/>
                </View>)
        }


        console.log(this.state.background)


        if (!loading) {
            images =
                    <ImageBackground  source={{uri: this.state.background}}
                                      style={{width: '100%', height: '100%'}}>
                        <View style={{marginTop: 25, height: 200}}>


                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                                <Image style={{width: 100, height: 100, borderRadius: 50, marginTop: 200}} source={{uri: this.state.avatar}}/>
                                <Text style={{color: '#FFF'}}>{global.name}</Text>
                                <Text style={{color: '#FFF'}}> {this.state.reputation} points </Text>

                                <TouchableOpacity onPress={() => this.logoutFromImgur()}
                                    style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center'}}>
                                    <MaterialIcons name="power-settings-new" size={35} color='white'/>
                                    <Text style={{color: '#FFF', fontSize: 25}}>Logout</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </ImageBackground>
        }


        return (
            <View style={{flex: 1, backgroundColor: globalstyle.backgroundColor}}>

                    {images}
                <Toast ref="toast"/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1, backgroundColor: '#474747', borderTopLeftRadius: 6, borderTopRightRadius: 6, padding: 10, flexDirection: "row"

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    descriptionStyle: {
        color: '#FFF'
    },
    rowStyle: {
        marginBottom: 20
    },
    loading: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#474747'
    }

});