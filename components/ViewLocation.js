import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    Text, 
    TextInput, 
    View, 
    Button, 
    StyleSheet, 
    Alert, 
    TouchableOpacity,
    FlatList
} from 'react-native';
import Search from './Search';

new Search().locationListData;

class ViewLocation extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            token: global.sessionToken,
            locationData: Search.locationListData,
            isLoading: true
        }
    }

    componentDidMount(){
        this.handleLocationView();
    }
    
    handleLocationView = () => {
        //handles the searching function
        console.log("location data: " +  this.locationData);
        console.log("location list data: " + searchThingy.locationListData);
        //let fetchURL = 'http://10.0.2.2:3333/api/1.0.0/location/' + this.locationData.location_id;
        return fetch('http://10.0.2.2:3333/api/1.0.0/find',
        { 
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token
            }
        })
        .then((responseJson) => {
            this.setState({
              locationData: responseJson,
            });
        })    
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        return(
            <View>
                <Text>Testing Page</Text>
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

export default ViewLocation;
