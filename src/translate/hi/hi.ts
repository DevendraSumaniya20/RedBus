const emailMaxLength = 50;
const passwordMaxLength = 30;
const otpLength = 6;
const otpTimerSeconds = 5;

export default {
  Login: 'लॉगिन',
  Password: 'पासवर्ड',
  SignUp: 'साइन अप',
  EnterAnEmailorPhone: 'एक ईमेल या फोन नंबर दर्ज करें',
  EnteraPassword: 'एक पासवर्ड दर्ज करें',
  ForgetPassword: 'पासवर्ड भूल गए',
  username: 'यूजरनेम दर्ज करें',
  DontHaveanAccount: 'खाता नहीं है?',
  EmailError: 'कृपया अपना ईमेल दर्ज करें',
  EmailProper: 'कृपया एक वैध ईमेल दर्ज करें',
  EmailLength: `ईमेल ${emailMaxLength} अक्षरों से कम होना चाहिए`,
  PasswordError: 'कृपया अपना पासवर्ड दर्ज करें',
  PasswordLessCharacters: 'कृपया कम से कम 5 अक्षर दर्ज करें',
  PasswordLength: `पासवर्ड ${passwordMaxLength} अक्षरों से कम होना चाहिए`,
  PasswordRegex:
    'पासवर्ड में कम से कम 1 बड़ा अक्षर, 1 छोटा अक्षर, 1 नंबर और 1 विशेष अक्षर होना चाहिए',
  Back: 'पीछे',
  Error: 'त्रुटि',
  Pleasetryagainlater: 'एक त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें।',
  Country: 'देश',
  ChooseLanguage: 'अपनी भाषा चुनें',
  GetStarted: 'शुरू करें',
  SelectCountry: 'देश चुनें',
  ChangeLanguageNote: "आप बाद में 'मेरा खाता' में भाषा बदल सकते हैं",

  CountryCodeLabel: 'देश कोड',
  MobileNumberLabel: 'मोबाइल नंबर',
  MobileNumberPlaceholder: 'मोबाइल नंबर दर्ज करें',
  Close: 'बंद करें',

  LoginHeader: 'लॉगिन करें या नया खाता बनाएं',
  GetOtp: 'ओटीपी प्राप्त करें',
  SignInWithGoogle: 'गूगल से साइन इन करें',
  Skip: 'स्किप',
  MissingNumberTitle: 'नंबर नहीं मिला',
  MissingNumberMessage: 'कृपया अपना नंबर दर्ज करें।',

  Slide1Title: '18 वर्षों की खुशहाल यात्राएँ!',
  Slide1Points1: '4 करोड़+ यात्री',
  Slide1Points2: '4400+ बस ऑपरेटर',
  Slide1Points3: '3.6 लाख+ बस मार्ग',

  Slide2Title: 'कभी भी, कहीं भी बुक करें!',
  Slide2Points1: '24x7 बुकिंग सपोर्ट',
  Slide2Points2: 'तुरंत टिकट की पुष्टि',
  Slide2Points3: 'भारत भर में उपलब्ध',

  Slide3Title: 'लाखों लोगों का भरोसा!',
  Slide3Points1: 'सुरक्षित भुगतान',
  Slide3Points2: 'रियल-टाइम ट्रैकिंग',
  Slide3Points3: 'आसान रद्दीकरण',

  OtpLength: otpLength,
  OtpTimerSeconds: otpTimerSeconds,
  EnterOtpTitle: 'हमने आपको भेजा गया ओटीपी दर्ज करें',
  Edit: 'संपादित करें',
  EnterOtpLabel: 'ओटीपी (वन टाइम पासवर्ड) दर्ज करें',
  VerifyOtp: 'ओटीपी सत्यापित करें',
  DidNotGetOtp: 'ओटीपी नहीं मिला?',
  TryAgainIn: 'फिर से प्रयास करें',
  ResendOtp: 'ओटीपी पुनः भेजें',
  OtpSentSuccessfully: 'ओटीपी सफलतापूर्वक भेजा गया!',
  Success: 'सफलता',

  // Country Names
  India: 'India',
  UnitedStates: 'United States',
  Canada: 'Canada',
  UnitedKingdom: 'United Kingdom',
  Australia: 'Australia',
  Germany: 'Germany',
  France: 'France',
  Japan: 'Japan',
  Brazil: 'Brazil',
  SouthAfrica: 'South Africa',
};
