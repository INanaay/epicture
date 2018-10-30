import React from 'react';
import {ListView, View, Image, Dimensions, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import {MaterialIcons } from '@expo/vector-icons/'
import API from '../utils/api'
import {createBottomTabNavigator} from 'react-navigation'

let windowWidth = Dimensions.get('window').width

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class HomePage extends React.Component {

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <MaterialIcons name="favorite" size={25} color="green"/>
        ),
        tabBarOptions: {
            showLabel: false, // hide labels
            activeTintColor: '#474747', // active icon color
            inactiveTintColor: '#586589',  // inactive icon color
            style: {
                backgroundColor: '#474747' // TabBar background
            }

        }
    }

    constructor (props) {
        super(props)
        this.state = {
            dataSource: ds,
            loading: true,
            images: []
        }
    }
    componentDidMount () {

        API.getViral()
            .then((response) => {
                console.log(response)
                this.setState({
                    dataSource: ds.cloneWithRows(response.data),
                    loading: false
                })
            }, (error) => {
                console.log('error: ', error)
            })
    }

    renderRow (rowData) {

      let link;
      let imgHeight;
      let imgWidth;
      let title = rowData.title;


        if (rowData.hasOwnProperty("images"))
        {
            if (rowData.images[0].hasOwnProperty("gifv"))
                return null;

            link = rowData.images[0].link
            imgHeight = rowData.images[0].height
            imgWidth = rowData.images[0].width
        }
        else if (rowData.hasOwnProperty("gifv"))
        {
            link = rowData.gifv
            return null

        }
        else {
            link = rowData.link
            imgHeight = rowData.height
            imgWidth = rowData.width
        }


        imgHeight = imgHeight * windowWidth / imgWidth

        console.log(link)
        console.log(title)


        return (
               <View style={styles.rowStyle} >
                   <View style={styles.titleContainer}>
                       <View style={{flex: 9, justifyContent: 'center'}}>
                           <Text style={styles.titleStyle}>{title}</Text>
                       </View>

                       <TouchableOpacity style={{flex: 1, }}>
                           <MaterialIcons name="favorite" size={25} color="green" />
                       </TouchableOpacity>
                   </View>
                   <Image
                        source={{ uri: link }}
                        style={{ height: imgHeight, width: windowWidth, resizeMode: 'stretch', flex: 1
                        }}
                   />
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
            <View style={{flex: 1, marginTop: 20}}>

                <ScrollView style={{flex: 1, backgroundColor: '#1c1c1c'}}>
                    {images}
                    </ScrollView>
    </View>
    )
    }
}

const styles = StyleSheet.create({
    titleContainer: {flex: 1, backgroundColor: '#474747', borderRadius: 6, padding: 10, flexDirection: "row"

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

export default HomePage = createBottomTabNavigator ({
    HomePage: {
        screen: HomePage

    },
    Search: {
        screen: HomePage
    }
})