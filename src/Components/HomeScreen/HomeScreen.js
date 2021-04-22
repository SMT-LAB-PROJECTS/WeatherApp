import React from 'react';
import {
  View, Image,
  Text,
  StatusBar,
  Button,
  ActivityIndicator,
  TouchableOpacity, BackHandler, ScrollView, ImageBackground, Alert, Linking,FlatList,Platform,LogBox,PermissionsAndroid,ToastAndroid,
} from 'react-native';
import dimensions from '../../Constant/WindowDimensions'
const width = dimensions.windowWidth
const height = dimensions.windowHeight
import { BASE_COLOR } from '../../Constant/appColors'
// import styles from './HomeStyle'
import { Container, Header, Content,Title,Left,Right,Body,Spinner, List, ListItem} from 'native-base'
import {connect} from "react-redux";
import Geolocation from 'react-native-geolocation-service';
import {
  getCitiesAsync,
  getCurrentCityAsync,
} from '../../Redux/Slices/city/citySlice';

import Loader from '../Loader/Loader';
import moment from 'moment';
import NotificationPopup from 'react-native-push-notification-popup';

const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
  <Container style={{flex: 1}}>
 <View style={{flex: 1, flexDirection: 'row',position:'absolute',marginTop:-height*0.060,elevation: 0,zIndex: 9999,backgroundColor:'#fff',color:'#000',width:'100%',height:height*0.10,borderWidth:1}}>

 <View style={{width: '33.33%',justifyContent: "center",alignItems: "center"}} >
 <Image style={{width:50,height:50}} source={require('../../assets/img/circlegrey800_800.png')}/>
  </View>
  <View style={{width: '33.33%',justifyContent: "center",alignItems: "center"}} >
        <Text style={{fontSize:20,color:'#000'}}>{appTitle}</Text>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 10,fontWeight:'bold', lineHeight: 30}}>Current Temparature : {body}</Text>
                <Text style={{fontSize: 5, lineHeight: 18}}>{'\u00b0'}</Text>
                <Text style={{fontSize: 10,fontWeight:'bold', lineHeight: 30}}>C</Text>
        </View>
  </View>
  <View style={{width: '33.33%',justifyContent: "center",alignItems: "center"}} >
  <Image style={{width:50,height:50}} source={require('../../assets/img/cloud.png')}/>
  </View>
 </View>

  </Container>
  // <View style={{position:'absolute',paddingTop:0,marginTop:-height*0.050,zIndex: 1000,backgroundColor:'#fff',color:'#000',width:'100%',borderWidth:1}}>
  //   <Text>{title}</Text>
  //   <Text>{body}</Text>
  //   {/* <Button title='My button' onPress={() => console.log('Popup button onPress!')} /> */}
  // </View>
);

 class HomeScreen extends React.Component {

  static navigationOptions = {
    cardStack: {
			//gesturesEnabled: false
      gestureEnabled:false,
		},
     gestureEnabled:false,
     //gesturesEnabled: false,
     swipeEnabled: false
  };

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.getCities = this.getCities.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getCity = this.getCity.bind(this);
    this.checkTemparature  = this.checkTemparature.bind(this);
    this.state={
      loading: false,
      cities:this.props.cities?this.props.cities:[],
      refreshing:false,
      isLoading:false,
      forceLocation: true,
      highAccuracy: true,
      showLocationDialog: true,
      significantChanges: false,
      updatesEnabled: false,
      currentlat:'',
      currentlon:'',
    }
  }

  componentDidMount() {
   
    this.getCurrentLocation();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    })
   let THAT = this;
    this.interval = setInterval(function(){
      THAT.checkTemparature();
 
    }, 1000);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onFocusFunction = () => {
    this.getCurrentLocation();
    // do some stuff on every screen focus
    // if(this.props.navigation.state.params && this.props.navigation.state.params.home){
    
    // }

    if(this.props.navigation.state.routeName=='HomeScreen'){
    
    }

    
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

   checkTemparature(){

    var morningStart = moment('07:56:00am', 'hh:mm:ssa');
    var morningEnd = moment('07:56:01am', 'hh:mm:ssa');
    var noonStart = moment('11:59:59am', 'hh:mm:ssa');
    var noonEnd = moment('12:00:00pm', 'hh:mm:ssa');
    var eveningStart = moment('04:00:00pm', 'hh:mm:ssa');
    var eveningEnd = moment('04:00:01pm', 'hh:mm:ssa');
    var nightStart = moment('08:00:00pm', 'hh:mm:ssa');
    var nightEnd = moment('08:00:01pm', 'hh:mm:ssa');
    var currentTime = moment();

    if(currentTime.isBefore(morningEnd) && currentTime.isAfter(morningStart))
    { 
      //....morning....//
      this.getCity();
    }

    if(currentTime.isBefore(noonEnd) && currentTime.isAfter(noonStart))
    { 
      //....afternoon....//
      this.getCity();
    }

    if(currentTime.isBefore(eveningEnd) && currentTime.isAfter(eveningStart))
    { 
      //....evening....//
      this.getCity();
    }

    if(currentTime.isBefore(nightEnd) && currentTime.isAfter(nightStart))
    { 
      //....night....//
      this.getCity();
    }
  
  }

  getCities(){
    let uData = {
      lat:this.state.currentlat,
      lon:this.state.currentlon
    }
    this.props.getCitiesAsync(uData).then((res) => { 
      this.setState({
        isLoading: false
       });
       
    }).catch(() => {
       this.setState({
        isLoading: false
       });

       
       });
  }

  getCity(){
    let uData = {
      lat:this.state.currentlat,
      lon:this.state.currentlon
    }
    this.props.getCurrentCityAsync(uData).then((res) => { 
      this.setState({
        isLoading: false
       });

       this.popup.show({
        onPress: function() {console.log('Pressed')},
       // appIconSource: require('./assets/icon.jpg'),
        appTitle: 'WeatherApp',
        timeText: 'Now',
        title: this.props.currentCity.name,
        body: parseFloat(this.props.currentCity.main.temp).toFixed(),
        slideOutTime: 9000
      });
       
    }).catch(() => {
       this.setState({
        isLoading: false
       });

       
       });
  }

  handleBackButton(){
    BackHandler.exitApp();
 }

  

  UNSAFE_componentDidUpdate() {
    // A whole lotta functions here, fired after every render.
    
}

  UNSAFE_componentWillMount() { 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  UNSAFE_componentWillUnmount() {
    clearInterval(this.interval);
    this.focusListener.remove()
  }

  handleBackButtonClick() { 
    BackHandler.exitApp();
  }

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getCurrentLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({ loading: false }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
            this.setState({
              currentlat: parseFloat(position.coords.latitude),
              currentlon: parseFloat(position.coords.longitude),
              //isLoading: false,
            },function(){
              this.getCities();
            });

        },
        (error) => {
          this.setState({ loading: false });
          // Alert.alert(`Code ${error.code}`, error.message);
          //Alert.alert(``, error.message);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          //maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };



  render() {
    LogBox.ignoreLogs(['Animated: `ImmutableStateInvariantMiddleware took 60ms, which is more than the warning threshold of 32ms.']);
    LogBox.ignoreLogs(['SerializableStateInvariantMiddleware took 35ms, which is more than the warning threshold of 32ms.If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.']);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
   
    return ( <Container style={{elevation: 0}}>
       
        {/* <Loader loading={this.state.isLoading}  /> */}
        <Header style={{width:width,backgroundColor:BASE_COLOR,paddingTop:40,paddingBottom:30,elevation: 0}}>
        <StatusBar barStyle="light-content"  backgroundColor={'black'} />
        <NotificationPopup
            ref={ref => this.popup = ref}
            renderPopupContent={renderCustomPopup}
            shouldChildHandleResponderStart={true}
            shouldChildHandleResponderMove={true} />
          {/* <Left/> */}
          <Body style={{width:width, flex:1,justifyContent: "center",alignItems: "center" }}>
            <Title style={{textAlign:'center'}}>WeatherApp</Title>
          </Body>
          {/* <Right /> */}
        </Header>
        {/* <Header style={{width:width,backgroundColor:BASE_COLOR}}>
        <Text>WeatherApp</Text> 
        </Header> */}
        <Content padder>
        <List 
          dataArray={this.state.cities}
          renderRow={(item) =>
            <ListItem  onPress={()=>{this.props.navigation.navigate('WeatherDetailScreen',{id:item.id})}} hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
            <Body>
                <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                <Text note>{item.weather[0].description}</Text>
              </Body>
              <Right>
              <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 20,fontWeight:'bold', lineHeight: 30}}>{item.main.temp.toFixed()}</Text>
                <Text style={{fontSize: 11, lineHeight: 18}}>{'\u00b0'}</Text>
                <Text style={{fontSize: 20,fontWeight:'bold', lineHeight: 30}}>C</Text>
            </View>
                {/* <Text style={{fontWeight:'bold',fontSize:20}} note>{item.main.temp}  {'\u00b0'} C</Text> */}
              </Right>
            </ListItem>
      }/>

       
        </Content>
       
        </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cities: state.city.cities,
    currentCity: state.city.currentCity,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      // same effect
      getCitiesAsync : (uData) => dispatch(getCitiesAsync(uData)),
      getCurrentCityAsync : (uData) => dispatch(getCurrentCityAsync(uData)),
  }
};

export default connect( mapStateToProps, mapDispatchToProps)(HomeScreen);