// src/navigation/Navigation.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigation from './AuthNavigation';

import { useAppSelector } from '../redux/hooks';
import { faceSelector } from '../redux/slices/faceSlice';

import screens from '../screen';

const Navigation: React.FC = () => {
  const { isAuthenticated } = useAppSelector(faceSelector);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate splash delay for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <screens.Splash />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
