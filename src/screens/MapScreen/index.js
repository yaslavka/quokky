import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image, Platform, ScrollView
} from 'react-native'
import {colors, parameters, rideData} from "../../styles";
import {useTranslation} from "react-i18next";
import Svg, {Path} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import {Button} from "@rneui/base";
import {Avatar} from "@rneui/themed";
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from "react-redux";
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAP_KEY} from "../../constants/googleMapKey";
import {mapStyle} from "../../styles/mapStyle";
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import avatar from '../../assets/images/icons/camera_200.png';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
function MapScreen(){
    const GOOGLE_MAPS_APIKEY="AIzaSyA5tTXA1HWY3Jd-MBieJisz_LMva01xo60"
    const navigation =useNavigation()
    const {t} = useTranslation('common')
    const userInfo = useSelector(state => state.app.user);
    const snapPoints1 = useMemo(()=>['70%'],[])
    const handleSheetChange1  = useCallback((index)=>{},[])
    const ref = useRef()
    const refs = useRef()
    const markerRef = useRef()
    const [location, setLocation] = useState({
        origin:{

            latitude: 37.78825,
            longitude: -122.4324,

        },
        distance:{}
    })
    const {origin, distance} = location

    Geolocation.getCurrentPosition(
        (position) => {
            setLocation({origin: position.coords, distance:position.coords });
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    useEffect(() => {
        refs.current?.setAddressText('');
    }, []);

    return(
        <>
            {userInfo && (
                <>
                    <View style ={styles.container}>
                        <View style ={styles.view1}>
                            <TouchableOpacity onPress ={()=>navigation.goBack()}>
                                <Svg fill="#335616" width={30} height={30}
                                     focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIcon" tabIndex="-1"
                                     title="ArrowBack">
                                    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                </Svg>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.view2}>
                            <TouchableOpacity>
                                <View style ={styles.view3}>
                                    <Avatar
                                        rounded
                                        avatarStyle ={{borderRadius:50}}
                                        size ={30}
                                        source = {
                                            userInfo.avatar
                                                ?{
                                                    uri: `https://kosmoss.host/api/user/${userInfo.avatar}`,
                                                }:require('../../assets/blankProfilePic.jpg')
                                        }
                                    />
                                    <Text style ={{marginLeft:5, color:'black'}}>For Someone</Text>
                                    <Svg fill="#335616" width={30} height={30}
                                         focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="KeyboardArrowDownIcon"
                                         tabIndex="-1" title="KeyboardArrowDown">
                                        <Path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                            <View style ={styles.view4}>
                                {/*<View>*/}
                                {/*    <Image*/}
                                {/*        style = {styles.image1}*/}
                                {/*        source ={require("../../assets/transit.png")}*/}
                                {/*    />*/}
                                {/*</View>*/}
                                <ScrollView

                                    style={{flex: 1,  backgroundColor: '#fff', }}>
                                    <>
                                        < >
                                            <GooglePlacesAutocomplete
                                                ref={refs}
                                                placeholder={`${t('Адрес')}`}
                                                query ={{
                                                    key:GOOGLE_MAPS_APIKEY,
                                                    language:"en"
                                                }}
                                                minLength ={2}
                                                fetchDetails ={true}
                                                autoFocus ={false}
                                                styles = {autoComplete}
                                                debounce ={400}
                                                onPress={(data, detail = null)=>{
                                                    setLocation({...location, origin: {
                                                            latitude: detail.geometry.location.lat,
                                                            longitude: detail.geometry.location.lng
                                                        }})
                                                }}
                                            />
                                        </>
                                        <View style ={styles.view7}>
                                            <GooglePlacesAutocomplete
                                                ref={refs}
                                                placeholder={`${t('Адрес')}`}
                                                query ={{
                                                    key:GOOGLE_MAPS_APIKEY,
                                                    language:"en"
                                                }}
                                                minLength ={2}
                                                fetchDetails ={true}
                                                autoFocus ={false}
                                                styles = {autoComplet}
                                                debounce ={400}
                                                onPress={(data, detail = null)=>{
                                                    setLocation({...location, distance: {
                                                            latitude: detail.geometry.location.lat,
                                                            longitude: detail.geometry.location.lng
                                                        }})
                                                }}
                                            />
                                            {/*<View style ={styles.view8}>*/}
                                            {/*    <Svg fill="#335616" width={30} height={30}*/}
                                            {/*         focusable="false" aria-hidden="true" viewBox="0 0 24 24"*/}
                                            {/*         data-testid="LocalHospitalIcon" tabIndex="-1" title="LocalHospital">*/}
                                            {/*        <Path*/}
                                            {/*            d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>*/}
                                            {/*    </Svg>*/}
                                            {/*</View>*/}
                                        </View>
                                    </>
                                </ScrollView>

                            </View>
                        </View>
                        <MapView
                            ref={ref}
                            initialRegion = {{...origin,   latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                            customMapStyle ={mapStyle}
                            style={styles.map}
                            provider ={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                            showsUserLocation ={true}
                            followsUserLocation = {true}
                        >
                            <Marker ref={markerRef}
                                coordinate={{...origin,   latitudeDelta: 0.0922, longitudeDelta: 0.0421}}

                            >
                                <Image
                                    style={{width: 30, height:30, borderRadius: 50}}
                                    source={
                                        userInfo?.avatar
                                            ?{uri:`https://kosmoss.host/api/user/${userInfo?.avatar}`,}
                                            :avatar
                                    }/>
                            </Marker>

                            {Object.keys(distance).length > 0 && (
                                <Marker ref={markerRef}
                                        coordinate={{...distance, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}

                                >
                                    <Image source={
                                        userInfo?.avatar
                                            ?{uri:`https://kosmoss.host/api/user/${userInfo?.avatar}`,}
                                            :avatar
                                    }/>

                                </Marker>
                            )}
                            {Object.keys(distance).length > 0 && (
                                <MapViewDirections
                                    optimizeWaypoints={true}
                                    origin={{...origin,   latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                                    destination={{...distance, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                                    apikey={GOOGLE_MAP_KEY}
                                    strokeWidth={3}
                                    strokeColor="red"
                                    onStart={(params) => {
                                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);

                                    }}
                                />
                            )}
                        </MapView>


                    </View>
                </>
            )}
        </>
    )
}
const autoComplete = {

    textInput:{
        color: 'black',
        height: 50,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        borderWidth:1,
        marginHorizontal:15,

    },
    container: {
        paddingTop:8,
        flex: 1,
        color: 'black',


    },

    textInputContainer: {
        flexDirection: 'row',
        color: 'black',

    },

}
const autoComplet = {

    textInput:{
        color: 'black',
        height: 50,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        borderWidth:1,
        marginHorizontal:15,

    },
    container: {
        paddingTop:8,
        flex: 1,


    },

    textInputContainer: {
        color: 'black',
        flexDirection: 'row',

    },

}

const styles = StyleSheet.create({
    container1:{flex:1,
        paddingTop:parameters.statusBarHeight,

    },

    container: {
        flex: 1,
        paddingTop:parameters.statusBarHeight

    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',

    },

    view1:{
        position:"absolute",
        top:25,
        left:12,
        backgroundColor:colors.white,
        height:40,
        width:40,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        marginTop:2,
        zIndex: 8

    },

    view2:{
        height:SCREEN_HEIGHT*0.31,
        alignItems:"center",
        zIndex: 5,
        backgroundColor:colors.white
    },

    view3:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:2,
        marginBottom:10,
        backgroundColor: colors.white,
        //height:30,
        zIndex:10,


    },
    view4:{
        flexDirection:"row",
        alignItems:"center",

    },
    view5:{
        backgroundColor:colors.grey7,
        width:SCREEN_WIDTH*0.70,
        height:40,
        justifyContent:"center",
        marginTop:10,

    },
    view6:{
        backgroundColor:colors.grey6,
        width:SCREEN_WIDTH*0.70,
        height:40,
        justifyContent:"center",
        marginTop:10,
        paddingLeft:0
    },
    text1:{
        marginLeft:10,
        fontSize:16,
        color:colors.grey1
    },

    image1:{  height:70,
        width:30,
        marginRight:10,
        marginTop:10,
    },
    view7:{
        flexDirection:"row",
        alignItems:"center",
    },
    view8:{
        marginLeft:10
    },
    view10:{
        alignItems:"center",
        flex:5,
        flexDirection:"row",
        paddingVertical:10,
        borderBottomColor:colors.grey5,
        borderBottomWidth:1,
        paddingHorizontal:15
    },
    view11:{
        backgroundColor:colors.grey,
        height:30,
        width:30,
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
        marginRight:15,
        marginTop:15,
    },


    view12:{
        alignItems:"center",
        paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:colors.grey4
    },

    text2:{
        fontSize:18,
        color:colors.grey1
    },
    text3:{
        fontSize:16,
        color:colors.black,
        fontWeight:"bold",
        marginRight:5,

    },

    text4:{color:colors.grey2,
        marginTop:4
    },

    view13:{
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:5
    },

    button1:{
        height:40,
        width:100,
        backgroundColor:colors.grey6,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },

    button2:{
        height:50,
        backgroundColor:colors.grey10,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginHorizontal:30
    },



    button1Text:{

        fontSize:17,
        marginTop:-2,
        color:colors.black

    },

    button2Text:{
        color:colors.white,
        fontSize:23,
        marginTop:-2,


    },


    view14:{


        alignItems:"center",
        flex:5,
        flexDirection:"row"
    },
    view15:{
        backgroundColor:colors.grey6,
        height:40,
        width:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        marginRight:20

    },

    view16:{
        flexDirection:"row",
        alignItems:"baseline"
    },

    text5:{
        fontSize:12,
        color:colors.black,
        marginLeft:3,
        fontWeight:"bold",
        paddingBottom:1

    },

    view17:{

    },

    view18:{



    },

    view19:{flex:1.7,
        alignItems:"flex-end",

    },

    icon:{paddingBottom:2},

    image2:{height:60,width:60 },

    view20:{marginRight:10 },

    text6:{
        fontSize:15,
        color:colors.black,
        fontWeight:"bold",
    },

    view21:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:30,
        marginTop:15
    },

    view22:{
        alignItems:"center",
        marginBottom:-20
    },

    sectionHeaderContainer: {
        backgroundColor: "white",
        marginTop:30,
        paddingLeft:15
    },

    text7 : {
        fontSize:28,
        color:colors.black,
        marginRight:5,

    },

    text8:{
        fontSize:15,
        color:colors.grey2,
        textDecorationLine:"line-through"


    },

    button3:{

        height:60,
        backgroundColor:colors.black,
        alignItems:"center",
        justifyContent:"center",
        width:SCREEN_WIDTH-110,
        marginBottom:10
    },

    view23:{
        flexDirection:"row",
        backgroundColor:colors.cardbackground,
        // elevation:10,
        justifyContent:"space-between",
        alignItems:"flex-end",
        paddingHorizontal:20,
        height:80,

    },

    button2Image:{
        height:55,
        width:55,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.grey6,
        marginBottom:10,

    }
    ,
    text9:{fontSize:15,
        color:colors.grey1
    },


    map: {
        height: "100%",
        width: "100%"
    },

    centeredView: {
        zIndex:14
    },
    modalView: {
        marginHorizontal: 20,
        marginVertical:60,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex:16
    },

    view24:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:15,
        paddingHorizontal:20
    },

    view25:{
        flexDirection:'row',
        alignItems:"baseline"
    },

    flatlist:{
        marginTop:20
    },

    text10:{color:colors.grey2,
        paddingLeft:10
    }

})
export default MapScreen
