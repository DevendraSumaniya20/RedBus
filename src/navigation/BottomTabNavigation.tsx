// BottomTabNavigation.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import navigationStrings from '../constants/navigationString';
import Icons from '../constants/svgPath';
import screens from '../screen';
import Colors from '../constants/color';
import { moderateHeight, scale } from '../constants/responsive';
import Fonts from '../constants/fontPath';

type BottomTabParamList = {
  [navigationStrings.Home]: undefined;
  [navigationStrings.Booking]: undefined;
  [navigationStrings.Help]: undefined;
  [navigationStrings.Profile]: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<BottomTabParamList, keyof BottomTabParamList>;
      }): BottomTabNavigationOptions => {
        const iconSize = 24;

        const getIconComponent = () => {
          switch (route.name) {
            case navigationStrings.Home:
              return Icons.Home;
            case navigationStrings.Booking:
              return Icons.Booking;
            case navigationStrings.Help:
              return Icons.Help;
            case navigationStrings.Profile:
              return Icons.Profile;
            default:
              return () => null;
          }
        };

        const IconComponent = getIconComponent();

        return {
          tabBarIcon: ({ color, size = iconSize }) => (
            <IconComponent width={size} height={size} fill={color} />
          ),
          tabBarActiveTintColor: Colors.redbusPrimary,
          tabBarInactiveTintColor: Colors.redbusTextSecondary,
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: scale(10),
            fontFamily: Fonts.bold,
            marginTop: moderateHeight(0.3),
          },
        };
      }}
    >
      <Tab.Screen name={navigationStrings.Home} component={screens.Home} />
      <Tab.Screen
        name={navigationStrings.Booking}
        component={screens.Booking}
      />
      <Tab.Screen name={navigationStrings.Help} component={screens.Help} />
      <Tab.Screen
        name={navigationStrings.Profile}
        component={screens.Profile}
        options={{ tabBarLabel: 'My Account' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
