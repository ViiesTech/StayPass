import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
/**
 * pickImage(callback, multiple = false)
 * - callback: receives selected image(s)
 * - multiple: if true, allows selecting multiple images
 */
export const pickImage = (callback: () => void, multiple = false) => {
  Alert.alert(
    multiple ? 'Upload Images' : 'Upload Image',
    'Choose an option',
    [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera(
            {
              mediaType: 'photo',
              quality: 0.7,
              selectionLimit: multiple ? 0 : 1, // 0 = multiple, 1 = single
            },
            response => {
              if (
                !response.didCancel &&
                !response.errorCode &&
                response.assets?.length
              ) {
                callback(multiple ? response.assets : response.assets[0]);
              }
            },
          );
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              quality: 0.7,
              selectionLimit: multiple ? 0 : 1,
            },
            response => {
              if (
                !response.didCancel &&
                !response.errorCode &&
                response.assets?.length
              ) {
                callback(multiple ? response.assets : response.assets[0]);
              }
            },
          );
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ],
    { cancelable: true },
  );
};

export const ShowToast = (type: string, text: string) => {
  return Toast.show({
    type: type,
    text1: text,
  });
};
