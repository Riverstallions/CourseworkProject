import 'react-native-gesture-handler'
import React, { Component } from 'react'
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Divider } from 'react-native-elements'
import { 
    Text, 
    TextInput, 
    View, 
    Button, 
    Alert, 
    TouchableOpacity,
} from 'react-native'


const starOutline = <Ionicons name="star-outline" size={30}/>;
const star = <Ionicons name="star" size={30} color={"#FFD700"}/>;
global.thisReviewID;
global.userSessionData;
global.thisLocationID;

class AccountReviewOne extends Component{
    constructor(props){
        super(props);
        this.state = {
            token: global.sessionToken,
            userData: global.userSessionData,
            userID: global.sessionID,
            reviews: [],
            reviewID: global.thisReviewID,
            updateReviewPage: false,
            locationID: global.thisLocationID,
            overallrating: '1',
            pricerating: '1',
            qualityrating: '1',
            clenlinessrating: '1',
            reviewbody: '',
        }
    }

    oneStar = (variable) => {
        //hey now, you're a one star
        if (variable == "overallrating") {
            this.setState({
                overallrating: '1',
            });
        } else if (variable == "pricerating") {
            this.setState({
                pricerating: '1',
            });
        } else if (variable == "qualityrating") {
            this.setState({
                qualityrating: '1',
            });
        } else if (variable == "clenlinessrating") {
            this.setState({
                clenlinessrating: '1',
            });
        } else {
            // I don't know, return an error I guess
        }
    }

    twoStar = (variable) => {
        //hey now, you're a two star
        if (variable == "overallrating") {
            this.setState({
                overallrating: '2',
            });
        } else if (variable == "pricerating") {
            this.setState({
                pricerating: '2',
            });
        } else if (variable == "qualityrating") {
            this.setState({
                qualityrating: '2',
            });
        } else if (variable == "clenlinessrating") {
            this.setState({
                clenlinessrating: '2',
            });
        } else {
            // I don't know, return an error I guess
        }
    }

    threeStar = (variable) => {
        //hey now, you're a three star
        if (variable == "overallrating") {
            this.setState({
                overallrating: '3',
            });
        } else if (variable == "pricerating") {
            this.setState({
                pricerating: '3',
            });
        } else if (variable == "qualityrating") {
            this.setState({
                qualityrating: '3',
            });
        } else if (variable == "clenlinessrating") {
            this.setState({
                clenlinessrating: '3',
            });
        } else {
            // I don't know, return an error I guess
        }
    }

    fourStar = (variable) => {
        //hey now, you're a four star
        if (variable == "overallrating") {
            this.setState({
                overallrating: '4',
            });
        } else if (variable == "pricerating") {
            this.setState({
                pricerating: '4',
            });
        } else if (variable == "qualityrating") {
            this.setState({
                qualityrating: '4',
            });
        } else if (variable == "clenlinessrating") {
            this.setState({
                clenlinessrating: '4',
            });
        } else {
            // I don't know, return an error I guess
        }
    }

    fiveStar = (variable) => {
        //hey now, you're an all star
        if (variable == "overallrating") {
            this.setState({
                overallrating: '5',
            });
        } else if (variable == "pricerating") {
            this.setState({
                pricerating: '5',
            });
        } else if (variable == "qualityrating") {
            this.setState({
                qualityrating: '5',
            });
        } else if (variable == "clenlinessrating") {
            this.setState({
                clenlinessrating: '5',
            });
        } else {
            // I don't know, return an error I guess
        }
    }

