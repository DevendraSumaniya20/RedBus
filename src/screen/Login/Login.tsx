import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import Components from '../../components';
import Icons from '../../constants/svgPath';

import { ImagePath } from '../../constants/imagePath';
import { useToast } from '../../utils/ToastProvider';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import navigationStrings from '../../constants/navigationString';
import { RouteProp } from '@react-navigation/native';
import i18n from '../../translate';

interface SlideData {
  id: string;
  title: string;
  points: string[];
  image: any;
}

type LoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  typeof navigationStrings.Login
>;

type LoginRouteProp = RouteProp<
  AuthStackParamList,
  typeof navigationStrings.Login
>;

interface Props {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
}

const Login: React.FC<Props> = ({ navigation, route }) => {
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const { showToast } = useToast();
  const { country, language } = route.params || {};

  // ✅ Generate slides dynamically based on current language
  const slides: SlideData[] = useMemo(
    () => [
      {
        id: '1',
        title: i18n.t('Slide1Title'),
        points: [
          i18n.t('Slide1Points1'),
          i18n.t('Slide1Points2'),
          i18n.t('Slide1Points3'),
        ],
        image: ImagePath.redbusLogo,
      },
      {
        id: '2',
        title: i18n.t('Slide2Title'),
        points: [
          i18n.t('Slide2Points1'),
          i18n.t('Slide2Points2'),
          i18n.t('Slide2Points3'),
        ],
        image: ImagePath.redbusLogo,
      },
      {
        id: '3',
        title: i18n.t('Slide3Title'),
        points: [
          i18n.t('Slide3Points1'),
          i18n.t('Slide3Points2'),
          i18n.t('Slide3Points3'),
        ],
        image: ImagePath.redbusLogo,
      },
    ],
    [i18n.language],
  ); // re-run when language changes

  // Auto scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const handleSkip = () => {
    const lastIndex = slides.length - 1;
    flatListRef.current?.scrollToIndex({ index: lastIndex, animated: true });
    setCurrentIndex(lastIndex);
  };

  const renderPaginationHeader = () => (
    <View style={styles.paginationContainer}>
      <View style={styles.pageNumberContainer}>
        <View style={styles.pageNumberPill}>
          <Text style={styles.pageNumberText}>
            <Text style={styles.currentNumber}>{currentIndex + 1}</Text>
            <Text style={styles.totalNumber}>/{slides.length}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              flatListRef.current?.scrollToIndex({ index, animated: true });
              setCurrentIndex(index);
            }}
          >
            <View
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
        <Text style={styles.skipButton}>{i18n.t('Skip')}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleGetOtp = () => {
    if (!mobileNumber.trim()) {
      showToast({
        id: 'empty_phone',
        title: i18n.t('MissingNumberTitle'),
        message: i18n.t('MissingNumberMessage'),
        variant: 'error',
      });

      return;
    }

    navigation.navigate(navigationStrings.OTP, {
      phoneNumber: mobileNumber,
      countryCode: countryCode,
      country,
      language,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sliderContainer}>
        {renderPaginationHeader()}

        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Components.PaginationSlide slide={item} onPress={() => {}} />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      <Components.BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
      >
        <Components.CustomText
          text={i18n.t('LoginHeader')}
          containerStyle={styles.loginHeaderContainer}
          textStyle={styles.loginHeaderText}
        />

        <Components.NumberInput
          countryCode={countryCode}
          mobileNumber={mobileNumber}
          onChangeCountryCode={setCountryCode}
          onChangeMobileNumber={setMobileNumber}
        />

        <Components.ActionButton
          variant="default"
          title={i18n.t('GetOtp')}
          onPress={handleGetOtp}
        />
        <Components.Seprator />

        <Components.ActionButton
          variant="social"
          title={i18n.t('SignInWithGoogle')}
          onPress={() => console.log('Google Sign-In Pressed')}
          icon={<Icons.GoogleLogo height={20} width={20} />}
        />
      </Components.BottomSheet>
    </SafeAreaView>
  );
};

export default Login;
