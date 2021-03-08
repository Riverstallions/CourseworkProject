import 'react-native-gesture-handler';
import React, { Component } from 'react';
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

global.thisLocationID;

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

    componentDidMount(){
        this.listLocations();
    }

    handleSearchInput = (text) => {
        this.setState({query: text})
    }

    listLocations = () => {
        // handle formatting query here or in handleSearchInput() ^ above
        var newQ = (this.state.query.replace(" ", "%20"));
        console.log(newQ);
        // filters
        
        return fetch('http://10.0.2.2:3333/api/1.0.0/find?q=' + newQ,
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
        })
        .catch((error) => {
            console.error(error);
        });
    }

    viewOneLocation = (location_id) => {
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
                oneLocationData: responseJson,
            });
            global.thisLocationID = this.state.oneLocationData.location_id;
            console.log(global.thisLocationID);
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
                    <Button 
                        title="Submit Review"
                        onPress={() => this.props.navigation.navigate('Review')}
                    />
                </View>
            );
        }else{
            return(
                <View>
                    <TextInput 
                        style={styles.textCustom} 
                        placeholder="Search..."
                        onChangeText={this.handleSearchInput}
                    />
                    <Button
                        title="Go"
                        onPress={() => this.listLocations()}
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
                        keyExtractor={({location_id}, index) => location_id.toString()}
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
