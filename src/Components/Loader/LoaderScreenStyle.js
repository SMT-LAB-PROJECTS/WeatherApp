import { StyleSheet } from 'react-native'
import { BASE_COLOR,WHITE_COLOR,GREY_COLOR,BLACK_COLOR, BORDER_COLOR } from "../../Constant/appColors";

export default StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        opacity:0.5
      },
      activityIndicatorWrapper: {
        backgroundColor: 'white',
        height: 80,
        width: 80,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
     },
     activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     }
})
