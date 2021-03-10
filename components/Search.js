import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { 
    Text, 
    TextInput, 
    View, 
    Button, 
    Alert, 
    TouchableOpacity,
    FlatList
} from 'react-native';

const heartOutline = <Ionicons name="heart-outline" size={30}/>;
const heart = <Ionicons name="heart" size={30} color={"#8B0000"}/>;

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            token: global.sessionToken,
            userID: global.sessionID,
            locationListData: [],
            isLoading: true,
            viewOne: false,
            oneLocationData: [],
            userFavouriteData: [],
            favourited: false,
            locationID: '',
        }
    }

    componentDidMount(){
        this.listLocations();
        this.getUserFavouriteInfo();
        this.favouritedStatus();
    }

    handleSearchInput = (text) => {
        this.setState({query: text})
    }

    getUserFavouriteInfo = () => {
        //fetches the user data
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + global.sessionID,
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
                userFavouriteData: responseJson.favourite_locations
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    listLocations = () => {
        // handle formatting query here or in handleSearchInput() ^ above
        var newQ = (this.state.query.replace(" ", "%20"));
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

    favouritedStatus(){
        for(let i = 0; i < this.state.userFavouriteData.length; i++){
            console.log(this.state.userFavouriteData[i].location_id);
            if (this.state.userFavouriteData[i].location_id == this.state.locationID){
                this.setState({
                    favourited: true
                })
            } else {
                this.setState({
                    favourited: false
                })
            }
        }
    }

    favouriteLocation = (location_id) => {
        //Favourite a location
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/like',
        { 
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token
            }
        })
        .then(() => {
            this.setState({
                favourited: true,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    unfavouriteLocation = (location_id) => {
        //Unfavourite a location
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/like',
        { 
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'X-Authorization': this.state.token
            }
        })
        .then(() => {
            this.setState({
                favourited: false,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    viewOneLocation = (location_id) => {
        //focuses the view on one location, gets favourite information
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
                locationID: responseJson.location_id,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    iconFavouriteBodyFunc(location_id){
        if (this.state.favourited == false) {
            console.log("Unfavourite")
            iconFavouriteBody = (
                <View style={styles.flexboxAcross}>
                    <Text style={styles.textCustom}>{this.state.oneLocationData.location_name}</Text>
                    <TouchableOpacity
                        onPress={() => this.favouriteLocation(location_id)}
                    >{heartOutline}</TouchableOpacity>
                </View>
            )
        } else if (this.state.favourited == true){
            console.log("Favourite")
            iconFavouriteBody = (
                <View style={styles.flexboxAcross}>
                    <Text style={styles.textCustom}>{this.state.oneLocationData.location_name}</Text>
                    <TouchableOpacity
                        onPress={() => this.unfavouriteLocation(location_id)}
                    >{heart}</TouchableOpacity>
                </View>
            )
        }else {
            console.log("Null")
        }
        return iconFavouriteBody;
    }

    render(){
        if (this.state.viewOne){
            return(
                <View>
                    <View>{this.iconFavouriteBodyFunc(this.state.locationID)}</View>
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

export default Search;
