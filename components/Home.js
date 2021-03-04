import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

class Home extends Component{
    render(){
        return(
            <View>
              <Button
                  title="Log In"
                  onPress={() => this.props.navigation.navigate('SignIn')}
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

export default Home;
