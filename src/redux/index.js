import {combineReducers} from 'redux';
import appReducer from './app.reducer';
import authReducer from './auth.reducer';
import matrixReducer from '../store/zakaz/redusers';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  matrixReducer,
});
