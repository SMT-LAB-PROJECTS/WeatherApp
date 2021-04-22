import React , { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,Image,
  Text,
  BackHandler,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import dimensions from '../../Constant/WindowDimensions'
const width = dimensions.windowWidth
const height = dimensions.windowHeight
import { BASE_COLOR } from '../../Constant/appColors'


class SplashScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading:false,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('HomeScreen');
    }, 1500);
  }

  UNSAFE_componentWillUnmount() {
   // this.focusListener.remove();
    //this.notificationListener.remove();
  }

  
  UNSAFE_componentWillMount() { 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
  );
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [{
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
          },
          {
              text: 'OK',
              onPress: () => BackHandler.exitApp(),
          },
      ], {
          cancelable: false,
      },
  );
  return true;
  }

 

  render() {
    return (<View style={{ backgroundColor: '#fff', flex:1,justifyContent: "center",alignItems: "center" }}>
       
      <Text style={{color:BASE_COLOR,fontFamily:'Roboto',fontSize:35,fontWeight:'bold'}}>WeatherApp</Text>
      
     
    </View>)
  }
}


export default SplashScreen;