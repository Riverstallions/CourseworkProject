import 'react-native-gesture-handler'
import React, { Component } from 'react'
import styles from './styles'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

class Home extends Component {
  render () {
    return (
      <View style={styles.flexboxDownSmall}>
        <TouchableOpacity
          style={styles.buttonCustom}
          onPress={() => this.props.navigation.navigate('Log In')}
        >
          <Text style={styles.textCustom}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCustom}
          onPress={() => this.props.navigation.navigate('Sign Up')}
        >
          <Text style={styles.textCustom}>Sign Up </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Home
