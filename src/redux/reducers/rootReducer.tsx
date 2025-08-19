import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import languageReducer from '../slices/languageSlice';
import faceReducer from '../slices/faceSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  face: faceReducer,
});

export default rootReducer;
