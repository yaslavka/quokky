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
  TouchableOpacity,
} from 'react-native';
import imge from '../../assets/images/background/photo2.png';
import img from '../../assets/images/background/photo.png';
import {api} from '../../api';
import * as actions from '../../actions/auth.actions';
import {useTranslation} from 'react-i18next';
import Header from '../../Components/Header';
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
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 30,
          }}>
          <Text
            style={{
              color: 'rgba(128, 136, 77, 1)',
              fontWeight: '700',
              fontSize: 28,
              marginTop: 30,
            }}>
            Welcome back
          </Text>
          <View style={{marginTop: 20}}>
            <Image source={img} style={{width: 36, height: 60}} />
          </View>
        </View>
        <View style={{paddingHorizontal: 30}}>
          <Text
            style={{
              fontSize: 18,
              color: '#B3B3B3',
              fontWeight: '400',
            }}>
            Hello there, login to start sending packages again for your needs
          </Text>
        </View>
        <View style={styles.TextInput}>
          <Text style={{color: '#B3B3B3', fontWeight: '400', fontSize: 14}}>
            {t('signInPage.signUpPage.inputs.email.placeholder')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={textinput1}
              style={{
                borderWidth: 2,
                borderTopColor: colors.placeholder,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                color: '#000000',
                borderColor: 'border: 1px solid rgba(128, 136, 77, 0.6)',
                width: '100%',
              }}
              onChangeText={text => handleOnchanges(text, 'email')}
            />
            <Image style={{width: 30, height: 30, right: 25}} source={imge} />
          </View>
        </View>
        <View style={styles.TextInput}>
          <Text
            style={{
              color: '#B3B3B3',
              fontWeight: '400',
              fontSize: 14,
              fontFamily: 'SF Pro Text',
            }}>
            {t('signInPage.signUpPage.inputs.password.placeholder')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={texinput2}
              style={{
                borderWidth: 2,
                borderTopColor: colors.placeholder,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
                color: '#000000',
                borderColor: 'border: 1px solid rgba(128, 136, 77, 0.6)',
                width: '100%',
              }}
              onChangeText={text => handleOnchanges(text, 'password')}
            />
            <Image style={{width: 30, height: 30, right: 25}} source={imge} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{paddingLeft: 30, paddingTop: 40}}>
          <Text
            style={{
              color: 'rgba(179, 179, 179, 1)',
              fontWeight: '400',
              fontSize: 14,
            }}>
            {t('signInPage.links.forgotPassword')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextInput: {
    paddingHorizontal: 30,
    marginTop: 30,
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
