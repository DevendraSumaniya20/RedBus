import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
  Pressable,
  StyleProp,
} from 'react-native';
import { moderateScale, scale } from '../constants/responsive';
import Colors from '../constants/color';
import Fonts from '../constants/fontPath';

type CustomTextProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const CustomText: React.FC<CustomTextProps> = ({
  text,
  onPress,
  containerStyle,
  textStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    backgroundColor: Colors.redbusBackground,
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(16),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.primary,
  },
});
