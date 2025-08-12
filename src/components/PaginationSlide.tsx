import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

import { moderateHeight, moderateScale, scale } from '../constants/responsive';
import Colors from '../constants/color';
import Fonts from '../constants/fontPath';
import Icons from '../constants/svgPath';

const { width } = Dimensions.get('window');

interface SlideData {
  id: string;
  title: string;
  points: string[];
  image: any;
}

interface PaginationSlideProps {
  slide: SlideData;
  onPress: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  pointStyle?: TextStyle;
}

const PaginationSlide: React.FC<PaginationSlideProps> = ({
  slide,
  onPress,
  containerStyle,
  imageStyle,
  titleStyle,
  pointStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.slide, containerStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.slideTitle, titleStyle]}>{slide.title}</Text>
      {slide.points.map((point, index) => (
        <View key={index} style={styles.pointContainer}>
          <Icons.BulletPoint
            width={20}
            height={20}
            style={{
              marginRight: moderateScale(8),
            }}
          />
          <Text style={[styles.slidePoint, pointStyle]}>{point}</Text>
        </View>
      ))}
      <Image
        source={slide.image}
        style={[styles.image, imageStyle]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default PaginationSlide;

const styles = StyleSheet.create({
  slide: {
    width: width - moderateScale(32),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: moderateScale(16),
    height: moderateHeight(44),
  },
  image: {
    width: '100%',
    height: moderateHeight(28),
    marginBottom: moderateScale(10),
    alignSelf: 'center',
  },
  slideTitle: {
    fontSize: scale(18),
    marginBottom: moderateScale(10),
    color: Colors.redbusTextPrimary,
    fontFamily: Fonts.bold,
    textAlign: 'left',
    width: '100%',
    paddingLeft: moderateScale(10),
    marginTop: moderateHeight(4),
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(4),
    width: '100%',
    paddingLeft: moderateScale(10),
  },
  slidePoint: {
    fontSize: scale(14),
    color: Colors.redbusTextSecondary,
    fontFamily: Fonts.primary,
    textAlign: 'left',
    flexShrink: 1,
  },
});
