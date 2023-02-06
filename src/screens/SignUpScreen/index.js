import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {isValidEmail, isValidPassword, isValidPhone} from '../../utils';
import {
  Image, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Background from '../../assets/images/splash.png';
import {api} from '../../api';
import {useTranslation} from 'react-i18next';
import Header from "../../Components/Header";
import {Button} from "@rneui/themed";
import {colors} from "../../styles";

function SignUpScreen() {
  const {t} = useTranslation('common');
  const navigation = useNavigation();
  const [signUpStatus, setSignUpStatus] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [state, setState] = useState({
    phone: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const {first_name, last_name, phone, email, password, repeatPassword} = state;
  const errors = {};
  if (repeatPassword !== password) {
    errors.repeatPassword = `${t(
      'signInPage.signUpPage.inputs.repeatPassword.error',
    )}`;
  }
  if (!isValidPassword(password)) {
    errors.password = `${t('signInPage.signUpPage.inputs.password.error')}`;
  }
  if (!isValidPhone(phone)) {
    errors.phone = `${t('signInPage.signUpPage.inputs.phone.error')}`;
  }
  if (!isValidEmail(email)) {
    errors.email = `${t('signInPage.signUpPage.inputs.email.error')}`;
  }
  if (!first_name.trim()) {
    errors.first_name = `${t('signInPage.signUpPage.inputs.firstName.error')}`;
  }

  if (!last_name.trim()) {
    errors.last_name = `${t('signInPage.signUpPage.inputs.lastName.error')}`;
  }
  const handleOnchanges = (text, input) => {
    setState(prevState => ({...prevState, [input]: text}));
  };
  const handleOnSubmit = () => {
    setSignUpStatus('progress');
    setServerError(null);
    api
      .signUp({
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        password: password,
        user: user
      })
      .then(() => {
        setSignUpStatus('successful');
      })
      .catch(response => {
        setServerError(response.message);
        setSignUpStatus('failed');
      });
  };
  // TODO: refactoring
  if (signUpStatus === 'successful') {
    return navigation.navigate('Auth');
  }
  return (
    <SafeAreaView style={styles.container}>
     <Header/>
      <Image source={Background} style={{width: 120, height: 120}} />
      <ScrollView style={{width: '100%', height:"100%"}}>
        <View>
          <View>
            <TextInput
                placeholderTextColor={colors.placeholder}
                style={styles.TextInput}
                onChangeText={text => handleOnchanges(text, 'first_name')}
                placeholder={t(
                    'signInPage.signUpPage.inputs.firstName.placeholder',
                )}
            />
            {errors && (
                <Text style={styles.label}>{errors.first_name}</Text>
            )}
          </View>
          <View>
            <TextInput
                placeholderTextColor={colors.placeholder}
                style={styles.TextInput}
                onChangeText={text => handleOnchanges(text, 'last_name')}
                placeholder={t(
                    'signInPage.signUpPage.inputs.lastName.placeholder',
                )}
            />
            {errors && <Text style={styles.label}>{errors.last_name}</Text>}
          </View>
          <View>
            <TextInput
                placeholderTextColor={colors.placeholder}
                style={styles.TextInput}
                onChangeText={text => handleOnchanges(text, 'phone')}
                placeholder={t(
                    'signInPage.signUpPage.inputs.phone.placeholder',
                )}
            />
            {errors && <Text style={styles.label}>{errors.phone}</Text>}
          </View>
          <View>
            <TextInput
                placeholderTextColor={colors.placeholder}
                style={styles.TextInput}
                onChangeText={text => handleOnchanges(text, 'email')}
                placeholder={t(
                    'signInPage.signUpPage.inputs.email.placeholder',
                )}
            />
            {errors && <Text style={styles.label}>{errors.email}</Text>}
          </View>
          <View style={styles.TextInputPassword}>
            <TextInput
                placeholderTextColor={colors.placeholder}
                style={{width: '100%', color:colors.input, paddingLeft: 10}}
                onChangeText={text => handleOnchanges(text, 'password')}
                secureTextEntry={true}
                placeholder={t(
                    'signInPage.signUpPage.inputs.password.placeholder',
                )}
            />
          </View>
          {errors && <Text style={styles.label}>{errors.password}</Text>}
          <View style={styles.TextInputPassword}>
            <TextInput
                placeholderTextColor={colors.placeholder}
                style={{width: '100%', color:colors.input, paddingLeft: 10}}
                onChangeText={text => handleOnchanges(text, 'repeatPassword')}
                secureTextEntry={true}
                placeholder={t(
                    'signInPage.signUpPage.inputs.repeatPassword.placeholder',
                )}
            />
          </View>
          {errors && (
              <Text style={styles.label}>{errors.repeatPassword}</Text>
          )}
        </View>
        <View style={{marginTop: 20}}>
          <Button
              onPress={handleOnSubmit}
              disabled={
                repeatPassword !== password ||
                !phone ||
                !first_name ||
                !email ||
                !last_name ||
                password < 8
              }
              block
              buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}
              title={t('signInPage.signUpPage.buttons.signUp')}
          />
        </View>
        {serverError && <Text style={styles.label}>{serverError}</Text>}
        <View style={{alignItems:"flex-start", paddingLeft: 20}}>
          <Text style={styles.label}>{t('signInPage.signUpPage.links.signIn')}</Text>
        </View>
        <View style={{alignItems: "flex-end", marginHorizontal: 1}}>
          <Button
              onPress={() => {
                navigation.navigate('Auth');
              }}
              block
              buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}
              title={t('signInPage.signUpPage.links.signIn')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput:{
    borderWidth: 1,
    borderColor: 'rgb(70,85,31)',
    borderRadius:12,
    marginHorizontal: 20,
    marginBottom: 20,
    color: colors.input,
    paddingLeft: 10
  },
  TextInputPassword:{
    marginBottom: 15,
    borderWidth: 1,
    borderRadius:12,
    marginHorizontal: 20,
    borderColor: 'rgb(70,85,31)',
    flexDirection: 'row',
    color: colors.input,
    justifyContent: 'space-between',
    alignItemsContent:  'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'rgb(70,85,31)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
export default SignUpScreen;
