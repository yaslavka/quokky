import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as actions from '../../actions/auth.actions';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import avatars from '../../assets/images/icons/camera_200.png';
import {colors} from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path} from 'react-native-svg';

function DrawerContent(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  const logout = async () => {
    dispatch(actions.signOutSuccess());

    const timer = await AsyncStorage.getItem('access_token');
    await AsyncStorage.clear();
    await AsyncStorage.removeItem('access_token', timer);
  };
  return (
    <>
      {userInfo && (
        <SafeAreaView style={styles.container}>
          <DrawerContentScrollView {...props}>
            <View
              style={{
                paddingLeft: 10,
                backgroundColor: colors.placeholder,
                paddingVertical: 10,
                borderRadius: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={styles.avatar}
                  source={
                    userInfo.avatar
                      ? {
                          uri: `https://6551eb3.online-server.cloud/api/user/avatar/${userInfo.avatar}`,
                        }
                      : avatars
                  }
                />
                <View style={{alignItems: 'flex-end', marginLeft: 15}}>
                  <Text
                    style={[
                      styles.textcolor,
                      {fontWeight: 'bold', fontSize: 18},
                    ]}>
                    {userInfo.first_name} {userInfo.last_name}
                  </Text>
                  <Text style={[styles.textcolor, {fontSize: 14}]}>
                    {userInfo.email}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.textcolor,
                      {fontWeight: 'bold', fontSize: 18},
                    ]}>
                    {userInfo.balance}
                  </Text>
                  <Text
                    style={[
                      styles.textcolor,
                      {fontWeight: 'bold', fontSize: 20},
                    ]}>
                    Balance
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.textcolor,
                      {fontWeight: 'bold', fontSize: 18},
                    ]}>
                    {userInfo.balance}
                  </Text>
                  <Text
                    style={[
                      styles.textcolor,
                      {fontWeight: 'bold', fontSize: 20},
                    ]}>
                    Заказы
                  </Text>
                </View>
              </View>
            </View>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
          <DrawerItem
            label={'Выход'}
            onPress={logout}
            icon={() => (
              <Svg
                width={30}
                height={30}
                fill="#335616"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ExitToAppIcon"
                tabIndex="-1"
                title="ExitToApp">
                <Path d="M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
              </Svg>
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textcolor: {
    color: 'rgb(236,239,232)',
  },
  avatar: {
    borderWidth: 4,
    borderColor: colors.menu,
    borderRadius: 50,
    width: 75,
    height: 75,
  },
});
export default DrawerContent;
