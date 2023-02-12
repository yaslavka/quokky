import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import HomeHeader from '../../Components/HomeHeader';
import {api} from '../../api';
import {useTranslation} from 'react-i18next';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {matrixActions} from '../../store/zakaz/actions';
function CartScreen() {
  const navigation = useNavigation();
  const [zakaz, setZakaz] = useState();
  const [error, setError] = useState();
  const {t} = useTranslation('common');

  useEffect(() => {
    api
      .getZakazy()
      .then(response => {
        setZakaz(response);
      })
      .catch(response => {
        setError(response.messages);
      });
  }, [zakaz]);

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <FlatList
        data={zakaz}
        contentContainerStyle={{
          marginTop: 12,
          paddingHorizontal: 24,
          paddingBottom: 24 * 2,
        }}
        renderItem={({item}) => (
          <>
            {item ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Map', {id: item.id})
                  }}>
                  <View
                    style={{
                      height: 150,
                      backgroundColor: '#F5F5F8',
                      marginTop: 12,
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      marginBottom: 20,
                      borderRadius: 12,
                    }}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 15,
                        }}>
                        <Svg
                          style={{alignItems: 'flex-start'}}
                          width={30}
                          height={30}
                          fill="#335616"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="LocalShippingIcon"
                          tabIndex="-1"
                          title="LocalShipping">
                          <Path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </Svg>
                        <Text
                          style={{
                            lineHeight: 22,
                            fontSize: 16,
                            fontWeight: 'bold',
                            alignItems: 'flex-end',
                          }}>
                          {item.namesgruz}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 15,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Svg
                          style={{alignItems: 'flex-start'}}
                          width={30}
                          height={30}
                          fill="#335616"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 30 30"
                          data-testid="EuroSymbolIcon"
                          tabIndex="-1"
                          title="EuroSymbol">
                          <Path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z" />
                        </Svg>
                        <Text
                          style={{
                            lineHeight: 22,
                            fontSize: 16,
                            color: '#FF6C44',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              alignItems: 'flex-start',
                              marginBottom: 20,
                            }}>
                            {t('Общая стоимость')}{' '}
                          </Text>
                          <Text style={{alignItems: 'center'}}>
                            {' '}
                            {item.summ}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 15,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Svg
                          style={{alignItems: 'flex-start'}}
                          width={30}
                          height={30}
                          fill="#335616"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="CabinIcon"
                          tabIndex="-1"
                          title="Cabin">
                          <Path d="M10 1c0 1.66-1.34 3-3 3-.55 0-1 .45-1 1H4c0-1.66 1.34-3 3-3 .55 0 1-.45 1-1h2zm2 2L6 7.58V6H4v3.11L1 11.4l1.21 1.59L4 11.62V21h16v-9.38l1.79 1.36L23 11.4 12 3zm1.94 4h-3.89L12 5.52 13.94 7zm-6.5 2h9.12L18 10.1v.9H6v-.9L7.44 9zM18 13v2H6v-2h12zM6 19v-2h12v2H6z" />
                        </Svg>
                        <Text
                          style={{
                            lineHeight: 22,
                            fontSize: 16,
                            color: '#FF6C44',
                            alignItems: 'center',
                          }}>
                          <Text style={{alignItems: 'center'}}>
                            {' '}
                            {item.streets}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: 15,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Svg
                          style={{alignItems: 'flex-start'}}
                          width={30}
                          height={30}
                          fill="#335616"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="DoneOutlineIcon"
                          tabIndex="-1"
                          title="DoneOutline">
                          <Path d="m19.77 5.03 1.4 1.4L8.43 19.17l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 5.03m0-2.83L8.43 13.54l-4.2-4.2L0 13.57 8.43 22 24 6.43 19.77 2.2z" />
                        </Svg>
                        <Text
                          style={{
                            lineHeight: 22,
                            fontSize: 16,
                            color: '#FF6C44',
                            alignItems: 'center',
                          }}>
                          <Text style={{alignItems: 'center'}}>
                            {' '}
                            {item.street}
                          </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          paddingHorizontal: 100,
                        }}>
                        <Svg
                          width={24}
                          height={24}
                          fill="#335616"
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-zjt8k"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="MopedIcon"
                          tabIndex="-1"
                          title="Moped">
                          <Path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.48L19 10.35V7zM7 17c-.55 0-1-.45-1-1h2c0 .55-.45 1-1 1z" />
                          <Path d="M5 6h5v2H5zm14 7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                        </Svg>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: colors.placeholder,
                          }}>
                          Отследить
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                {/*<StepperInput*/}
                {/*  containerStyle={{*/}
                {/*    height: 50,*/}
                {/*    width: 125,*/}
                {/*    alignItems: 'flex-end',*/}
                {/*    justifyContent: 'space-between',*/}
                {/*    backgroundColor: colors.white,*/}
                {/*  }}*/}
                {/*  value={item.length}*/}
                {/*/>*/}
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItemsL: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{error}</Text>
              </View>
            )}
          </>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#caf5b5',
  },
  textcolor: {
    color: 'rgb(159,198,79)',
  },
});
export default CartScreen;
