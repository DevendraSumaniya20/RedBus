import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/AuthNavigation';
import navigationStrings from '../../constants/navigationString';
import Colors from '../../constants/color';
import Icons from '../../constants/svgPath';
import {
  moderateHeight,
  moderateScale,
  moderateWidth,
  scale,
} from '../../constants/responsive';
import Components from '../../components';
import Fonts from '../../constants/fontPath';
import { useAppDispatch } from '../../redux/hooks';
import { setLogin } from '../../redux/slices/authSlice';
import styles from './styles';
import i18n from '../../translate';

type OTPRouteProp = RouteProp<AuthStackParamList, typeof navigationStrings.OTP>;

interface Props {
  route: OTPRouteProp;
  navigation: NavigationProp<AuthStackParamList, typeof navigationStrings.OTP>;
}

const OTP: React.FC<Props> = ({ route, navigation }) => {
  const { phoneNumber, countryCode, country, language } = route.params;
  const dispatch = useAppDispatch();

  const OTP_LENGTH = Number(i18n.t('OtpLength'));
  const TIMER_SECONDS = Number(i18n.t('OtpTimerSeconds'));

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState<number>(TIMER_SECONDS);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const inputRefs = useRef<TextInput[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  const handleChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);

    if (cleanText && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(TIMER_SECONDS);
    inputRefs.current[0]?.focus();
    setShowToast(true);
  };

  const handleVerify = async () => {
    if (!isOtpComplete) return;

    setIsVerifying(true);

    try {
      const otpString = otp.join('');
      console.log('Verifying OTP:', otpString);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch(setLogin(true));
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icons.Cross
            width={moderateScale(26)}
            height={moderateScale(26)}
            fill={Colors.redbusTextPrimary}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>{i18n.t('EnterOtpTitle')}</Text>

          {/* Phone Number Section */}
          <View style={styles.phoneSection}>
            <Text style={styles.phoneNumber}>
              {countryCode} {phoneNumber}
            </Text>
            <Text style={styles.mobileLabel}>
              {i18n.t('MobileNumberLabel')}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate(navigationStrings.Login, {
                  country,
                  language,
                })
              }
            >
              <Text style={styles.editText}>{i18n.t('Edit')}</Text>
            </TouchableOpacity>
          </View>

          {/* OTP Label */}
          <Text style={styles.otpLabel}>{i18n.t('EnterOtpLabel')}</Text>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => {
              const isActive =
                digit === '' && index === otp.findIndex(d => d === '');
              const isFilled = digit !== '';
              return (
                <TextInput
                  key={index}
                  ref={ref => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.input,
                    isActive ? styles.inputActive : null,
                    isFilled ? styles.inputFilled : null,
                  ]}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  editable={!isVerifying}
                />
              );
            })}
          </View>

          {/* Verify Button */}
          <Components.ActionButton
            title={i18n.t('VerifyOtp')}
            onPress={handleVerify}
            disabled={!isOtpComplete || isVerifying}
            buttonStyle={[
              styles.verifyButton,
              (!isOtpComplete || isVerifying) && styles.verifyButtonDisabled,
            ]}
            textStyle={[
              styles.verifyButtonText,
              (!isOtpComplete || isVerifying) &&
                styles.verifyButtonTextDisabled,
            ]}
          />

          {/* Resend Section */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>{i18n.t('DidNotGetOtp')}</Text>
            {timer > 0 ? (
              <Text style={styles.resendText}>
                {' '}
                {i18n.t('TryAgainIn')}{' '}
                <Text style={styles.timerText}>
                  {`${Math.floor(timer / 60)
                    .toString()
                    .padStart(2, '0')}:${(timer % 60)
                    .toString()
                    .padStart(2, '0')}`}
                </Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={isVerifying}>
                <Text
                  style={[styles.resendLink, isVerifying && { opacity: 0.5 }]}
                >
                  {i18n.t('ResendOtp')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Toast */}
        {showToast && (
          <Components.CustomToastMessage
            message={i18n.t('OtpSentSuccessfully')}
            title={i18n.t('Success')}
            variant="success"
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTP;
