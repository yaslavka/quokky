import {types} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('matrixInfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const getDatas = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('matrixCellInfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
const initialState = {
  matrixInfo: getData(),
  matrixCellInfo: getDatas(),
};

const matrixReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.SAVE_CURRENT_MATRIX: {
      AsyncStorage.setItem('matrixInfo', JSON.stringify(payload)).then();
      return {...state, matrixInfo: payload};
    }

    case types.SAVE_CURRENT_MATRIX_CELL_INFO: {
      AsyncStorage.setItem('matrixCellInfo', JSON.stringify(payload)).then();
      return {...state, matrixCellInfo: payload};
    }

    case types.SAVE_USER_MATRICES:
      return {
        ...state,
        matricesList: payload,
      };

    default:
      return state;
  }
};

export default matrixReducer;
