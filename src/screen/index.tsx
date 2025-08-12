// screens/index.tsx

import Setting from './Setting/Setting';
import Booking from './Booking/Booking';
import Help from './Help/Help';
import Profile from './Profile/Profile';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import LanguageSelection from './LanguageSelection/LanguageSelection';
import Splash from './Splash/Splash';
import OTP from './OTP/OTP';

export type ScreenList = {
  Home: React.ComponentType<any>;
  Setting: React.ComponentType<any>;
  Booking: React.ComponentType<any>;
  Help: React.ComponentType<any>;
  Profile: React.ComponentType<any>;
  Login: React.ComponentType<any>;
  Register: React.ComponentType<any>;
  ForgotPassword: React.ComponentType<any>;
  LanguageSelection: React.ComponentType<any>;
  Splash: React.ComponentType<any>;
  OTP: React.ComponentType<any>;
};

const screens: ScreenList = {
  Home,
  Setting,
  Booking,
  Help,
  Profile,
  Login,
  ForgotPassword,
  Register,
  LanguageSelection,
  Splash,
  OTP,
};

export default screens;
