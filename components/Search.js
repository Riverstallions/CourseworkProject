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

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            token: global.sessionToken,
            locationListData: [],
            isLoading: true,
            viewOne: false,
            oneLocationData: []
        }
    }

    handleSearchInput = (text) => {
        this.setState({query: text})
    }

    listLocations = () => {
        console.log("Search token: " + this.state.token);
        return fetch('http://10.0.2.2:3333/api/1.0.0/find',
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
                locationListData: responseJson
            });
            console.log("Location list data retrieved");
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount(){
        this.listLocations();
    }
    
    searchLocations = () => {
        //handles the searching function
        return fetch('http://10.0.2.2:3333/api/1.0.0/find',
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
              locationListData: responseJson,
            });
        })    
        .catch((error) => {
            console.error(error);
        });
    }

    viewOneLocation = (location_id) => {
        console.log("LocID: " + location_id);
        //focuses the view on one location
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id,
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
                viewOne: true,
                oneLocationData: responseJson
            });
            console.log(responseJson)
            console.log("viewOne done.")
        })    
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        if (this.state.viewOne){
            return(
                <View>
                    <Text style={styles.textCustom}>{this.state.oneLocationData.location_name} </Text>
                    <Text>City: {this.state.oneLocationData.location_town}, &nbsp; </Text>
                    <Text>Overall rating: {this.state.oneLocationData.avg_overall_rating}. &nbsp; </Text>
                    
                    <Button title="Submit Review"/>
                </View>
            );
        }else{
            return(
                <View>
                    <TextInput 
                        style={styles.textCustom} 
                        placeholder="Search..."
                        onChangeText = {this.searchLocations}
                    />
                    <Button
                        title="Go"
                        onPress={() => this.listLocations}
                    />
                    <FlatList
                        data={this.state.locationListData}
                        renderItem={({item}) => (
                            <View>
                                <Button 
                                    title={item.location_name}
                                    onPress={() => this.viewOneLocation(item.location_id)}
                                />
                                <Text>
                                    <Text>Location ID: {item.location_id}, &nbsp; </Text>
                                    <Text>City: {item.location_town}, &nbsp; </Text>
                                    <Text>Rating: {item.avg_overall_rating}. &nbsp; </Text>
                                </Text>
                            </View>
                        )}
                        keyExtractor={({location_id}, index) => location_id}
                    />
                </View>
            );
        }
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
        fontSize: 20,
    }
});

export default Search;
