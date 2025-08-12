import React from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import Colors from '../../constants/color';

import GlobalStyles from '../../constants/globalStyles';
import { moderateHeight, moderateWidth } from '../../constants/responsive';
import { ImagePath } from '../../constants/imagePath';

const Splash = () => {
  return (
    <View style={[GlobalStyles.container, styles.centeredContainer]}>
      <Image
        source={ImagePath.redbusLogo}
        style={{
          width: moderateWidth(50),
          height: moderateHeight(20),
          resizeMode: 'contain',
        }}
      />
      <ActivityIndicator size="large" color={Colors.surface} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  centeredContainer: {
    backgroundColor: Colors.redbusAccent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
