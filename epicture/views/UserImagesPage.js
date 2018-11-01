import {
    ActivityIndicator,
    Dimensions,
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

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

/**
 * This is the users images view.
 */

export default class UserImagesPage extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            dataSource: ds,
            loading: true,
            images: [],
            error: false,
        }
    }

    componentDidFocus() {
        API.getUserImages(global.name, global.token)
            .then((response) => {
                this.setState({
                    dataSource: ds.cloneWithRows(response.data),
                    loading: false
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


    deleteImage(hash)
    {
        console.log("Hash = " + hash)
        API.deleteImage(global.name, hash, global.token)
            .then((response) => {
                this.refs.toast.show('Deleted Image');


            }, (error) => {
                console.log(error)
            })
    }


    renderRow(rowData) {

        let link;
        let imgHeight;
        let imgWidth;
        let title = rowData.title;


        if (rowData.hasOwnProperty("images")) {
            if (rowData.images[0].hasOwnProperty("gifv"))
                return null;

            link = rowData.images[0].link
            imgHeight = rowData.images[0].height
            imgWidth = rowData.images[0].width
        }
        else if (rowData.hasOwnProperty("gifv")) {
            link = rowData.gifv
            return null

        }
        else {
            link = rowData.link
            imgHeight = rowData.height
            imgWidth = rowData.width
        }

        imgHeight = imgHeight * windowWidth / imgWidth

        return (
            <View style={styles.rowStyle}>
                <View style={styles.titleContainer}>
                    <View style={{flex: 9, justifyContent: 'center'}}>
                        <Text style={styles.titleStyle}>{title}</Text>
                    </View>

                    <TouchableOpacity style={{flex: 1,}}  onPress={() => this.deleteImage(rowData.deletehash)}>
                        <MaterialIcons name="delete" size={25} color="green"/>
                    </TouchableOpacity>

                </View>
                <Image
                    source={{uri: link}}
                    style={{
                        height: imgHeight, width: windowWidth, resizeMode: 'stretch', flex: 1
                    }}
                />
            </View>
        )
    }


    render() {


        let {loading, images} = this.state


        if (loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color={"green"}/>
                </View>)
        }

        if (this.state.dataSource.getRowCount() === 0)
            return (
                <View style={styles.loading}>
                    <Text style={{fontWeight: 'bold', color: '#FFF'}}>Sorry, there are no results</Text>
                </View>
            )


        if (!loading) {
            images = <ListView
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        }


        return (
            <View style={{flex: 1, backgroundColor: globalstyle.backgroundColor}}>

                <ScrollView style={{flex: 1, marginTop: 20}}>
                    {images}
                </ScrollView>
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