import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeHeader from '../../Components/HomeHeader';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTranslation} from 'react-i18next';
import Svg, {Path} from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button} from '@rneui/themed';
const SCREEN_WIDTH = Dimensions.get('window').width;
import {formatter} from '../../utils';
import {api} from '../../api';
function ZakazScreen() {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyA5tTXA1HWY3Jd-MBieJisz_LMva01xo60';
  const ref = useRef();
  const {t} = useTranslation('common');
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    origin: {
      longitude: null,
      latitude: null,
      address: '',
      name: '',
    },
    distance: {
      longitude: null,
      latitude: null,
      address: '',
      name: '',
    },
    names: '',
    phone: '',
    dtae: new Date(),
    comments: '',
    cena: null,
    namesp: '',
    cennost: '',
  });
  const [open, setOpen] = useState(false);
  const [openStrahovka, setOpensStrahovka] = useState(false);
  const [opens, setOpens] = useState(false);
  const [items, setItems] = useState([
    {label: 'До 1 кг', value: '1'},
    {label: 'До 5 кг', value: '5'},
    {label: 'До 10 кг', value: '10'},
    {label: 'До 15 кг', value: '15'},
  ]);
  const [itemss, setItemss] = useState([
    {label: 'Пешком', value: '5'},
    {label: 'Lgkov', value: '6'},
    {label: 'Gruz', value: '10'},
  ]);
  const [itemssStrahovka, setItemssStrahovka] = useState([
    {label: 'Yes', value: '0.05'},
    {label: 'No', value: '0'},
  ]);

  const [value, setValue] = useState(null);
  const [valuesStrahovka, setValuesStrahovka] = useState(null);
  const [values, setValues] = useState(null);
  const [text, setText] = useState('Date');
  const [time, settime] = useState('Time');
  const {
    origin,
    distance,
    dtae,
    cena,
    phone,
    cennost,
    comments,
    names,
    namesp,
  } = location;
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1.5 + 0.94; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const distanceMOWBKK = getDistanceFromLatLonInKm(
    location.origin.latitude,
    location.origin.longitude,
    location.distance.latitude,
    location.distance.longitude,
  );
  const summves = +value * 1.5;
  const summtype = summves + +values;
  const strahovka = +cennost * +valuesStrahovka;
  const summvalue = +summtype + +strahovka;
  const summ = +cena + +summvalue;

  const handleOnchanges = (text, input) => {
    setLocation(prevState => ({...prevState, [input]: text}));
  };
  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const [mode, setMode] = useState('date');
  const shownMode = curentMode => {
    setDatePickerVisibility(true);
    setMode(curentMode);
  };

  const onChange = (event, selectedDate) => {
    const cD = selectedDate || dtae;
    setDatePickerVisibility(Platform.OS === 'ios');
    setLocation(prevState => ({...prevState, dtae: cD}));
    let temp = new Date(cD);
    let fD =
      temp.getDate() + '/' + temp.getUTCMonth() + '/' + temp.getFullYear();
    let tim = temp.getHours() + ':' + temp.getMinutes();
    setText(fD);
    settime(tim);
  };
  const submitSignInForm = () => {
    api
      .getZakaz({
        origin: origin,
        distance: distance,
        names: names,
        phone: phone,
        dtae: dtae,
        comments: comments,
        cena: summ,
        namesp: namesp,
        cennost: cennost,
        strahovka: valuesStrahovka,
        ves: value,
        type: values,
      })
      .then(() => {})
      .catch(() => {});
    navigation.navigate('Cart');
  };

  const datas = [
    {
      opens: opens,
      values: values,
      itemss: itemss,
      setOpens: setOpens,
      setValues: setValues,
      setItemss: setItemss,
      placeholder: 'Тип крьера',
      styles: [styles.in, {paddingHorizontal: 15, alignItems: 'center'}],
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeHeader navigation={navigation} />
      <View style={{}}>
        <FlatList
          data={datas}
          renderItem={({item}) => (
            <>
              <View style={styles.home}>
                <Text style={styles.text1}>Доставка по всей Германии</Text>
                <View style={styles.view1}>
                  <View style={styles.view8}>
                    <Text style={styles.text2}>
                      Read a book.Take a nap. Stare out the window
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Dashboard');
                      }}>
                      <View style={styles.button1}>
                        <Text style={styles.button1Text}>Главная</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Image
                      style={styles.image1}
                      source={require('../../assets/uberCar.png')}
                    />
                  </View>
                </View>
              </View>
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity>
                    <View style={styles.card}>
                      <View style={styles.view2}>
                        <Svg
                          style={[styles.image2, {alignItems: 'flex-start'}]}
                          fill="#335616"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="TimerIcon"
                          tabIndex="-1"
                          title="Timer">
                          <Path d="M9 1h6v2H9zm10.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM13 14h-2V8h2v6z" />
                        </Svg>
                        <Text style={styles.title}>
                          {t('как можно скорее')}
                        </Text>
                        <Text
                          style={[
                            styles.title,
                            {fontSize: 30, fontWeight: '800'},
                          ]}>
                          {t('От 149 Р')}
                          <Svg
                            style={[styles.image2, {width: 20, height: 20}]}
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="PlayCircleOutlineIcon"
                            tabIndex="-1"
                            title="PlayCircleOutline">
                            <Path d="m10 16.5 6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          </Svg>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.card}>
                      <View style={styles.view2}>
                        <Svg
                          style={[styles.image2, {alignItems: 'flex-start'}]}
                          fill="#335616"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="CalendarMonthIcon"
                          tabIndex="-1"
                          title="CalendarMonth">
                          <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
                        </Svg>
                        <Text style={styles.title}>{t('Запланировать')}</Text>
                        <Text
                          style={[
                            styles.title,
                            {fontSize: 30, fontWeight: '800'},
                          ]}>
                          {t('От 149 Р')}
                          <Svg
                            style={[styles.image2, {width: 20, height: 20}]}
                            focusable="false"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            data-testid="PlayCircleOutlineIcon"
                            tabIndex="-1"
                            title="PlayCircleOutline">
                            <Path d="m10 16.5 6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          </Svg>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
              <Text style={[styles.title, {textAlign: 'center'}]}>
                {t('Курьер будет на адресах в удобное для вас время')}
              </Text>
              <DropDownPicker
                containerStyle={item.styles}
                placeholder={item.placeholder}
                open={item.opens}
                value={item.values}
                items={item.itemss}
                setOpen={item.setOpens}
                setValue={item.setValues}
                setItems={item.setItemss}
              />
              <View style={{marginTop: 10}}>
                <GooglePlacesAutocomplete
                  ref={ref}
                  placeholder={`${t('Адрес')}`}
                  autocompletionRequest={{
                    componentRestrictions: {
                      country: ['uk'],
                    },
                  }}
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                  }}
                  minLength={2}
                  fetchDetails={true}
                  autoFocus={true}
                  styles={autoComplete}
                  debounce={400}
                  onPress={(data, details) => {
                    setLocation({
                      ...location,
                      origin: {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        address: details.formatted_address,
                        name: details.name,
                      },
                    });
                  }}
                />
                <GooglePlacesAutocomplete
                  ref={ref}
                  placeholder={`${t('Адрес')}`}
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                  }}
                  minLength={2}
                  fetchDetails={true}
                  autoFocus={true}
                  styles={autoComplete}
                  debounce={400}
                  onPress={(data, details) => {
                    setLocation({
                      ...location,
                      distance: {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        address: details.formatted_address,
                        name: details.name,
                      },
                    });
                    setLocation(prevState => ({
                      ...prevState,
                      cena: distanceMOWBKK.toFixed(2),
                    }));
                  }}
                />
                <DropDownPicker
                  containerStyle={[
                    styles.in,
                    {paddingHorizontal: 15, alignItems: 'center'},
                  ]}
                  placeholder={'Вес посылки'}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
                <View style={{marginTop: 20}}>
                  <View style={styles.in}>
                    <TextInput
                      placeholderTextColor={colors.placeholder}
                      style={styles.TextInput}
                      onChangeText={text => handleOnchanges(text, 'names')}
                      placeholder={t('Имя получателя')}
                    />
                  </View>
                  <View style={styles.in}>
                    <TextInput
                      placeholderTextColor={colors.placeholder}
                      style={styles.TextInput}
                      onChangeText={text => handleOnchanges(text, 'phone')}
                      placeholder={t('Телефон')}
                    />
                  </View>
                  <View
                    style={[
                      styles.in,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      },
                    ]}>
                    {isDatePickerVisible && (
                      <>
                        <DateTimePicker
                          testID="DateTimePicker"
                          mode="date"
                          onChange={onChange}
                          value={dtae}
                          display="default"
                        />
                        <DateTimePicker
                          testID="DateTimePicker"
                          mode="time"
                          onChange={onChange}
                          value={dtae}
                          display="default"
                        />
                      </>
                    )}
                  </View>
                  <View style={styles.in}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}>
                      <Svg
                        fill="#335616"
                        width={30}
                        height={30}
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="DirectionsWalkIcon"
                        tabIndex="-1"
                        title="DirectionsWalk">
                        <Path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                      </Svg>
                      <Text
                        style={{
                          color: colors.placeholder,
                          fontSize: 27,
                          fontWeight: 'bold',
                        }}>
                        {t('Поручение для курьера')}
                      </Text>
                    </View>
                    <View style={[styles.TextInput, {height: 150}]}>
                      <TextInput
                        editable
                        multiline
                        placeholderTextColor={colors.placeholder}
                        style={{color: colors.placeholder}}
                        onChangeText={text => handleOnchanges(text, 'comments')}
                        placeholder={t('Поручение для курьера')}
                      />
                    </View>
                  </View>
                  <View style={styles.in}>
                    <TextInput
                      placeholderTextColor={colors.placeholder}
                      style={styles.TextInput}
                      onChangeText={text => handleOnchanges(text, 'namesp')}
                      placeholder={t('Нименование груза')}
                    />
                  </View>
                  <DropDownPicker
                    placeholder={'Страховка'}
                    containerStyle={[
                      styles.in,
                      {paddingHorizontal: 15, alignItems: 'center'},
                    ]}
                    open={openStrahovka}
                    value={valuesStrahovka}
                    items={itemssStrahovka}
                    setOpen={setOpensStrahovka}
                    setValue={setValuesStrahovka}
                    setItems={setItemssStrahovka}
                  />
                  <View style={styles.in}>
                    <TextInput
                      placeholderTextColor={colors.placeholder}
                      style={styles.TextInput}
                      onChangeText={text => handleOnchanges(text, 'cennost')}
                      placeholder={t('ценность')}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{paddingLeft: 10, fontSize: 20}}>Итого</Text>
                <Text style={{fontSize: 30}}>
                  {formatter.format(+summ || 0).replace('₽', '₽')}
                </Text>
                <Button
                  title={t('отправить')}
                  onPress={submitSignInForm}
                  buttonStyle={[
                    styles.TextInput,
                    {backgroundColor: 'rgb(70,85,31)', paddingHorizontal: 30},
                  ]}
                />
              </View>
              <View style={{marginTop: 100}} />
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
const autoComplete = {
  textInput: {
    color: 'black',
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 8,
    flex: 1,
    color: 'black',
  },

  textInputContainer: {
    flexDirection: 'row',
    color: 'black',
  },
};
const styles = StyleSheet.create({
  in: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  delyvery: {
    paddingHorizontal: 50,
    borderRadius: 15,
    paddingVertical: 10,
  },
  textcolor: {
    color: 'rgb(159,198,79)',
  },
  mapButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    backgroundColor: '#fff',
    elevation: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
  },
  image1: {
    height: 100,
    width: 100,
  },

  image2: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },

  home: {
    backgroundColor: colors.placeholder,
    paddingLeft: 20,
  },

  text1: {
    color: colors.white,
    fontSize: 21,
    paddingBottom: 20,
    paddingTop: 20,
  },

  text2: {
    color: colors.white,
    fontSize: 16,
  },

  view1: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 30,
  },

  button1: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  button1Text: {
    color: colors.white,
    fontSize: 17,
    marginTop: -2,
  },
  card: {
    alignItems: 'center',
    margin: SCREEN_WIDTH / 22,
  },

  view2: {
    marginBottom: 5,
    paddingVertical: 9,
    paddingHorizontal: 9,
    borderRadius: 15,
    backgroundColor: colors.grey6,
  },

  title: {
    color: colors.black,
    fontSize: 16,
  },
  view3: {
    flexDirection: 'row',
    marginTop: 5,
    height: 50,
    backgroundColor: colors.grey6,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  text3: {marginLeft: 15, fontSize: 20, color: colors.black},

  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },

  view5: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 25,
    justifyContent: 'space-between',
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    flex: 1,
  },

  view6: {
    alignItems: 'center',
    flex: 5,
    flexDirection: 'row',
  },
  view7: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  map: {
    height: 150,
    marginVertical: 0,
    width: SCREEN_WIDTH * 0.92,
  },

  text4: {fontSize: 20, color: colors.black, marginLeft: 20, marginBottom: 20},

  icon1: {marginLeft: 10, marginTop: 5},

  view8: {flex: 4, marginTop: -25},
  carsAround: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },

  location: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  view9: {width: 4, height: 4, borderRadius: 2, backgroundColor: 'white'},
  TextInput: {
    color: 'black',
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
});
export default ZakazScreen;
