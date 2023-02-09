import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import HomeHeader from '../../Components/HomeHeader';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../actions/app.actions';
import {api} from '../../api';
import * as ImagePicker from 'react-native-image-picker';
import {Alert} from 'react-native';
import avatars from '../../assets/images/icons/camera_200.png'

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
                    <SafeAreaView style={styles.container}>
                        <HomeHeader />
                        <ScrollView
                            style={{width: '100%', height: '100%'}}
                            stickyHeaderIndices={[0]}
                            showsVerticalScrollIndicator={true}>
                            <View>
                                <TouchableOpacity onPress={submitAvatarForm}>
                                    <Image
                                        style={{}}
                                        source={
                                            userInfo.avatar
                                                ? {
                                                    uri: `https://kosmoss.host/api/user/${userInfo.avatar}`,
                                                }
                                                : avatars
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </>
            )}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textcolor: {
        color: 'rgb(159,198,79)',
    },
});
export default SettingScreen;
