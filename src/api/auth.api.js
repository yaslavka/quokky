import {baseInstance} from './index';
import {createFormDataObj} from '../utils';

export const signUp = userInfo =>
  baseInstance({
    url: '/user/registration',
    method: 'post',
    data: userInfo,
  });

export const signIn = data =>
  baseInstance({
    url: '/user/login',
    method: 'post',
    data: createFormDataObj({...data, grant_type: 'password'}),
  });
