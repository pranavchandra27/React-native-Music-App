import {PermissionsAndroid, Alert} from 'react-native';

export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ],
      {
        title: 'Storage Access',
        message: 'Permission required to access local storage',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission Granted');
    } else {
      requestPermission();
    }
  } catch (err) {
    console.warn(err);
  }
};