    iconBodyFunc = (text, rating) => {
        if (rating == 0) {
            iconBody = (
                <View style={styles.flexboxAcross}>
                    <TouchableOpacity 
                        onPress={() => this.oneStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.twoStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.threeStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.fourStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => this.fiveStar(text)}
                    >{starOutline}</TouchableOpacity>
                </View>
            )
        } else if (rating == 1){
            iconBody = (
                <View style={styles.flexboxAcross}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.oneStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.twoStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.threeStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fourStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fiveStar(text)}
                    >{starOutline}</TouchableOpacity>
                </View>
            )
        } else if (rating == 2){
            iconBody = (
                <View style={styles.flexboxAcross}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.oneStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.twoStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.threeStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fourStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fiveStar(text)}
                    >{starOutline}</TouchableOpacity>
                </View>
            )
        } else if (rating == 3){
            iconBody = (
                <View style={styles.flexboxAcross}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.oneStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.twoStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.threeStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fourStar(text)}
                    >{starOutline}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fiveStar(text)}
                    >{starOutline}</TouchableOpacity>
                </View>
            )
        } else if (rating == 4){
            iconBody = (
                <View style={styles.flexboxAcross}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.oneStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.twoStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.threeStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fourStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fiveStar(text)}
                    >{starOutline}</TouchableOpacity>
                </View>
            )
        } else {
            iconBody = (
                <View style={styles.flexboxAcross}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.oneStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.twoStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.threeStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fourStar(text)}
                    >{star}</TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.fiveStar(text)}
                    >{star}</TouchableOpacity>
                </View>
            )
        }
        return iconBody;
    }

    viewOneReview = (userData, reviewID) => {
        let oneReviewBody;
        for(let i = 0; i < userData.reviews.length; i++){
            if (userData.reviews[i].review.review_id == reviewID){
                oneReviewBody = (
                    <View style={styles.flexbox}>
                        <Text style={styles.inputTextCustom}>Overall Rating: {userData.reviews[i].review.overall_rating}</Text>
                        <Text style={styles.inputTextCustom}>Price Rating: {userData.reviews[i].review.price_rating}</Text>
                        <Text style={styles.inputTextCustom}>Quality Rating: {userData.reviews[i].review.quality_rating}</Text>
                        <Text style={styles.inputTextCustom}>Cleanliness Rating: {userData.reviews[i].review.clenliness_rating}</Text>
                        <Text style={styles.inputTextCustom}>Comments: {userData.reviews[i].review.review_body}</Text>
                        <Text style={styles.inputTextCustom}>Likes: {userData.reviews[i].review.likes}</Text>
                        <Divider style={{ backgroundColor: 'blue' }}/>
                    </View>
                )
                break;
            } else {
                oneReviewBody = (
                    <View style={styles.flexbox}>
                        <Text style={styles.textCustom}>Not found.</Text>
                    </View>
                )
            }
        }
        return oneReviewBody;
    }

    handleReviewbody = (text) => {
        this.setState({reviewbody: text})
    }

    updateReviewPage = () => {
        this.setState({
            updateReviewPage: true,
        })
    }

    patchReview = (locationID, reviewID) => {
        //update the review
        console.log(this.state.overallrating + ", " + this.state.pricerating + ", " + this.state.qualityrating + ", " + this.state.clenlinessrating + ", " + this.state.reviewbody)
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID,
        { 
            method: 'PATCH',
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
        .then(() => {
            Alert.alert("Updated this review");
            this.props.navigation.navigate('Home Logged In');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    deleteReview = (locationID, reviewID) => {
        //delete the review
        return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locationID + '/review/' + reviewID,
        { 
            method: 'DELETE',
            headers: { 
            'Content-Type': 'application/json',
            'X-Authorization': this.state.token
            }
        })
        .then(() => {
            Alert.alert("Deleted this review");
            this.props.navigation.navigate('Home Logged In');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        if (this.state.updateReviewPage == false){
            return(
                <View style={styles.flexboxDown}>
                    <View style={styles.flexboxAcross}>
                        {this.viewOneReview(this.state.userData, this.state.reviewID)}
                    </View>
                    <Button
                        title="Change Review"
                        onPress={() => this.updateReviewPage()}
                    />
                    <Button
                        title="Delete Review"
                        onPress={() => this.deleteReview(this.state.locationID, this.state.reviewID)}
                    />
                </View>
            );
        } else {
            return(
                <View style={styles.flexbox}>
                    <View style={styles.flexboxDown}>
                        <View style={styles.flexboxAcross}>
                            <Text style={styles.inputTextCustom}>Overall Rating:</Text>
                            {this.iconBodyFunc('overallrating', this.state.overallrating)}
                        </View>
                        <View style={styles.flexboxAcross}>
                            <Text style={styles.inputTextCustom}>Price Rating: </Text>
                            {this.iconBodyFunc('pricerating', this.state.pricerating)}
                        </View>
                        <View style={styles.flexboxAcross}>
                            <Text style={styles.inputTextCustom}>Quality Rating: </Text>
                            {this.iconBodyFunc('qualityrating', this.state.qualityrating)}
                        </View>
                        <View style={styles.flexboxAcross}>
                            <Text style={styles.inputTextCustom}>Cleanliness Rating: </Text>
                            {this.iconBodyFunc('clenlinessrating', this.state.clenlinessrating)}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.inputTextCustom}>Comments: </Text>
                        <TextInput 
                            style={styles.textInput} 
                            multiline={true}
                            onChangeText={this.handleReviewbody} 
                        ></TextInput>
                    </View>
                    <Button
                        title="Update"
                        onPress={() => this.patchReview(this.state.locationID, this.state.reviewID)}
                    />
                </View>
            );
        }
    }
}

export default AccountReviewOne;
