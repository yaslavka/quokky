import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    Alert,
    TouchableOpacity,
    RefreshControl, Dimensions, FlatList, StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '../../api';
import * as actions from '../../actions/app.actions';
import {useRef, useState} from 'react';
import HomeHeader from "../../Components/HomeHeader";
import {carsAround, colors, filterData, parameters} from "../../styles";
import {useTranslation} from "react-i18next";
import Svg, {Path} from "react-native-svg";
import {useNavigation} from "@react-navigation/native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {mapStyle} from "../../styles/mapStyle";
const SCREEN_WIDTH = Dimensions.get('window').width
function DashboardScreen(){
    const navigation = useNavigation()
    const {t} = useTranslation('common');
    const userInfo = useSelector(state => state.app.user);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const _map = useRef(1);
    const onRefresh = async () => {
        try {
            setRefresh(true);
            dispatch(actions.userInfo());
        } finally {
            setRefresh(false);
        }
    };
    const [delyvery, setDelyvery]=useState(true)
    return(
        <SafeAreaView style={styles.container}>
            <HomeHeader navigation={navigation}/>
            {/*<View style={{flexDirection:"row", justifyContent: "space-evenly", alignItems: "center"}}>*/}
            {/*    <View style={{flexDirection:"row", marginTop: 5, backgroundColor: colors.delay, borderRadius: 15, borderColor:colors.placeholder, borderWidth: 2, paddingVertical: 5, paddingHorizontal: 40}}>*/}
            {/*        <View style={{flexDirection:"row", alignItems: "center", paddingLeft: 10}}>*/}
            {/*            <Svg fill="#335616" width={30} height={30}*/}
            {/*                 focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FmdGoodIcon"*/}
            {/*                 tabIndex="-1" title="FmdGood">*/}
            {/*                <Path fill="#335616" d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8C20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>*/}
            {/*            </Svg>*/}
            {/*            <Text style={styles.textcolor}>{t('gjfghhjf')}</Text>*/}
            {/*        </View>*/}
            {/*        <View style={{flexDirection:"row", alignItems: "center", marginLeft: 20, backgroundColor: colors.menu, borderRadius: 5, paddingHorizontal: 5}}>*/}
            {/*            <Svg*/}
            {/*                fill="#335616" width={30} height={30}*/}
            {/*                focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HistoryToggleOffIcon"*/}
            {/*                tabIndex="-1" title="HistoryToggleOff">*/}
            {/*                <Path d="m15.1 19.37 1 1.74c-.96.44-2.01.73-3.1.84v-2.02c.74-.09 1.44-.28 2.1-.56zM4.07 13H2.05c.11 1.1.4 2.14.84 3.1l1.74-1c-.28-.66-.47-1.36-.56-2.1zM15.1 4.63l1-1.74c-.96-.44-2-.73-3.1-.84v2.02c.74.09 1.44.28 2.1.56zM19.93 11h2.02c-.11-1.1-.4-2.14-.84-3.1l-1.74 1c.28.66.47 1.36.56 2.1zM8.9 19.37l-1 1.74c.96.44 2.01.73 3.1.84v-2.02c-.74-.09-1.44-.28-2.1-.56zM11 4.07V2.05c-1.1.11-2.14.4-3.1.84l1 1.74c.66-.28 1.36-.47 2.1-.56zm7.36 3.1 1.74-1.01c-.63-.87-1.4-1.64-2.27-2.27l-1.01 1.74c.59.45 1.1.96 1.54 1.54zM4.63 8.9l-1.74-1c-.44.96-.73 2-.84 3.1h2.02c.09-.74.28-1.44.56-2.1zm15.3 4.1c-.09.74-.28 1.44-.56 2.1l1.74 1c.44-.96.73-2.01.84-3.1h-2.02zm-3.1 5.36 1.01 1.74c.87-.63 1.64-1.4 2.27-2.27l-1.74-1.01c-.45.59-.96 1.1-1.54 1.54zM7.17 5.64l-1-1.75c-.88.64-1.64 1.4-2.27 2.28l1.74 1.01c.44-.59.95-1.1 1.53-1.54zM5.64 16.83l-1.74 1c.63.87 1.4 1.64 2.27 2.27l1.01-1.74c-.59-.44-1.1-.95-1.54-1.53zM13 7h-2v5.41l4.29 4.29 1.41-1.41-3.7-3.7V7z"/>*/}
            {/*            </Svg>*/}
            {/*            <Text style={styles.textcolor}>{t('gjfghhjf')}</Text>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <ScrollView
                style={{width: "100%", height: "100%"}}
                bounces={false}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
            >
                <View style ={styles.home}>
                    <Text style = {styles.text1}>Доставка по всей Германии</Text>
                    <View style ={styles.view1}>
                        <View  style ={styles.view8}>
                            <Text style ={styles.text2}>Read a book.Take a nap. Stare out the window</Text>
                            <TouchableOpacity onPress ={()=>{navigation.navigate("RequestScreen",{state:0})}}>
                                <View style ={styles.button1}>
                                    <Text style = {styles.button1Text}>Delivery Quokky</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image
                                style ={styles.image1}
                                source = {require('../../assets/uberCar.png')}
                            />
                        </View>
                    </View>
                </View>
                <View>

                    <FlatList
                        numRows ={4}
                        horizontal = {true}
                        showsHorizontalScrollIndicator ={false}
                        data ={filterData}
                        keyExtractor = {(item)=>item.id}
                        renderItem = { ({item})=>(
                            <View style = {styles.card}>
                                <View style ={styles.view2}>
                                    <Image style ={styles.image2} source = {item.image} />
                                </View>
                                <View>
                                    <Text style ={styles.title}>{item.name}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View style ={styles.view3}>
                    <Text style ={styles.text3}> Where to ?</Text>
                    <View style ={styles.view4}>
                        <Svg
                            fill="#335616" width={30} height={30}
                            focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HistoryToggleOffIcon"
                            tabIndex="-1" title="HistoryToggleOff">
                            <Path d="m15.1 19.37 1 1.74c-.96.44-2.01.73-3.1.84v-2.02c.74-.09 1.44-.28 2.1-.56zM4.07 13H2.05c.11 1.1.4 2.14.84 3.1l1.74-1c-.28-.66-.47-1.36-.56-2.1zM15.1 4.63l1-1.74c-.96-.44-2-.73-3.1-.84v2.02c.74.09 1.44.28 2.1.56zM19.93 11h2.02c-.11-1.1-.4-2.14-.84-3.1l-1.74 1c.28.66.47 1.36.56 2.1zM8.9 19.37l-1 1.74c.96.44 2.01.73 3.1.84v-2.02c-.74-.09-1.44-.28-2.1-.56zM11 4.07V2.05c-1.1.11-2.14.4-3.1.84l1 1.74c.66-.28 1.36-.47 2.1-.56zm7.36 3.1 1.74-1.01c-.63-.87-1.4-1.64-2.27-2.27l-1.01 1.74c.59.45 1.1.96 1.54 1.54zM4.63 8.9l-1.74-1c-.44.96-.73 2-.84 3.1h2.02c.09-.74.28-1.44.56-2.1zm15.3 4.1c-.09.74-.28 1.44-.56 2.1l1.74 1c.44-.96.73-2.01.84-3.1h-2.02zm-3.1 5.36 1.01 1.74c.87-.63 1.64-1.4 2.27-2.27l-1.74-1.01c-.45.59-.96 1.1-1.54 1.54zM7.17 5.64l-1-1.75c-.88.64-1.64 1.4-2.27 2.28l1.74 1.01c.44-.59.95-1.1 1.53-1.54zM5.64 16.83l-1.74 1c.63.87 1.4 1.64 2.27 2.27l1.01-1.74c-.59-.44-1.1-.95-1.54-1.53zM13 7h-2v5.41l4.29 4.29 1.41-1.41-3.7-3.7V7z"/>
                        </Svg>
                        <Text style={styles.textcolor}>{t('Now')}</Text>
                        <Svg fill="#335616" width={30} height={30}
                             focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FmdGoodIcon"
                             tabIndex="-1" title="FmdGood">
                            <Path fill="#335616" d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8C20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                        </Svg>
                    </View>
                </View>
                <View style ={{alignItems:"center",justifyContent:"center"}}>
                    <MapView
                        ref = {_map}
                        provider ={PROVIDER_GOOGLE}
                        style = {styles.map}
                        customMapStyle ={mapStyle}
                        showsUserLocation ={true}
                        followsUserLocation = {true}
                        initialRegion = {{...carsAround[0],latitudeDelta:0.008,longitudeDelta:0.008}}

                    >
                        {carsAround.map((item,index)=>
                            <Marker coordinate = {item} key= {index.toString()}>
                                <Image
                                    source = {require('../../assets/carMarker.png')}
                                    style ={styles.carsAround}
                                    resizeMode = "cover"
                                />
                            </Marker>

                        )

                        }

                    </MapView>
                </View>
            </ScrollView>
            <StatusBar style ="light" backgroundColor = {colors.placeholder} translucent ={true} />
            <View style={styles.mapButton}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Map')}}>
                    <Svg fill="#335616" width={30} height={30}
                         focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FmdGoodIcon"
                         tabIndex="-1" title="FmdGood">
                        <Path fill="#335616" d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.32 2.67 7.25 8 11.8 5.33-4.55 8-8.48 8-11.8C20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </Svg>
                    <Text style={styles.textcolor}>{t('Map')}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.white,

    },
    delyvery:{
        paddingHorizontal: 50,
        borderRadius: 15,
        paddingVertical: 10

    },
    textcolor:{
        color: 'rgb(159,198,79)'
    },
    mapButton:{
        position: 'absolute',
        bottom: 10,
        right: 15,
        backgroundColor: '#fff',
        elevation: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems:'center'
    },
    image1:{

        height:100,
        width:100,

    },

    image2:{height:60,width:60,
        borderRadius:30,
    },

    home:{
        backgroundColor:colors.placeholder,
        paddingLeft:20,

    },

    text1:{
        color:colors.white,
        fontSize:21,
        paddingBottom:20,
        paddingTop:20
    },

    text2:{
        color:colors.white,
        fontSize:16
    },

    view1:{
        flexDirection:"row",
        flex:1,
        paddingTop:30
    },

    button1:{
        height:40,
        width:150,
        backgroundColor:colors.black,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },

    button1Text:{
        color:colors.white,
        fontSize:17,
        marginTop:-2

    },
    card:{
        alignItems:"center",
        margin:SCREEN_WIDTH/22

    },

    view2:{marginBottom:5,
        borderRadius:15,
        backgroundColor:colors.grey6
    },

    title:{
        color:colors.black,
        fontSize:16
    },
    view3:{flexDirection:"row",
        marginTop :5,
        height:50,
        backgroundColor:colors.grey6,
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:15

    },
    text3:{marginLeft:15,
        fontSize:20,
        color:colors.black
    },

    view4:{ flexDirection:"row",
        alignItems:"center",
        marginRight:15,
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:2,
        borderRadius:20
    },

    view5:{ flexDirection:"row",
        alignItems:"center",
        backgroundColor:"white",
        paddingVertical:25,
        justifyContent:"space-between",
        marginHorizontal:15,
        borderBottomColor:colors.grey4,
        borderBottomWidth:1,
        flex:1
    },

    view6:{


        alignItems:"center",
        flex:5,
        flexDirection:"row"
    },
    view7:{
        backgroundColor:colors.grey6,
        height:40,
        width:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        marginRight:20

    },

    map:{

        height: 150,
        marginVertical: 0,
        width:SCREEN_WIDTH*0.92
    },

    text4:{ fontSize:20,
        color:colors.black,
        marginLeft:20,
        marginBottom:20
    },

    icon1:  {marginLeft:10,
        marginTop:5
    },

    view8: {flex:4,
        marginTop:-25
    } ,
    carsAround: {
        width: 28,
        height: 14,

    },

    location: {
        width: 16,
        height: 16,
        borderRadius:8,
        backgroundColor:colors.blue,
        alignItems:"center",
        justifyContent:"center"

    },

    view9:{width:4,
        height:4,
        borderRadius:2,
        backgroundColor:"white"
    }

})
export default DashboardScreen;
