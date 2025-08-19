// AuthNavigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import screens from '../screen';
import navigationStrings from '../constants/navigationString';

export type AuthStackParamList = {
  [navigationStrings.FaceRecognition]: undefined;
  [navigationStrings.LanguageSelection]: undefined;
  [navigationStrings.Login]: {
    country: { flag: string; name: string };
    language: string;
  };
  [navigationStrings.Register]: undefined;
  [navigationStrings.ForgotPassword]: undefined;
  [navigationStrings.OTP]: {
    phoneNumber: string;
    countryCode: string;
    country: { flag: string; name: string };
    language: string;
  };
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={navigationStrings.FaceRecognition} // Start with Face Recognition
    >
      <Stack.Screen
        name={navigationStrings.FaceRecognition}
        component={screens.FaceRecognition}
      />

      <Stack.Screen
        name={navigationStrings.LanguageSelection}
        component={screens.LanguageSelection}
      />

      <Stack.Screen name={navigationStrings.Login} component={screens.Login} />
      <Stack.Screen
        name={navigationStrings.Register}
        component={screens.Register}
      />
      <Stack.Screen
        name={navigationStrings.ForgotPassword}
        component={screens.ForgotPassword}
      />
      <Stack.Screen name={navigationStrings.OTP} component={screens.OTP} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
