import React from 'react';
import {ListView, View, Image, Dimensions, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, TouchableWithoutFeedback} from 'react-native'
import {MaterialIcons } from '@expo/vector-icons/'
import API from '../utils/api'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import globalstyle from '../styles'
import {SearchBar} from 'react-native-elements'
import FavoritesPage from "./FavoritesPage";
import UserImagesPage from "./UserImagesPage";
import AddImagePage from "./AddImagePage";
import Toast, {DURATION} from 'react-native-easy-toast'

let windowWidth = Dimensions.get('window').width

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})


/**
 * This is the Home view.
 */

class HomePage extends React.Component {


    constructor (props) {
        super(props)

        const images = this.props.navigation.state.params.images

        this.state = {
            dataSource: ds.cloneWithRows(images),
            loading: false,
            images: [],
            searchText: '',
        }
    }



    /**
     * Function called when user pressed the favorite button.
     * @param id
     * @param isAlbum
     */
    favoriteImage(id, isAlbum) {


        console.log("SALUT")
            API.favoriteImage(id, global.token)
                .then((response) => {
                    console.log(response)
                    if (response.success === true)
                    {
                        if (response.data === "favorited")
                            this.refs.toast.show('Image Favorited');
                        else
                            this.refs.toast.show('Image Unfavorited');

                    }
                }, (error) => {
                    console.log("Error: ", error)
                })
    }


    /**
     *  We first must check if the image is a gif, album of image. For now, we dont handle gifs.
     * @param rowData
     * @returns {*}
     */

    renderRow (rowData) {


        let link;
        let imgHeight;
        let imgWidth;
        let title = rowData.description;
        let isAlbum = false;
        let ImageRender;

        console.log(title)

            link = rowData.link
            imgHeight = rowData.height
            imgWidth = rowData.width
        imgHeight = imgHeight * windowWidth / imgWidth

        ImageRender =
                <Image
                    source={{ uri: link }}
                    style={{ height: imgHeight, width: windowWidth, resizeMode: 'stretch', flex: 1
                    }}
                />



        return (

            <View style={styles.rowStyle} >
                <View style={styles.titleContainer}>
                    <View style={{flex: 9, justifyContent: 'center'}}>
                        <Text style={styles.titleStyle}>{title}</Text>
                    </View>

                    <TouchableOpacity style={{flex: 1, }} onPress={() => this.favoriteImage(rowData.id, isAlbum)}>
                        <MaterialIcons name="favorite" size={25} color='green' />
                    </TouchableOpacity>
                </View>
                {ImageRender}
            </View>
        )
    }

    render () {
        let { loading, images } = this.state
        if (loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color={"green"}/>
                </View>)
        }
        if (!loading) {
            images = <ListView
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)} />
        }


        return (
            <View style={{flex: 1, backgroundColor: globalstyle.backgroundColor}}>

                <ScrollView style={{flex: 1, }}>
                    {images}
                </ScrollView>
                <Toast ref="toast"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {flex: 1, backgroundColor: '#474747', borderTopLeftRadius: 6, borderTopRightRadius: 6, padding: 10, flexDirection: "row"

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
        backgroundColor: '#474747'}

});


/**
 * This is the bottom menu. It is a TabNavigator. Each time the user switches tab,
 * the whole page is rendered again, so the images are refreshed.
 *
 * Depending on the routeName, we choose an icon for the bottom menu
 */

export default HomePage = createBottomTabNavigator ({



        HomePage: {
            screen: HomePage

        },
        Favorites: {
            screen: FavoritesPage,
        },
        UserImages: {
            screen: UserImagesPage
        },
        AddImagePage: {
            screen: AddImagePage
        },

    },
    {

        navigationOptions: ({navigation}) => ({


            tabBarIcon: ({tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;

                if (routeName === "HomePage") {
                    iconName = "home"
                }
                else if (routeName === "Favorites")
                    iconName = "favorite"
                else if (routeName === "UserImages")
                    iconName = "collections"
                else if (routeName === "AddImagePage")
                    iconName =  "add-a-photo"

                return <MaterialIcons name={iconName} size={25} color={tintColor} />
            },
            tabBarOptions: {
                showLabel: false, // hide labels
                activeTintColor: 'green',
                inactiveTintColor: 'white',


                style: {
                    backgroundColor: '#474747' // TabBar background
                }

            }

        })
    })