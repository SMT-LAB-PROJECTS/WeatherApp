import { configureStore ,getDefaultMiddleware} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from "redux"; 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import thunk from 'redux-thunk'
import cityReducer from './Slices/city/citySlice';

const rootReducer = combineReducers({     
  city:cityReducer,   
 });


// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [createLogger(),thunk]
// });

// export default store;

 const persistConfig = {
  key: "root",
  version: 1,
  storage:AsyncStorage,
  whitelist: [
    'city'
  ],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

let persistor = persistStore(store);

export {
  store,
  persistor,
};
