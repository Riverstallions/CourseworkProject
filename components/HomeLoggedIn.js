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

class HomeLoggedIn extends Component{
  constructor(props){
    super(props);
    this.state = {
        first_name: 'TestName',
        last_name: '',
        email: '',
        token: global.sessionToken
    }
}

handleLogOut = (email, password, token) => {
  Alert.alert('Logging In')
  //handles the log in
  console.log(JSON.stringify({
      email: this.state.email,
      password: this.state.password
  }));
  return fetch('http://10.0.2.2:3333/api/1.0.0/user/login',
  { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
      })
  })
  .then((response) => {
      Alert.alert("Logged In.");
  })
  .catch((error) => {
      console.error(error);
  });
  }

    render(){
        return(
            <View>
            <Text> Welcome, {this.first_name}</Text>
              <Button
                  title="View Account"
                  onPress={() => this.props.navigation.navigate('Account')}
              />
              <Button
                title="Search"
                onPress={() => this.props.navigation.navigate('Search')}
              />
              <Button
                title="Log Out"
                onPress={() => this.handleLogOut}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

export default HomeLoggedIn;
