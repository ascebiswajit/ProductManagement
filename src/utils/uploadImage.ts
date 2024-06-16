import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';

export const uploadImage = async (selectedImage: string): Promise<string> => {
  try {
    if (!selectedImage || selectedImage.length === 0) {
      return '';
    }

    const uploadUri: string = selectedImage;
    let filename: string = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension: string = filename.split('.').pop() || '';
    const name: string = filename.split('.').slice(0, -1).join('.');
    filename = `${name}${Date.now()}.${extension}`;

    const storageRef: FirebaseStorageTypes.Reference = storage().ref(`photos/${filename}`);
    const task: FirebaseStorageTypes.UploadTask = storageRef.putFile(uploadUri);

    task.on('state_changed', (taskSnapshot: FirebaseStorageTypes.TaskSnapshot) => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    const uploadResult: FirebaseStorageTypes.TaskSnapshot = await task;
    console.log('Image uploaded to the bucket!', uploadResult);

    const url: string = await storage().ref(`photos/${filename}`).getDownloadURL() || '';

    return url;
  } catch (err) {
    console.log('Error while uploading to Firebase', err);
    return '';
  }
};
