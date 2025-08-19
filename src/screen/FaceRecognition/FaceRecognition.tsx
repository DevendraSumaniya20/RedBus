// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   Alert,
//   Platform,
//   Modal,
//   Image,
// } from 'react-native';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// import ImagePicker from 'react-native-image-crop-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   check,
//   request,
//   PERMISSIONS,
//   RESULTS,
//   openSettings,
// } from 'react-native-permissions';

// const rnBiometrics = new ReactNativeBiometrics();
// const FACE_IMAGE_KEY = 'USER_FACE_IMAGE';

// const FaceRecognition: React.FC = () => {
//   const [biometryType, setBiometryType] = useState<string | null>(null);
//   const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
//   const [permissionModalVisible, setPermissionModalVisible] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [faceDataExists, setFaceDataExists] = useState(false);

//   // ----- CAMERA PERMISSION -----
//   const checkCameraPermission = useCallback(async (): Promise<boolean> => {
//     try {
//       const permission =
//         Platform.OS === 'android'
//           ? PERMISSIONS.ANDROID.CAMERA
//           : PERMISSIONS.IOS.CAMERA;
//       const status = await check(permission);
//       if (status === RESULTS.GRANTED) {
//         setCameraPermissionGranted(true);
//         return true;
//       } else if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
//         const reqStatus = await request(permission);
//         if (reqStatus === RESULTS.GRANTED) {
//           setCameraPermissionGranted(true);
//           return true;
//         } else {
//           setPermissionModalVisible(true);
//           return false;
//         }
//       } else {
//         setPermissionModalVisible(true);
//         return false;
//       }
//     } catch (err) {
//       console.error('[Camera Permission] Error:', err);
//       return false;
//     }
//   }, []);

//   // ----- OPEN FRONT CAMERA -----
//   const openFrontCamera = useCallback(async () => {
//     const granted = await checkCameraPermission();
//     if (!granted) return;

//     try {
//       const image = await ImagePicker.openCamera({
//         cropping: false,
//         mediaType: 'photo',
//         useFrontCamera: true,
//       });
//       setCapturedImage(image.path);
//       console.log('[ImagePicker] Captured Image:', image.path);

//       // Save captured face image path
//       await AsyncStorage.setItem(FACE_IMAGE_KEY, image.path);
//       setFaceDataExists(true);
//       Alert.alert('Success', 'Face image saved!');
//     } catch (err: any) {
//       if (err.code !== 'E_PICKER_CANCELLED') {
//         console.error('[ImagePicker] Error:', err);
//         Alert.alert('Camera Error', err.message || 'Failed to open camera');
//       }
//     }
//   }, [checkCameraPermission]);

//   // ----- BIOMETRICS -----
//   const checkBiometrics = useCallback(async () => {
//     try {
//       const { available, biometryType } =
//         await rnBiometrics.isSensorAvailable();
//       setBiometryType(available && biometryType ? biometryType : null);
//       console.log(
//         '[Biometrics] Available:',
//         available,
//         ', Type:',
//         biometryType,
//       );
//     } catch (err) {
//       console.error('[Biometrics] Error:', err);
//     }
//   }, []);

//   const handleBiometricAuth = useCallback(async () => {
//     if (!biometryType) return Alert.alert('No biometrics available');
//     try {
//       const { success } = await rnBiometrics.simplePrompt({
//         promptMessage:
//           biometryType === BiometryTypes.FaceID
//             ? 'Authenticate with Face ID'
//             : biometryType === BiometryTypes.TouchID
//             ? 'Authenticate with Touch ID'
//             : Platform.OS === 'android'
//             ? 'Authenticate with Face or Fingerprint'
//             : 'Authenticate with Biometrics',
//       });
//       Alert.alert(success ? 'Authenticated!' : 'Authentication failed');
//     } catch (err) {
//       console.error('[Biometrics Auth] Error:', err);
//       Alert.alert('Authentication Error', err.message || String(err));
//     }
//   }, [biometryType]);

