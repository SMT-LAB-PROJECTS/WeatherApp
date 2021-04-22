import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import  {config} from '../../api/config';
const API_URL = config.baseAPI;
const apiKey = config.apiKey;
import AsyncStorage from '@react-native-async-storage/async-storage';



export const citySlice = createSlice({
  name: 'city',
  initialState: {
    loading: false,
    hasErrors: false,
    cities:[],
    currentCity:{}
  },
  reducers: {
    isLoadingStart: (state, action) => {
      state.loading = true;
    },
    getCities: (state, action) => {
      state.loading = true;
      state.cities = action.payload;
    },
    getCurrentCity: (state, action) => {
      state.loading = true;
      state.currentCity = action.payload;
    },
    isLoadingFinish: (state, action) => {
      state.loading = false;
    },
      
  },
});

export const { isLoadingStart, getCities ,isLoadingFinish,getCurrentCity} = citySlice.actions;

export const getCitiesAsync = (userData) => async dispatch => {
 
  return axios
    .get(API_URL + "/find?lat="+userData.lat+"&lon="+userData.lon+"&cnt=50&units=metric&appid="+apiKey)
    .then((response) => {
      let res = JSON.parse(JSON.stringify(response.data));
      if(res.cod==200){
        dispatch(getCities(res.list));
      }
      
     
      return res;
    });
};

export const getCurrentCityAsync = (userData) => async dispatch => {
 
  return axios
    .get(API_URL + "/weather?lat="+userData.lat+"&lon="+userData.lon+"&units=metric&appid="+apiKey)
    .then((response) => {
      let res = JSON.parse(JSON.stringify(response.data));
      if(res.cod==200){
        dispatch(getCurrentCity(res));
      }
      
     
      return res;
    });
};

export const allCities = state => state.city.cities;


export default citySlice.reducer;
