import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {colors} from '../../styles';
import {isValidEmail, isValidPassword, setAccessToken} from '../../utils';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';

import Background from '../../assets/images/splash.png';
import {api} from '../../api';
import * as actions from '../../actions/auth.actions';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header';
import {Button} from '@rneui/themed';
import Svg, {Path} from 'react-native-svg';
function SignInScreen() {
  const {t} = useTranslation('common');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [serverError, setServerError] = useState(null);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const {email, password} = state;
  const handleOnchanges = (text, input) => {
    setState(prevState => ({...prevState, [input]: text}));
  };
  const textinput1 = useRef(1);
  const texinput2 = useRef(2);
  const errors = {};
  if (!isValidPassword(password)) {
    errors.password = `${t('signInPage.signUpPage.inputs.password.error')}`;
  }
  if (!isValidEmail(email)) {
    errors.email = `${t('signInPage.signUpPage.inputs.email.error')}`;
  }

  const submitSignInForm = async () => {
    const valid = isValidPassword(password);
    if (valid) {
      setServerError();
      await api
        .signIn({email: email, password: password})
        .then(async response => {
          dispatch(actions.signInSuccess());
          await setAccessToken(response);
          await api
            .getUserInfo()
            .then(() => {})
            .catch(() => {});
        })
        .catch(response => {
          setServerError(response.message);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Image source={Background} style={{width: 120, height: 120}} />
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View>
          <View>
            <TextInput
              ref={textinput1}
              placeholderTextColor={colors.placeholder}
              style={styles.TextInput}
              onChangeText={text => handleOnchanges(text, 'email')}
              placeholder={t('signInPage.signUpPage.inputs.email.placeholder')}
            />
            {errors && <Text style={styles.label}>{errors.email}</Text>}
          </View>
          <View style={[styles.TextInputPassword]}>
            <Svg
              fill="#335616"
              width={24}
              height={24}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="HttpsIcon"
              tabIndex="-1"
              title="Https">
              <Path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </Svg>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                ref={texinput2}
                placeholderTextColor={colors.placeholder}
                style={{color: colors.input, width: '85%'}}
                onChangeText={text => handleOnchanges(text, 'password')}
                secureTextEntry={true}
                placeholder={t(
                  'signInPage.signUpPage.inputs.password.placeholder',
                )}
              />
            </View>
            <Svg
              fill="#335616"
              width={24}
              height={24}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="HttpsIcon"
              tabIndex="-1">
              <Path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
            </Svg>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Button
            title={t('signInPage.buttons.signIn')}
            onPress={submitSignInForm}
            buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}
          />
        </View>
        {serverError && <Text style={styles.label}>{serverError}</Text>}
        <View>
          <Text style={styles.label}>
            {t('signInPage.links.forgotPassword')}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={[styles.label, {fontSize: 20, fontWeight: 'bold'}]}>
            {t('signInPage.links.or')}
          </Text>
        </View>
        <View>
          <Button
            title={t('signInPage.links.facebook')}
            buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}
          />
        </View>
        <View>
          <Button
            title={t('signInPage.links.google')}
            buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}
          />
        </View>
        <View style={{alignItems: 'flex-start', paddingLeft: 20}}>
          <Text style={styles.label}>{t('signInPage.links.signUp')}</Text>
        </View>
        <View style={{alignItems: 'flex-end', marginHorizontal: 1}}>
          <Button
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            title={t('signInPage.links.register')}
            buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: 'rgb(70,85,31)',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    color: colors.input,
    paddingLeft: 10,
  },
  TextInputPassword: {
    borderWidth: 1,
    borderColor: 'rgb(70,85,31)',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    color: colors.input,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'rgb(70,85,31)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default SignInScreen;
