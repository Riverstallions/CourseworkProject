import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  Text, 
  TextInput, 
  View, 
  Button, 
  StyleSheet, 
  Alert, 
  TouchableOpacity 
} from 'react-native';

import Home from './components/Home';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import HomeLoggedIn from './components/HomeLoggedIn';
import Account from './components/Account';
import Search from './components/Search';
import ViewLocation from './components/ViewLocation';
import Review from './components/Review';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const myIcon = <Ionicons name="rocket" size={30} color="#900" />;

class App extends Component {
  static navigationOptions = {
    header:null,
  };

  render() {
    return (
      <NavigationContainer> 
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} /> 
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="HomeLoggedIn" component={HomeLoggedIn} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="ViewLocation" component={ViewLocation} />
          <Stack.Screen name="Review" component={Review} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default App;
