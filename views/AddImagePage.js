import React from 'react';
import {View, StyleSheet, TextInput, Text, TouchableOpacity, PermissionsAndroid} from 'react-native'
import globalstyle from '../styles'
import { ImagePicker, Permissions } from 'expo';
import API from '../utils/api'
import { TextField } from 'react-native-material-textfield';
import Toast, {DURATION} from 'react-native-easy-toast'


export default class AddImagePage extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
           image: null,
            title: '',
            description: ''
        }
    }

    /**
     * We need to ask the user the permissions to access its galery and camera
     * @returns {Promise<void>}
     */

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


    /**
     * Once a image is chosen, it is uploaded to imgur.
     * @private
     */
    _uploadImage()
    {

        if (this.state.image === null) {
            this.refs.toast.show('No image selected');
            return;
        }


        this.refs.toast.show('Uploading image ...');
        API.uploadImage(this.state.image, global.token, this.state.title, this.state.description)
            .then((response) => {
                console.log(response)
                if (response.success === true)
                    this.refs.toast.show('Succesfully uploaded image');

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

                <View style={{flex: 2}}>
                <TextField label={"Title"}
                           baseColor={'#FFF'}
                           textColor={'white'}
                           tintColor={'white'}
                           onChangeText={(title) => this.setState({title})}
                />
                    <TextField label={"Description"}
                               baseColor={'#FFF'}
                               textColor={'white'}
                               tintColor={'white'}
                               onChangeText={(description) => this.setState({description})}
                    />
                </View>


                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <TouchableOpacity style={styles.uploadButton} onPress={this._uploadImage.bind(this)}>
                        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>Upload</Text>
                    </TouchableOpacity>
                </View>
                <Toast ref="toast"/>


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
        borderRadius: 10,
        marginTop: 20,
        margin: 5,
        width: '50%',
        height: 40,
        backgroundColor: 'green',
        alignItems: 'center', justifyContent: 'center'
    },
    uploadButton: {
        borderRadius: 10,
        margin: 5,
        width: '80%',
        height: 50,

        backgroundColor: 'green',
        alignItems: 'center', justifyContent: 'center'
    },
    text: {
        color: 'white'
    }

});