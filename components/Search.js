import 'react-native-gesture-handler'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { Divider } from 'react-native-elements'
import { 
    Text, 
    TextInput, 
    View, 
    Button, 
    TouchableOpacity,
    FlatList,
} from 'react-native'

const heartOutline = <Ionicons name="heart-outline" size={30}/>;
const heart = <Ionicons name="heart" size={30} color={"#8B0000"}/>;
global.LocationData = [];
global.thisLocationID;

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
            locationReviews: [],
            filterOverall: '',
            filterPrice: '',
            filterQuality: '',
            filterClen: '',
            filterMyFave: false,
        }
    }

    // Runs these functions when the page loads
    componentDidMount(){
        this.listLocations();
        this.getUserFavouriteInfo();
        this.favouritedStatus();
    }

    handleSearchInput = (text) => {
        this.setState({query: text})
    }

    // fetch the user information to then return only the favourite_locations JSON data
    getUserFavouriteInfo() {
        //fetches the user favourites
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

    // List the locations during search, default lists them all and reruns when you click "Go" button, with formatted query
    listLocations() {
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
            global.allLocationData = this.state.locationListData;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Runs through the list of users favourite locations and sees if those match with the location ID we are looking for
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
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite',
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
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/favourite',
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
            console.log("ResponseJSON: "+ responseJson);
            global.LocationData = this.state.oneLocationData;
            global.locationID = responseJson.location_id;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    
    iconFavouriteBodyFunc(location_id){
        let iconFavouriteBody;
        if (this.state.favourited == false) {
            iconFavouriteBody = (
                <View style={styles.flexboxAcross}>
                    <Text style={styles.inputTextCustom}>{this.state.oneLocationData.location_name}</Text>
                    <TouchableOpacity
                        onPress={() => this.favouriteLocation(location_id)}
                    >{heartOutline}</TouchableOpacity>
                </View>
            )
        } else if (this.state.favourited == true){
            iconFavouriteBody = (
                <View style={styles.flexboxAcross}>
                    <Text style={styles.inputTextCustom}>{this.state.oneLocationData.location_name}</Text>
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

    // This is to send the user off to view a specific review already submitted
    sendToOneReview = (reviewID) => {
        global.thisReviewID = reviewID;
        this.props.navigation.navigate("Location Review");
    }

    // This is just to set the variable for the locationID before sending the user off to the Review page where they can submit a review, this allows me to make sure the location ID is correct later
    sendToReview() {
        global.thisLocationID = locationID;
        this.props.navigation.navigate("Review");
    }

    render(){
        // show this if the page is set to see the details about one location
        if (this.state.viewOne){
            return(
                <View>
                    <View>{this.iconFavouriteBodyFunc(this.state.locationID)}</View>
                    <Text style={styles.inputTextCustom}>City: {this.state.oneLocationData.location_town} &nbsp; </Text>
                    <Text>Overall rating: {this.state.oneLocationData.avg_overall_rating} &nbsp; </Text>                    
                    <Text>Price rating: {this.state.oneLocationData.avg_price_rating} &nbsp; </Text>
                    <Text>Quality rating: {this.state.oneLocationData.avg_quality_rating} &nbsp; </Text>
                    <Text>Clenliness rating: {this.state.oneLocationData.avg_clenliness_rating} &nbsp; </Text>
                    <Divider style={{ backgroundColor: 'blue' }}/>
                    <FlatList
                        data={this.state.oneLocationData.location_reviews}
                        renderItem={({item}) => (
                            <View>
                                <TouchableOpacity 
                                    onPress={() => this.sendToOneReview(item.review_id)}
                                >
                                <Text>Review ID: {item.review_id} &nbsp; </Text>
                                <Text>Overall rating: {item.overall_rating} &nbsp; </Text>
                                </TouchableOpacity>
                                <Divider style={{ backgroundColor: 'blue' }}/>
                            </View>
                        )}
                        keyExtractor={({review_id}, index) => review_id.toString()}
                    />
                    <Button 
                        title="Submit Review"
                        onPress={() => this.sendToReview()}
                    />
                </View>
            );
            //else show the list of locations, with less data
        }else{
            return(
                <View>
                    <TextInput 
                        style={styles.inputTextCustom} 
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
                            <TouchableOpacity 
                                onPress={() => this.viewOneLocation(item.location_id)}
                            >
                                <Text style={styles.titleText}>{item.location_name}</Text>
                                <View style={styles.flexboxDown}>
                                    <Text>Location ID: {item.location_id} &nbsp; </Text>
                                    <Text>City: {item.location_town} &nbsp; </Text>
                                    <Text>Rating: {item.avg_overall_rating} &nbsp; </Text>
                                </View>
                            </TouchableOpacity>
                            <Divider style={{ backgroundColor: 'blue' }}/>
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
