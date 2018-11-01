import React from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, PermissionsAndroid} from 'react-native'
import globalstyle from '../styles'
import { ImagePicker, Permissions } from 'expo';
import API from '../utils/api'


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class AddImagePage extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
           image: ''
        }
    }
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    _takePhoto = async () => {

        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
        });


        if (!result.cancelled) {
            this.setState({image: result.base64})
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true
        });


        if (!result.cancelled) {
            this.setState({ image: result.base64 });
        }
    };


    _uploadImage()
    {



        API.uploadImage(this.state.image, global.token, 'base64', "lol", "pd", "dfdf")
            .then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error)
            })

    }

    render()
    {
        return (
            <View style={styles.container} >
                <View style={{ marginTop: 22, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center', flexDirection:'row'}}>
                    <TouchableOpacity style={styles.chooseImageButton} onPress={this._pickImage}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>Choose Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chooseImageButton} onPress={this._takePhoto}>
                        <Text style={{fontWeight: 'bold', color: 'white'}}>Take photo</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.chooseImageButton} onPress={this._uploadImage.bind(this)}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>Upload</Text>
                </TouchableOpacity>


            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: globalstyle.backgroundColor
    },
    chooseImageButton: {
        margin: 5,
        width: '50%',
        height: 30,
        backgroundColor: 'green',
        alignItems: 'center', justifyContent: 'center'
    }

});