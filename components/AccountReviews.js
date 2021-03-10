import 'react-native-gesture-handler';
import React, { Component } from 'react';
import styles from './styles';
import { 
    Text, 
    TextInput, 
    View, 
    Button, 
    Alert, 
    TouchableOpacity,
    FlatList,
    List
} from 'react-native';
import { Divider } from 'react-native-elements';

class AccountReviews extends Component{
    constructor(props){
        super(props);
        this.state = {
        first_name: '',
        last_name: '',
        token: global.sessionToken,
        userData: [],
        userID: global.sessionID,
        reviews: [],
        }
    }

    componentDidMount(){
        this.getUserData();
    }

    getUserData = () => {
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
            userData: responseJson
        });
        })
        .then(() => {
        //set the props to be the userData info, for easy override ad reference when updating later.
        this.setState({
            first_name: this.state.userData.first_name,
            reviews: this.state.userData.reviews,
        });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    patchReview = (reviewID, locationID) => {
        //changes the review
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID,
        { 
            method: 'PATCH ',
            headers: { 
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token
            },
            body: JSON.stringify({
                overall_rating: parseInt(this.state.overallrating),
                price_rating: parseInt(this.state.pricerating),
                quality_rating: parseInt(this.state.qualityrating),
                clenliness_rating: parseInt(this.state.clenlinessrating),
                review_body: this.state.reviewbody
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        return(
            <View style={styles.flexbox}>
            <Text style={styles.textCustom}>
            {this.state.userData.first_name}'s Reviews.
            </Text>
            <FlatList
                data={this.state.reviews}
                renderItem={({item}) => (
                    <View>
                        <Text>Location: {item.location.location_name} &nbsp; </Text>
                        <Text>Overall Rating: {item.review.overall_rating} &nbsp; </Text>
                        <Text>Review: {item.review.review_id} &nbsp; </Text>
                        <Text>Location: {item.location.location_id} &nbsp; </Text>
                        <Divider style={{ backgroundColor: 'blue' }}/>
                    </View>
                )}
                keyExtractor={item => item.review.review_id.toString()}
            />
            </View>
        );
    }
}

export default AccountReviews;
