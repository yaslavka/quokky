import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, parameters} from '../../styles';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

function HomeHeader() {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.header,
        {alignItems: 'center', justifyContent: 'space-between'},
      ]}>
      <TouchableOpacity
        style={{marginLeft: 15}}
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Svg
          width={30}
          height={30}
          fill="#fff"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="MenuIcon"
          tabIndex="-1"
          title="Menu">
          <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: colors.placeholder,
    height: parameters.headerHeight,
  },
});
export default HomeHeader;
