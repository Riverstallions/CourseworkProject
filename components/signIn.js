import React, { Component } from 'react';
import { 
    Text, 
    TextInput,
    View, 
    Button, 
    StyleSheet, 
    Alert, 
    TouchableOpacity 
  } from 'react-native';

global.sessionToken = 'Test';

class SignIn extends Component{
    constructor(props){
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
    this.setState({email: text})
    }

    handlePasswordInput = (text) => {
    //validation here
    this.setState({password: text})
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
            this.props.navigation.navigate('HomeLoggedIn');
            console.log("Log in token: " + global.sessionToken);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return(
            <View>
                <TextInput 
                    style={styles.textCustom} 
                    placeholder="Email"
                    onChangeText = {this.handleEmailInput}
                />
                <TextInput 
                    style={styles.textCustom} 
                    placeholder="Password"
                    onChangeText = {this.handlePasswordInput}
                    secureTextEntry = {true}
                />
                <Button
                    title="Log In"
                    onPress={() => this.logInFunction()}
                />
                <Button
                    title="Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexbox: {
        flex: 1,
        flexDirection: "row",
    },
    flexboxSide: {
        flexDirection: "column",
        flex: .5
    },
    buttonCustom: {
        elevation: 1,
        backgroundColor: "#815481",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    textCustom: {
        fontSize: 15,
    }
});

export default SignIn;