/* jshint ignore:start */

import React, { Component } from 'react';
import {  View,ActivityIndicator,Text,StyleSheet,Modal,TouchableOpacity } from 'react-native';
import styles from './LoaderScreenStyle'

export default class Loader extends Component {

  constructor(props){
    super(props);
    this.animationType = 'none';

    this.state={
      animating: true,
      text:this.props.text?this.props.text:''
    }
  }

  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 60000)

  componentDidMount = () => this.closeActivityIndicator()
  
  render() {
    const animating = this.state.animating
    return (
      <Modal
        transparent={true}
        animationType={this.animationType}
        visible={true}>
        {/* onRequestClose={() => console.log(this.animationType)  }> */}
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Text style={{color:'red'}}>{this.state.text}</Text>
            <ActivityIndicator
              animating={true} size="large" color="black" />
          </View>
        </View>
      </Modal>
    );
  }
}


