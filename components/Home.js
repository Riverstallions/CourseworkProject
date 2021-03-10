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

class Home extends Component{
    render(){
        return(
            <View>
              <Button 
                title="Log In"
                onPress={() => this.props.navigation.navigate('Log In')}
              />
              <Button
                title="Sign Up"
                onPress={() => this.props.navigation.navigate('Sign Up')}
              />
            </View>
        );
    }
}

export default Home;
