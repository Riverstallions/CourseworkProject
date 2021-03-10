import 'react-native-gesture-handler';
import React, { Component } from 'react';
import styles from './styles';
import { 
  Text, 
  TextInput, 
  View, 
  Button, 
  Alert, 
  TouchableOpacity,
  FlatList,
  List
} from 'react-native';

class Account extends Component{
  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      token: global.sessionToken,
      userData: [],
      userID: global.sessionID,
      reviews: [],
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  handleEmail = (text) => {
    //validation here
        this.setState({email: text})
    }

    handlePassword = (text) => {
    //validation here
        this.setState({password: text})
    }

    handleFirstName = (text) => {
        this.setState({ first_name: text})
    }

    handleLastName = (text) => {
        this.setState({ last_name: text})
    }

  getUserData = () => {
    //fetches the user data
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + global.sessionID,
    { 
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        userData: responseJson
      });
    })
    .then(() => {
      //set the props to be the userData info, for easy override ad reference when updating later.
      this.setState({
        first_name: this.state.userData.first_name,
        last_name: this.state.userData.last_name,
        email: this.state.userData.email,
        reviews: this.state.userData.reviews,
      });
    })
    .catch((error) => {
        console.error(error);
    });
  }
  
  updateUserData = () => {
    //updates the user data
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + global.sessionID,
    { 
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'X-Authorization': this.state.token
        },
        body: JSON.stringify({
          email: this.state.email,
          first_name: this.state.first_name,
          last_name: this.state.last_name
      })
    })
    //Reruns the getUserData function to update the shown screen
    .then(() => {
      this.props.navigation.navigate("Home Logged In");
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render(){
    return(
      <View style={styles.flexbox}>
        <Text style={styles.textCustom}>
          Hello, {this.state.userData.first_name}
        </Text>
        <View style={styles.changeUserDetails}>
          <Text>First Name: </Text>
          <TextInput 
            placeholder={this.state.userData.first_name}
            onChangeText = {this.handleFirstName}
          />
        </View>
        <View style={styles.changeUserDetails}>
          <Text>Last Name: </Text>
          <TextInput 
            placeholder={this.state.userData.last_name}
            onChangeText = {this.handleLastName}
          />
        </View>
        <View style={styles.changeUserDetails}>
          <Text>Email: </Text>
          <TextInput 
            placeholder={this.state.userData.email}
            onChangeText = {this.handleEmail}
          />
        </View>
        <Button
          title="Update"
          onPress={() => this.updateUserData()}
        />
      </View>
    );
  }
}

export default Account;
