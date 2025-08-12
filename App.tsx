import React, { useEffect } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import Navigation from './src/navigation/navigation';

// Redux + Redux Persist
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor, RootState } from './src/redux/store';

// Gesture + Bottom Sheet
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import i18n from './src/translate';
import { ToastProvider } from './src/utils/ToastProvider';

const LanguageInitializer = () => {
  const language = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    if (language) {
      i18n
        .changeLanguage(language)
        .catch(err => console.warn('Failed to change language:', err));
    }
  }, [language]);

  return null;
};

LogBox.ignoreAllLogs(true); // Ignore all log notifications
const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastProvider>
              <LanguageInitializer />
              <Navigation />
            </ToastProvider>
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
