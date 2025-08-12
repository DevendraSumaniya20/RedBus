import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
} from '../constants/responsive';
import Colors from '../constants/color';
import Fonts from '../constants/fontPath';

const Separator = () => {
  return (
    <View style={styles.orContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
    </View>
  );
};

export default Separator;

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(2),
  },
  line: {
    width: moderateWidth(10),
    height: 1,
    backgroundColor: Colors.border,
  },
  orText: {
    marginHorizontal: moderateWidth(4),
    fontSize: scale(14),
    fontFamily: Fonts.secondary,
  },
});
