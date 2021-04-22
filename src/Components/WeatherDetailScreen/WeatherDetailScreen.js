import React from 'react';
import {
  View, Image,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity, BackHandler, ScrollView, ImageBackground, Alert, Linking,FlatList,Platform,LogBox,PermissionsAndroid,ToastAndroid,
} from 'react-native';
import dimensions from '../../Constant/WindowDimensions'
const width = dimensions.windowWidth
const height = dimensions.windowHeight
import { BASE_COLOR } from '../../Constant/appColors'
// import styles from './HomeStyle'
import { Container, Header, Content,Title,Left,Right,Body,Spinner, Button, Icon, List, ListItem} from 'native-base'
import {connect} from "react-redux";
import Geolocation from 'react-native-geolocation-service';
import {
  getCitiesAsync,
} from '../../Redux/Slices/city/citySlice';
import MapView ,{PROVIDER_GOOGLE,InfoWindow} from 'react-native-maps';

import Loader from '../Loader/Loader';
const LATITUDE = 22.7196;
const LONGITUDE = 75.8577;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

 class WeatherDetailScreen extends React.Component {

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
    this.getCity = this.getCity.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getCurrentLocationMap = this.getCurrentLocationMap.bind(this);
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
      region: {
        latitude: parseFloat(LATITUDE),
        longitude: parseFloat(LONGITUDE),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      isMapReady: false,
      city:{},
      weather:{},
      main:{},
      wind:{},
      markers:[],
    }

    
  }

  componentDidMount() {
   // this.setState({isLoading:true})
    this.getCurrentLocation();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction();
    })
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onFocusFunction = () => {
    this.setState({isLoading:true})
    this.getCurrentLocation();
    // do some stuff on every screen focus
    // if(this.props.navigation.state.params && this.props.navigation.state.params.home){
    
    // }

    if(this.props.navigation.state.routeName=='HomeScreen'){
    
    }

    
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  getCity(){
    const cityId = this.props.navigation.state.params.id;
    let city = this.props.cities.filter(data => data.id == cityId);
    //console.log(city[0].weather[0].description)
    let region = {
      latitude: parseFloat(city[0].coord.lat),
      longitude: parseFloat(city[0].coord.lon),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
  };
    this.setState({
      region: region,
      //processing:false
  });

     this.setState({city:city[0],weather:city[0].weather[0],main:city[0].main,wind:city[0].wind,isLoading:false},function(){
       console.log(this.state.city.main.humidity)
     })
    // let uData = {
    //   lat:this.state.currentlat,
    //   lon:this.state.currentlon
    // }
   
  }

  handleBackButton(){
    this.props.navigation.goBack(null);
 }

  

  UNSAFE_componentDidUpdate() {
    // A whole lotta functions here, fired after every render.
    
}

  UNSAFE_componentWillMount() { 
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  UNSAFE_componentWillUnmount() {
    this.focusListener.remove()
  }

  handleBackButtonClick() { 
    this.props.navigation.goBack(null);
  }


  getCurrentLocation = async () => {
    this.getCity();
  }

  getCurrentLocationMap() {
    this.getCity();
  }



  render() {
    LogBox.ignoreLogs(['Animated: `ImmutableStateInvariantMiddleware took 60ms, which is more than the warning threshold of 32ms.']);
    LogBox.ignoreLogs(['SerializableStateInvariantMiddleware took 35ms, which is more than the warning threshold of 32ms.If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.']);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    return ( <Container>
      
        <Loader loading={this.state.isLoading}  />
        <Header style={{flex:1,backgroundColor:BASE_COLOR,paddingTop:40,paddingBottom:30}}>
        <StatusBar barStyle="light-content"  backgroundColor={'black'} />
        <Left >
            <Button onPress={()=>{this.handleBackButtonClick()}} hitSlop={{top: 50, bottom: 50, left: 50, right: 50}} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{ paddingLeft:height *0.050}}>
            <Title style={{textAlign:'center'}}>WeatherApp</Title>
          </Body>
         
          {/* <Right /> */}
        </Header>
        {/* <Header style={{width:width,backgroundColor:BASE_COLOR}}>
        <Text>WeatherApp</Text> 
        </Header> */}
        <Content >
        <View style={{flex:1,height:height*0.55,width:'100%',backgroundColor:'black',overflow: 'hidden',justifyContent: 'center'}}>
        <MapView
            style={{flex:1, overflow: 'hidden' }} 
            initialRegion={this.state.region}
            region={this.state.region}
            loadingEnabled={true}
            mapType={'standard'}
            onMapReady={this.getCurrentLocationMap.bind(this)}
            // pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}
            //mapType="satellite"
            >
              <MapView.Marker
            coordinate={{latitude: this.state.region.latitude,
            longitude: this.state.region.longitude}}
            title={"City"}
            description={this.state.city.name}
         />
              {/* <MapView.Callout>
            <Text>{this.state.currentDistance} Miles</Text>  
            </MapView.Callout> */}
              
        </MapView>
       </View>
       <View style={{flex: 1, flexDirection: 'row',padding:15}}>
        <View style={{width: '50%'}} >
        <Text style={{fontSize:20,fontWeight:'bold'}}>{this.state.city.name}</Text>

        <Text style={{fontSize:15,paddingTop:10,textTransform: 'capitalize'}}>{this.state.weather.description}</Text>
        <Text style={{fontSize:15,paddingTop:10}}>Humidity: {this.state.main.humidity}</Text>
        <Text style={{fontSize:15,paddingTop:10}}>Wind Speed: {this.state.wind.speed}</Text>
        {/* <Text style={{fontSize:15,paddingTop:10}}>Max Temp: {parseFloat(this.state.main.temp_max).toFixed()}</Text> */}
        <View style={{flexDirection: 'row', alignItems: 'flex-start',paddingTop:10}}>
                <Text style={{fontSize: 15, lineHeight: 30}}>Max Temp: {parseFloat(this.state.main.temp_max).toFixed()}</Text>
                <Text style={{fontSize: 7, lineHeight: 18}}>{'\u00b0'}</Text>
                <Text style={{fontSize: 15, lineHeight: 30}}>C</Text>
          </View>
        {/* <Text style={{fontSize:15,paddingTop:10}}>Min Temp: {parseFloat(this.state.main.temp_min).toFixed()}</Text> */}
        <View style={{flexDirection: 'row', alignItems: 'flex-start',paddingTop:10}}>
                <Text style={{fontSize: 15, lineHeight: 30}}>Min Temp: {parseFloat(this.state.main.temp_min).toFixed()}</Text>
                <Text style={{fontSize: 7, lineHeight: 18}}>{'\u00b0'}</Text>
                <Text style={{fontSize: 15, lineHeight: 30}}>C</Text>
          </View>
        </View>
        <View style={{width: '50%', flex:1,justifyContent: "center",alignItems: "center"}} >
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 25,fontWeight:'bold', lineHeight: 30}}>{parseFloat(this.state.main.temp).toFixed()}</Text>
                <Text style={{fontSize: 15, lineHeight: 18}}>{'\u00b0'}</Text>
                <Text style={{fontSize: 25,fontWeight:'bold', lineHeight: 30}}>C</Text>
            </View>
          <Image source={require('../../assets/img/cloud.png')}/>
          </View>
      </View>
       
        </Content>
       
        </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cities: state.city.cities,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      // same effect
      getCitiesAsync : (uData) => dispatch(getCitiesAsync(uData)),
  }
};

export default connect( mapStateToProps, mapDispatchToProps)(WeatherDetailScreen);