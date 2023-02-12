import axios from 'axios';
import Raven from 'raven-js';
import {getAccessToken} from '../utils';
import * as actions from '../actions/auth.actions';
import {store} from '../../index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

export const baseInstance = axios.create({
  baseURL: 'https://6551eb3.online-server.cloud/api',
});
baseInstance.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Raven.captureException(error);
    return Promise.reject(error);
  },
);
baseInstance.interceptors.response.use(
  response => response?.data,
  async error => {
    Raven.captureException(error);
    if (error?.response?.status === 401) {
      const timer = await AsyncStorage.getItem('access_token');
      await AsyncStorage.clear();
      await AsyncStorage.setItem('access_token', timer);

      store.store.dispatch(actions.signOut());
    } else if (error?.response) {
      // Global path to error message
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error?.message);
    }
  },
);
const createFormData = (avatar, body = {}) => {
  const data = new FormData();
  data.append('avatar', {
    name: avatar.assets[0].fileName,
    uri:
      Platform.OS === 'ios'
        ? avatar.assets[0].uri.replace('file://', '')
        : avatar.assets[0].uri,
    type: avatar.assets[0].type,
  });
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};

// export const setzakazid = async id =>
//   await baseInstance({url: `/user/myzakaz?zakaz=${id}`, method: 'get'});

export const api = {
  setzakazid(id) {
    return baseInstance.get(`/user/myzakaz?zakaz=${id}`);
  },
  async signUp(userInfo) {
    return await baseInstance.post('/user/registration', userInfo);
  },
  async signIn(data) {
    return await baseInstance.post('/user/login', data);
  },
  async getUserInfo() {
    return await baseInstance.get('/user');
  },
  async getZakaz(data) {
    return await baseInstance.post('/user/zakaz', data);
  },
  async getZakazy() {
    return await baseInstance.get('/user/zakazy');
  },
  async updateAvatar(avatar) {
    const token = await getAccessToken();
    await fetch('https://6551eb3.online-server.cloud/api/user/avatars', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: createFormData(avatar),
    });
  },
};
