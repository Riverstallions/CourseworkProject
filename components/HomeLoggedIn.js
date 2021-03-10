import 'react-native-gesture-handler';
import React, { Component } from 'react';
import styles from './styles';
import { 
  Text, 
  TextInput,
  View, 
  Button,
  Alert, 
  TouchableOpacity 
} from 'react-native';

class HomeLoggedIn extends Component{
  constructor(props){
    super(props);
    this.state = {
        first_name: 'TestName',
        last_name: '',
        email: '',
        token: global.sessionToken,
        userData: [],
        isLoaded: false
    }
  }

  LogOut = () => {
    //handles the log out process:
    //API end point for logout, with the Authorisation header
    //Sets the loggedIn status to false, empties both the global and local token variables,
    //Navigates to the Home screen
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout',
    { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        },
    })
    .then(() => {
        this.setState({
            loggedIn: false,
            token: ''
        });
        this.props.navigation.navigate('Home');
        global.sessionToken= '';
    })
    .catch((error) => {
        console.error(error);
    });
  }

    render(){
      return(
        <View>
          <Button
            title="View Account"
            onPress={() => this.props.navigation.navigate("Account")}
          />
          <Button
            title="View My Reviews"
            onPress={() => this.props.navigation.navigate("Account Reviews")}
          />
          <Button
            title="Search"
            onPress={() => this.props.navigation.navigate("Search")}
          />
          <Button
            title="Logout"
            onPress={() => this.LogOut()}
          />
        </View>
      );
    }
}

export default HomeLoggedIn;
