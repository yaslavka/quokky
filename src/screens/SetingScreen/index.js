import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import HomeHeader from '../../Components/HomeHeader';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {api} from '../../api';
import * as ImagePicker from 'react-native-image-picker';
import {Alert} from 'react-native';
import avatars from '../../assets/images/icons/camera_200.png';
import {colors} from '../../styles';
import ChangePassword from '../../Components/ChangePassword';
import ChangeUserInfo from '../../Components/ChangeUserInfo';
import ChangeUserInfoPhone from '../../Components/ChangeUserInfo/ChangeUserInfophone';

const options = {
  mediaType: 'photo',
  noData: true,
  includeBase64: false,
};
function SettingScreen() {
  const userInfo = useSelector(state => state.app.user);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    try {
      setRefresh(true);
      dispatch(actions.userInfo());
    } finally {
      setRefresh(false);
    }
  };

  const submitAvatarForm = () => {
    ImagePicker.launchImageLibrary(options, async avatar => {
      if (!avatar) {
        Alert.alert('размер файла не более 2 Мв'[{text: 'Ok'}]);
      } else {
        //console.log('RESPONSE', JSON.stringify(avatar));
        await api
          .updateAvatar(avatar)
          .then(async () => {
            await api
              .getUserInfo()
              .then(response => {
                dispatch(actions.userInfoSuccess(response));
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    }).then();
  };
  return (
    <>
      {userInfo && (
        <>
          <SafeAreaView style={[styles.container]}>
            <HomeHeader />
            <ScrollView
              style={{width: '100%', height: '100%'}}
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
              }>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <TouchableOpacity onPress={submitAvatarForm}>
                  <Image
                    style={{
                      width: 250,
                      height: 250,
                      borderWidth: 4,
                      resizeMode: 'cover',
                      borderColor: colors.menu,
                      borderRadius: 150,
                    }}
                    source={
                      userInfo.avatar
                        ? {
                            uri: `https://6551eb3.online-server.cloud/api/user/avatar/${userInfo.avatar}`,
                          }
                        : avatars
                    }
                  />
                </TouchableOpacity>
              </View>
              <View>
                <ChangePassword />
                <ChangeUserInfo />
                <ChangeUserInfoPhone />
              </View>
            </ScrollView>
            <View style={{marginTop: 20}} />
          </SafeAreaView>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbe5d7',
  },
  textcolor: {
    color: 'rgb(159,198,79)',
  },
});
export default SettingScreen;
