import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './components/Home';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import HomeLoggedIn from './components/HomeLoggedIn';
import Account from './components/Account';
import AccountReviews from './components/AccountReviews';
import AccountReviewOne from './components/AccountReviewOne';
import Search from './components/Search';
import OneReview from './components/OneReview';
import Review from './components/Review';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const myIcon = <Ionicons name="rocket" size={30} color="#900"/>;

class App extends Component {
  static navigationOptions = {
    header:null,
  };

  render() {
    return (
      <NavigationContainer> 
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sign Up" component={SignUp} /> 
          <Stack.Screen name="Log In" component={SignIn} />
          <Stack.Screen name="Home Logged In" component={HomeLoggedIn} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Account Reviews" component={AccountReviews} />
          <Stack.Screen name="Account Review One" component={AccountReviewOne} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Location Review" component={OneReview}/>
          <Stack.Screen name="Review" component={Review} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
