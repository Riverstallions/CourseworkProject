import 'react-native-gesture-handler';
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

    signUp = () => {
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
            this.props.navigation.navigate('SignIn')
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return(
            <View>
                <TextInput style={styles.textCustom} 
                    placeholder="First name"
                    onChangeText = {this.handleFirstName}
                />
                <TextInput style={styles.textCustom} 
                    placeholder="Last name"
                    onChangeText = {this.handleLastName}
                />
                <TextInput style={styles.textCustom} 
                    placeholder="Email"
                    onChangeText = {this.handleEmail}
                />
                <TextInput style={styles.textCustom} 
                    placeholder="Password"
                    secureTextEntry = {true}
                    onChangeText = {this.handlePasswordInput}
                />
                <Button
                    title="Sign Up"
                    onPress={() => this.signUp()}
                />
                <Button
                    title="Log In"
                    onPress={() => this.props.navigation.navigate('SignIn')}
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

export default SignUp;
