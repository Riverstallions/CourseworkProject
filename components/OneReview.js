import 'react-native-gesture-handler'
import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { Divider } from 'react-native-elements'
import {
  Text,
  View,
  Alert
} from 'react-native'

const starOutline = <Ionicons name='star-outline' size={20} />
const star = <Ionicons name='star' size={20} color='#FFD700' />
global.thisLocationID
global.thisReviewID
global.LocationData

class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locationID: global.thisLocationID,
      token: global.sessionToken,
      reviewID: global.thisReviewID,
      oneLocationData: global.LocationData,
      reviewBodyInfo: global.LocationData.location_reviews
    }
  }

  getReviewPhoto () {
    // /location/{loc_id}/review/{rev_id}/photo
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + this.state.oneLocationData.location_id + '/review/' + this.state.reviewID + '/photo',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          reviewPhoto: responseJson
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  getOneReview () {
    let oneReviewBody
    for (let i = 0; i < this.state.oneLocationData.location_reviews.length; i++) {
      if (this.state.oneLocationData.location_reviews[i].review_id.toString() == this.state.reviewID.toString()) {
        oneReviewBody = (
          <View style={styles.flexbox}>
            <Text style={styles.inputTextCustom}>Overall Rating: {this.state.oneLocationData.location_reviews[i].overall_rating}</Text>
            <Text style={styles.inputTextCustom}>Price Rating: {this.state.oneLocationData.location_reviews[i].price_rating}</Text>
            <Text style={styles.inputTextCustom}>Quality Rating: {this.state.oneLocationData.location_reviews[i].quality_rating}</Text>
            <Text style={styles.inputTextCustom}>Cleanliness Rating: {this.state.oneLocationData.location_reviews[i].clenliness_rating}</Text>
            <Text style={styles.inputTextCustom}>Comments: {this.state.oneLocationData.location_reviews[i].review_body}</Text>
            <Text style={styles.inputTextCustom}>Likes: {this.state.oneLocationData.location_reviews[i].likes}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
          </View>
        )
        break
      } else {
        oneReviewBody = (
          <View style={styles.flexbox}>
            <Text style={styles.textCustom}>Not found.</Text>
          </View>
        )
      }
    }

    return oneReviewBody
  }

  render () {
    return (
      <View style={styles.flexbox}>
        <View style={styles.flexboxDown}>
          {this.getOneReview()}
        </View>
      </View>
    )
  }
}

export default Review
