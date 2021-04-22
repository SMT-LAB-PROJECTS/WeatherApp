import { StyleSheet,Platform } from 'react-native'
import { BASE_COLOR, WHITE_COLOR, BLUE_COLOR, BLACK_COLOR, } from "../../Constant/appColors";
import { Layout, LayoutUtil, Colors, FontFamily } from '../../Theme'
import dimensions from '../../Constant/WindowDimensions';
const width = dimensions.windowWidth;
const height = dimensions.windowHeight;
export default StyleSheet.create({
  loginbutton: { backgroundColor: BASE_COLOR, justifyContent: 'center', borderRadius: 22, alignItems: 'center', height: height * 0.054, width: width * 0.28 },
  divider: { backgroundColor: BLACK_COLOR, height: 1.5, width: width * 0.25 },
  welcomeText: { color: WHITE_COLOR, fontSize: 20, fontFamily: 'Muli-Regular', marginTop: height * 0.19 },
  signinText: { color: WHITE_COLOR, fontSize: 19, textAlign: 'center', marginBottom: height * 0.003, fontFamily: 'Muli-Bold' },
  forgotpassword: { fontSize: 11, marginRight: '5%', fontFamily: 'Muli-BoldItalic', color: '#141414' },
  signupText: { color: WHITE_COLOR, fontSize: 16, textAlign: 'center', marginRight: '3%', marginLeft: '1%', marginTop: height * 0.001, fontFamily: 'Muli-SemiBold' },
  dividerRow: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: height * 0.015, alignItems: 'center' },
  iconRow: { flexDirection: 'row', width: '43%', justifyContent: 'space-between', marginTop: height * 0.02 },
  fbIcon: { width: height * 0.015, height: height * 0.015, marginTop: height * 0.002, marginRight: width * 0.01 },
  bottomIcon: { width: height * 0.015, height: height * 0.015, marginTop: height * 0.002, marginRight: width * 0.01 },
  cardText: { fontSize: 12, color: WHITE_COLOR, fontFamily: 'Muli-Bold' },
  footerop: { width: height * 0.03, height: height * 0.03 },
  footerchat: { width: height * 0.037, height: height * 0.037 },
  footeruser: { width: height * 0.026, height: height * 0.026 },
  linearGradient: {
    flex: 1,
    // borderRadius: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  box: {
    height: height * 0.06,
    backgroundColor: 'transparent',

  },
  box1: {
    height: height * 0.03,
    width: width * 0.19,
    borderTopLeftRadius: 13, alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 13, backgroundColor: '#D8D8D8'


  },
  container1: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: height * 0.06 ,
    alignItems: 'center', width: '100%', 
    //marginTop: height * 0.91,
  },
  box: {
    height: height * 0.03,
    backgroundColor: 'transparent',

  },
  box1: {
    height: height * 0.03,
    width: width * 0.19,
    borderTopLeftRadius: 13, alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 13, backgroundColor: '#D8D8D8'


  },
  fcontainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  fbox: {
    height: height * 0.06,
    backgroundColor: 'transparent',

  },
  fbox1: {
    height: height * 0.03,
    width: width,
    borderTopLeftRadius: 13, alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 13, backgroundColor: '#D8D8D8'
  },
  // selected: {
  //   width: width * 0.28,
  //   height: height * 0.13,
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderColor: '#EDF2F9',
  //   borderWidth: 1,
  //   borderColor: '#1B4F72',
  //   borderTopWidth: 2.5,
  //   borderBottomWidth: 2.5,
  //   borderLeftWidth: 2.5,
  //   borderRightWidth: 2.5,
  // },
  selected: {
    height:(Platform.OS === 'ios') ? height * 0.30 : height > 700 ? height * 0.295:height * 0.38,
    width: width * 0.435, 
    flex: 0.5,
    marginBottom:(Platform.OS === 'ios') ? 0 : height > 700 ? height * 0.032:height * 0.017,
    borderRadius: 20
  },
  unSelectedItem:{
     height: height * 0.29, 
     width: width * 0.425, 
     borderRadius: 10
  },
  activityImage: { 
    height: '60%', 
    width: '60%', 
    resizeMode: 'contain' 
},
// activityIcon: { 
//   width:(Platform.OS === 'ios') ? height * 0.05 : height > 700 ? height * 0.06 : height * 0.07,
//   height:(Platform.OS === 'ios') ? height * 0.05 : height > 700 ? height * 0.06 : height * 0.07,
//   position: 'absolute',
//   // top:(Platform.OS === 'ios') ? -70 : height > 700 ? -70: -60,
//   top:(Platform.OS === 'ios') ? -LayoutUtil.screenHeight * 0.070 : -LayoutUtil.screenHeight * 0.085,
//   left:(Platform.OS === 'ios') ? LayoutUtil.screenHeight * 0.070 : LayoutUtil.screenHeight * 0.070,
//   // top: -LayoutUtil.screenHeight * 0.070,
//   // left:(Platform.OS === 'ios') ? 50 : 42,
//   borderWidth: 2, 
//   borderRadius:5,
//   borderColor: '#e33802',
//   // marginTop: height * 0.0005, 
//   // marginRight: width * 0.01 ,
//   backgroundColor:'#fff'},
activityiconview:{
flex:1,
justifyContent: 'center',
alignItems: 'center',
position: 'relative',
top:(Platform.OS === 'ios') ? -LayoutUtil.screenHeight * 0.070 : -LayoutUtil.screenHeight * 0.095,
},
activityIcon: { 
  width:(Platform.OS === 'ios') ? height * 0.06 : height > 700 ? height * 0.07 : height * 0.07,
  height:(Platform.OS === 'ios') ? height * 0.06 : height > 700 ? height * 0.07 : height * 0.07,
  //position: 'absolute',
  // top:(Platform.OS === 'ios') ? -70 : height > 700 ? -70: -60,


  // top:(Platform.OS === 'ios') ? -LayoutUtil.screenHeight * 0.0215 : -LayoutUtil.screenHeight * 0.0215,
  // left:(Platform.OS === 'ios') ? LayoutUtil.screenHeight * 0.070 : LayoutUtil.screenHeight * 0.080,

  alignSelf:'center',
  // top: -LayoutUtil.screenHeight * 0.070,
  // left:(Platform.OS === 'ios') ? 50 : 42,
  borderWidth: 2, 
  borderRadius:5,
  borderColor: '#e33802',
  // marginTop: height * 0.0005, 
  // marginRight: width * 0.01 ,
  backgroundColor:'#fff',
},
activityIconNew: { 
  width:(Platform.OS === 'ios') ? height * 0.05 : height > 700 ? height * 0.05 : height * 0.05,
  height:(Platform.OS === 'ios') ? height * 0.05 : height > 700 ? height * 0.05 : height * 0.05,
  alignSelf:'center',
  borderWidth: 2, 
  borderRadius:10,
  borderColor: '#e33802',
  backgroundColor:'#fff',
  marginRight:width * 0.030,
  marginTop:width * 0.022
},
activityView: { 
  width: LayoutUtil.screenWidth * 0.28, 
  height: LayoutUtil.screenHeight * 0.13, 
  borderRadius: 18, 
  alignItems: 'center', 
  justifyContent: 'center', 
  paddingTop: 5, 
  paddingBottom: 5
},
})