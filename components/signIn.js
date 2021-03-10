import 'react-native-gesture-handler'
import React, { Component } from 'react'
import styles from "./styles"
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native'

global.sessionToken = 'Token';
global.sessionID = 'ID';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            token: '',
            loggedIn: false
        };
    }

    handleEmailInput = (text) => {
        //validation here
        this.setState({ email: text })
    }

    handlePasswordInput = (text) => {
        //validation here
        this.setState({ password: text })
    }

    logInFunction = (email, password) => {
        //handles the log in process
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loggedIn: true,
                    token: responseJson.token
                });
                global.sessionToken = responseJson.token;
                global.sessionID = responseJson.id;
                console.log(responseJson.token);
                this.props.navigation.navigate('Home Logged In');
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Incorrect email or password, please try again.");
            });
    }

    render() {
        return (
            <View style={styles.flexboxDown}>
                <TextInput
                    style={styles.inputTextCustom}
                    placeholder="Email"
                    onChangeText={this.handleEmailInput}
                />
                <TextInput
                    style={styles.inputTextCustom}
                    placeholder="Password"
                    onChangeText={this.handlePasswordInput}
                    secureTextEntry={true}
                />
                <View style={styles.flexboxDown}>
                    <TouchableOpacity
                        style={styles.buttonCustom}
                        onPress={() => this.logInFunction()}
                    >
                        <Text style={styles.textCustom}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonCustom}
                        onPress={() => this.props.navigation.navigate('Sign Up')}
                    >
                        <Text style={styles.textCustom}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default SignIn;