import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { moderateScale, moderateWidth } from '../constants/responsive';
import Fonts from '../constants/fontPath';
import Colors from '../constants/color';

type Variant = 'success' | 'error' | 'info' | 'warning';

interface CustomToastMessageProps {
  title: string;
  message: string;
  variant?: Variant;
  onPress?: (event: GestureResponderEvent) => void;
  onClose?: () => void; // Trigger to remove toast
}

const variantColors: Record<Variant, string> = {
  success: Colors.redbusSuccess,
  error: Colors.redbusError,
  info: Colors.redbusInfo,
  warning: Colors.redbusWarning,
};

const CustomToastMessage: React.FC<CustomToastMessageProps> = ({
  title,
  message,
  variant = 'info',
  onPress,
  onClose,
}) => {
  const progress = useSharedValue(1); // 1 = full width, 0 = gone

  useEffect(() => {
    // Animate bottom bar shrink over 1 second
    progress.value = withTiming(
      0,
      {
        duration: 1000,
        easing: Easing.linear,
      },
      finished => {
        if (finished && onClose) {
          onClose();
        }
      },
    );
  }, [onClose, progress]);

  const bottomBarStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <Pressable
      style={styles.toastContainer}
      onPress={onPress}
      android_ripple={{ color: Colors.redbusPrimary }}
      accessibilityRole="alert"
      accessibilityLabel={`${variant} message: ${title}. ${message}`}
    >
      <View style={styles.toastContent}>
        {/* Left indicator bar */}
        <View
          style={[
            styles.variantBar,
            { backgroundColor: variantColors[variant] },
          ]}
        />

        {/* Text section */}
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
            {message}
          </Text>
        </View>

        {/* Animated Bottom Bar */}
        <Animated.View
          style={[
            styles.bottomBar,
            { backgroundColor: variantColors[variant] },
            bottomBarStyle,
          ]}
        />
      </View>
    </Pressable>
  );
};

export default CustomToastMessage;

const styles = StyleSheet.create({
  toastContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(8),
    width: '100%',
    marginBottom: moderateScale(16),
  },
  toastContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: moderateScale(8),
    padding: 0,
    width: '90%',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative', // for bottom bar
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  variantBar: {
    width: moderateWidth(1),
    height: '100%',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: moderateScale(2),
  },
  textContent: {
    flexShrink: 1,
    padding: moderateScale(8),
  },
  title: {
    fontFamily: Fonts.bold,
    color: Colors.redbusTextPrimary,
  },
  message: {
    fontFamily: Fonts.semiBold,
    color: Colors.redbusTextPrimary,
  },
});
