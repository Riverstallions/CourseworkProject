import 'react-native-gesture-handler'
import React, { Component } from 'react'
import styles from "./styles"
import {
    TextInput, 
    Text,
    View,
    StyleSheet, 
    Alert,
    TouchableOpacity
} from 'react-native'

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    handleEmail = (text) => {
    //validation here
        this.setState({email: text})
    }

    handlePasswordInput = (text) => {
    //validation here
        this.setState({password: text})
    }

    handleFirstName = (text) => {
        this.setState({ first_name: text})
    }

    handleLastName = (text) => {
        this.setState({ last_name: text})
    }

    signUp() {
        //handles the signing up function
        return fetch('http://10.0.2.2:3333/api/1.0.0/user',
        { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(() => {
            this.props.navigation.navigate('Log In')
        })
        .catch((error) => {
            console.error(error);
            Alert.alert("Something went wrong, please make sure you have inputted the correct information.");
        });
    }

    render() {
        return(
            <View  style={styles.flexboxDown}>
                <TextInput style={styles.inputTextCustom} 
                    placeholder="First name"
                    onChangeText = {this.handleFirstName}
                />
                <TextInput style={styles.inputTextCustom} 
                    placeholder="Last name"
                    onChangeText = {this.handleLastName}
                />
                <TextInput style={styles.inputTextCustom} 
                    placeholder="Email"
                    onChangeText = {this.handleEmail}
                />
                <TextInput style={styles.inputTextCustom} 
                    placeholder="Password"
                    secureTextEntry = {true}
                    onChangeText = {this.handlePasswordInput}
                />
                <TouchableOpacity
                    style={styles.buttonCustom}
                    onPress={() => this.signUp()}
                >
                    <Text style={styles.textCustom}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonCustom}
                    onPress={() => this.props.navigation.navigate('Log In')}
                >
                    <Text style={styles.textCustom}>Log In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SignUp;
