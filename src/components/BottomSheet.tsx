import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Colors from '../constants/color';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
} from '../constants/responsive';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SNAP_POINT = Math.min(400, SCREEN_HEIGHT * 0.6);

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, children }) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    translateY.value = withSpring(
      visible ? SCREEN_HEIGHT - SNAP_POINT : SCREEN_HEIGHT,
      {
        damping: 20,
        stiffness: 120,
      },
    );
  }, [visible]);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const newTranslateY = event.translationY + translateY.value;
      translateY.value = Math.max(SCREEN_HEIGHT - SNAP_POINT, newTranslateY);
    })
    .onEnd(() => {
      // Snap back to open position
      translateY.value = withSpring(SCREEN_HEIGHT - SNAP_POINT, {
        damping: 20,
        stiffness: 120,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.handle} />
        <ScrollView
          contentContainerStyle={{ paddingBottom: moderateHeight(0.5) }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SNAP_POINT,
    backgroundColor: Colors.redbusBackground,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    paddingHorizontal: moderateWidth(8),
    paddingTop: 10,
  },
  handle: {
    width: moderateWidth(10),
    height: moderateHeight(0.4),
    backgroundColor: Colors.black10,
    borderRadius: moderateScale(5),
    alignSelf: 'center',
    marginBottom: moderateHeight(1),
  },
});
