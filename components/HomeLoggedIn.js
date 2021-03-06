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
        token: global.sessionToken,
        userData: [],
        isLoaded: false
    }
  }

    render(){
      return(
        <View>
          <Button 
            title="View Account"
            onPress={() => this.props.navigation.navigate("Account")}
            />
          <Button 
            title="Search"
            onPress={() => this.props.navigation.navigate("Search")}
            />
          <Button 
            title="Logout"
            onPress={() => this.props.navigation.navigate("Home")}
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
