import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {colors} from '../../styles'
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
import {useTranslation} from "react-i18next";
import Header from "../../Components/Header";
import {Button} from '@rneui/themed';
function SignInScreen(){
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
    const textinput1 = useRef(1)
    const texinput2 = useRef(2)
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
    return(
        <SafeAreaView style={styles.container}>
            <Header/>
            <Image source={Background} style={{width: 120, height: 120}} />
            <ScrollView style={{width: '100%', height: '100%'}}>
                <View>
                    <View>
                        <TextInput
                            ref={textinput1}
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
                            ref={texinput2}
                            placeholderTextColor={colors.placeholder}
                            style={{width: '100%', color:colors.input, paddingLeft: 10}}
                            onChangeText={text => handleOnchanges(text, 'password')}
                            secureTextEntry={true}
                            placeholder={t(
                                'signInPage.signUpPage.inputs.password.placeholder',
                            )}
                        />
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Button title={t('signInPage.buttons.signIn')} onPress={submitSignInForm} buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}/>
                </View>
                {serverError && <Text style={styles.label}>{serverError}</Text>}
                <View>
                    <Text style={styles.label}>{t('signInPage.links.forgotPassword')}</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <Text style={[styles.label, {fontSize: 20, fontWeight: "bold"}]}>{t('signInPage.links.or')}</Text>
                </View>
                <View>
                    <Button  title={t('signInPage.links.facebook')} buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}/>
                </View>
                <View>
                    <Button  title={t('signInPage.links.google')} buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}/>
                </View>
                <View style={{alignItems:"flex-start", paddingLeft: 20}}>
                    <Text style={styles.label}>{t('signInPage.links.signUp')}</Text>
                </View>
                <View style={{alignItems: "flex-end", marginHorizontal: 1}}>
                    <Button onPress={() => {
                        navigation.navigate('SignUp');
                    }} title={t('signInPage.links.register')} buttonStyle={[styles.TextInput, {backgroundColor: 'rgb(70,85,31)'}]}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
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
export default SignInScreen
