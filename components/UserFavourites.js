import 'react-native-gesture-handler'
import React, { Component } from 'react'
import styles from './styles'
import { 
  Text, 
  View, 
  FlatList,
} from 'react-native'

global.userSessionData;
global.sessionID;

class UserFavourites extends Component{
    constructor(props){
        super(props);
        this.state = {
            userFavouriteData: [],
            userID: global.sessionID,
            token: global.sessionToken,
        }
    }

    componentDidMount(){
        this.getUserData(this.state.userID);
    }

    getUserData = (userid) => {
        //fetches the user data
        return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userid,
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
            console.log("Calling getUserFaveInfo with info: " + responseJson.favourite_locations[1].location_id);
        })
        .then(() => {
            console.log("Calling getUserFaveInfo with info: " + this.state.userFavouriteData.location_id);
            this.getUserFavouriteInfo(this.state.userFavouriteData);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    getUserFavouriteInfo = (favouriteData) => {
        let favouriteBody = (
            <View style={styles.flexboxDown}>
                <Text>Rendered.</Text>
                <FlatList 
                    data={favouriteData}
                    renderItem={({item}) => (
                        <View style={styles.flexboxDown}>
                            <Text style={styles.textCustom}>{item.location_name}</Text>
                            <View style={styles.flexboxDown}>
                                <Text>City: {item.location_town} &nbsp; </Text>
                                <Text>Rating: {item.avg_overall_rating} &nbsp; </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={({location_id}, index) => location_id.toString()}
                />
            </View>
        )
        return favouriteBody;
    }

    render(){
        return(
            <View>
            
            </View>
        );
    }
}

export default UserFavourites;
