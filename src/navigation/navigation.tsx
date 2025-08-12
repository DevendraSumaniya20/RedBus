import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigation from './AuthNavigation';

import { useAppSelector } from '../redux/hooks';
import { isLoginSelector } from '../redux/slices/authSlice';
import screens from '../screen';

const Navigation: React.FC = () => {
  const isLoggedIn = useAppSelector(isLoginSelector);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <screens.Splash />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <BottomTabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
