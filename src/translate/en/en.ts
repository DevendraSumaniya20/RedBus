const emailMaxLength = 50;
const passwordMaxLength = 30;
const otpLength = 6;
const otpTimerSeconds = 5;

export default {
  Login: 'Login',
  Password: 'Password',
  SignUp: 'Sign Up',
  EnterAnEmailorPhone: 'Enter an email or phone number',
  EnteraPassword: 'Enter a password',
  ForgetPassword: 'Forgot Password',
  username: 'Enter a Username',
  DontHaveanAccount: "Don't have an account?",
  EmailError: 'Please enter your email',
  EmailProper: 'Please enter a valid email',
  EmailLength: `Email must be less than ${emailMaxLength} characters`,
  PasswordError: 'Please enter your password',
  PasswordLessCharacters: 'Please enter at least 5 characters',
  PasswordLength: `Password must be less than ${passwordMaxLength} characters`,
  PasswordRegex:
    'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  Back: 'Back',
  Error: 'Error',
  Pleasetryagainlater: 'An error has occurred. Please try again later.',
  Country: 'Country',
  ChooseLanguage: 'Choose your language',
  GetStarted: 'Get started',
  SelectCountry: 'Select a Country',
  ChangeLanguageNote: "You can change language later in 'My Account'",

  CountryCodeLabel: 'Country Code',
  MobileNumberLabel: 'Mobile number',
  MobileNumberPlaceholder: 'Enter mobile number',
  Close: 'Close',

  LoginHeader: 'Log in or create a new account',
  GetOtp: 'Get OTP',
  SignInWithGoogle: 'Sign in with Google',
  Skip: 'Skip',
  MissingNumberTitle: 'Missing Number',
  MissingNumberMessage: 'Please enter your number.',

  Slide1Title: '18 Years of happy journeys!',
  Slide1Points1: '4 Crore+ travellers',
  Slide1Points2: '4400+ bus operators',
  Slide1Points3: '3.6 Lakh+ bus routes',

  Slide2Title: 'Book Anytime, Anywhere!',
  Slide2Points1: '24x7 Booking support',
  Slide2Points2: 'Instant ticket confirmation',
  Slide2Points3: 'Available across India',

  Slide3Title: 'Trusted by Millions!',
  Slide3Points1: 'Secure payments',
  Slide3Points2: 'Real-time tracking',
  Slide3Points3: 'Easy cancellation',

  OtpLength: otpLength,
  OtpTimerSeconds: otpTimerSeconds,
  EnterOtpTitle: 'Enter the OTP we sent you',
  Edit: 'Edit',
  EnterOtpLabel: 'Enter OTP (One Time Password)',
  VerifyOtp: 'Verify OTP',
  DidNotGetOtp: "Didn't get the OTP?",
  TryAgainIn: 'Try again in',
  ResendOtp: 'Resend OTP',
  OtpSentSuccessfully: 'OTP sent successfully!',
  Success: 'Success',

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
