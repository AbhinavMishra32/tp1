import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// this file is used to combine all the reducers in the application. 
// this file mostly has boilerplate code. if want see what each part does later

const rootReducer = combineReducers({
  user: userReducer, 
  theme: themeReducer,
});


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
// hello
// mostly all this is boilerplate code.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export const persistor = persistStore(store);