//   // ----- INITIALIZATION -----
//   useEffect(() => {
//     const initialize = async () => {
//       checkBiometrics();
//       await checkCameraPermission();

//       const storedFace = await AsyncStorage.getItem(FACE_IMAGE_KEY);
//       if (storedFace) {
//         setFaceDataExists(true);
//         setCapturedImage(storedFace);
//         // Automatically open camera for face recognition if image exists
//         openFrontCamera();
//       }
//     };
//     initialize();
//   }, [checkBiometrics, checkCameraPermission, openFrontCamera]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Face & Biometric Detection</Text>
//       <Text>Biometric Type: {biometryType || 'None'}</Text>

//       {!faceDataExists && (
//         <Button title="Capture Face Image" onPress={openFrontCamera} />
//       )}
//       <Button title="Biometric Auth" onPress={handleBiometricAuth} />

//       {capturedImage && (
//         <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
//       )}

//       <Modal visible={permissionModalVisible} transparent animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={{ marginBottom: 20 }}>
//               Camera permission is required. Please enable it in settings.
//             </Text>
//             <Button title="Open Settings" onPress={() => openSettings()} />
//             <Button
//               title="Cancel"
//               onPress={() => setPermissionModalVisible(false)}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default FaceRecognition;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
//   capturedImage: { width: 200, height: 200, marginTop: 20, borderRadius: 12 },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert, Platform } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const FaceRecognition: React.FC = () => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // ----- CAMERA PERMISSION -----
  const checkCameraPermission = async (): Promise<boolean> => {
    try {
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });

      if (!permission) return false;

      const status = await check(permission);
      if (status === RESULTS.GRANTED) return true;
      if (status === RESULTS.DENIED || status === RESULTS.LIMITED) {
        const result = await request(permission);
        return result === RESULTS.GRANTED;
      }
      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Required',
          'Camera permission is blocked. Please enable it in settings.',
          [
            { text: 'Open Settings', onPress: () => openSettings() },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
        return false;
      }
      return false;
    } catch (err) {
      console.error('Permission error:', err);
      return false;
    }
  };

  // ----- OPEN FRONT CAMERA -----
  const openFrontCamera = async () => {
    const granted = await checkCameraPermission();
    if (!granted) return;

    try {
      const image: ImageOrVideo = await ImagePicker.openCamera({
        cropping: false,
        mediaType: 'photo',
        useFrontCamera: true,
      });
      setCapturedPhoto(image.path);
      setShowPreview(true);
      // Optionally save photo URI for future use
      await AsyncStorage.setItem('facePhoto', image.path);
    } catch (err: any) {
      if (err.code !== 'E_PICKER_CANCELLED') {
        console.error('Camera error:', err);
        Alert.alert('Camera Error', err.message || 'Failed to open camera');
      }
    }
  };

  // ----- RETAKE AND CONFIRM -----
  const retakePhoto = () => {
    setCapturedPhoto(null);
    setShowPreview(false);
  };

  const confirmPhoto = () => {
    Alert.alert(
      'Photo confirmed',
      'You can now use this photo for face authentication',
    );
    setShowPreview(false);
  };

  // ----- LOAD PREVIOUS PHOTO -----
  useEffect(() => {
    const loadPhoto = async () => {
      const savedPhoto = await AsyncStorage.getItem('facePhoto');
      if (savedPhoto) setCapturedPhoto(savedPhoto);
    };
    loadPhoto();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      {!showPreview ? (
        <>
          {capturedPhoto && (
            <Image
              source={{ uri: capturedPhoto }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 12,
                marginBottom: 20,
              }}
            />
          )}
          <Button
            title={capturedPhoto ? 'Retake Photo' : 'Add Face Photo'}
            onPress={openFrontCamera}
          />
        </>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: capturedPhoto! }}
            style={{
              width: 300,
              height: 300,
              borderRadius: 12,
              marginBottom: 20,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
            }}
          >
            <Button title="Retake" onPress={retakePhoto} />
            <Button title="Confirm" onPress={confirmPhoto} />
          </View>
        </View>
      )}
    </View>
  );
};

export default FaceRecognition;
