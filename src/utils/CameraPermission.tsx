// async function requestCameraPermission() {
//   try {
//     // Define permissions based on platform
//     const permissions = [
//       PERMISSIONS.ANDROID.CAMERA,
//       Platform.Version >= 30
//         ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
//         : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//     ].filter(Boolean);

//     // Request permissions
//     const granted = await PermissionsAndroid.requestMultiple(permissions);

//     // Check if all permissions are granted
//     const allPermissionsGranted = Object.values(granted).every(
//       permission => permission === PermissionsAndroid.RESULTS.GRANTED,
//     );

//     if (allPermissionsGranted) {
//       console.log('Camera and gallery permissions granted');
//       return true;
//     } else {
//       console.log('Camera and/or gallery permissions denied');
//       return false;
//     }
//   } catch (err) {
//     console.error('Error requesting permissions:', err);
//     return false;
//   }
// }
