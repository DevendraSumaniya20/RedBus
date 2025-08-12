import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Colors from '../constants/color';
import { moderateScale, scale } from '../constants/responsive';
import Fonts from '../constants/fontPath';

interface ActionButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'default' | 'social';
  icon?: JSX.Element | ImageSourcePropType;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
  variant = 'default',
  icon,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          variant === 'default' && styles.defaultButton,
          variant === 'social' && styles.socialButton,
          disabled && styles.disabledButton,
          buttonStyle,
        ]}
      >
        {/* Render icon conditionally */}
        {variant === 'social' &&
          icon &&
          (typeof icon === 'object' && !('uri' in icon) ? (
            icon // SVG Component
          ) : (
            <Image source={icon as ImageSourcePropType} style={styles.icon} />
          ))}
        <Text
          style={[
            styles.buttonText,
            variant === 'default' && styles.defaultButtonText,
            variant === 'social' && styles.socialButtonText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: scale(16),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(12),
    borderRadius: moderateScale(26),
  },
  defaultButton: {
    backgroundColor: Colors.redbusPrimary,
  },
  socialButton: {
    backgroundColor: Colors.redbusBackground,
    borderWidth: 1.5,
    borderColor: Colors.black,
  },
  disabledButton: {
    backgroundColor: Colors.redbusDisabled,
  },
  buttonText: {
    fontSize: scale(14),
    fontFamily: Fonts.bold,
  },
  defaultButtonText: {
    color: Colors.redbusBackground,
  },
  socialButtonText: {
    marginLeft: moderateScale(16),
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
});
