import React from 'react'
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import HomeHeader from "../../Components/HomeHeader";

function KurerScreen(){
    return(
        <SafeAreaView style={styles.container}>
            <HomeHeader/>
            <ScrollView
                style={{width: "100%", height: "100%"}}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}>
               <View>
                   <Text style={styles.textcolor}>dsifjs</Text>
               </View>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    textcolor:{
        color: 'rgb(159,198,79)',
    }
})
export default KurerScreen
