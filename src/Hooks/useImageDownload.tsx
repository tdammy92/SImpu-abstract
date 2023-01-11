import {Text, View, Platform, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import {messsageToast} from 'src/utils';

const useImageDownload = (url: string) => {
  //   const [Directory, setDirectory] = useState();
  //   const [folderExist, setfolderExist] = useState(null);

  const REMOTE_IMAGE_PATH = url;

  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        checkMultiple([
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]).then(statuses => {
          if (
            statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
              RESULTS.DENIED ||
            statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
              RESULTS.DENIED
          ) {
            console.log('all was denied');
            requestMultiple([
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ]).then(statuses => {
              console.log(
                'Write External Storage',
                statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
              );
              console.log(
                'Read External Storage',
                statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
              );
            });
          } else {
            downloadImage();
          }
        });
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = REMOTE_IMAGE_PATH;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    //@ts-ignore
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;

    //creating a new directory for Simpu saved files
    //     const folderPath = fs.dirs.PictureDir;
    //     const makeFolder = fs.dirs.PictureDir + '/Simpu';

    //list all folders in Pitcure directory
    //     fs.ls(folderPath)
    //       .then((list: any) => setDirectory(list))
    //       .catch(err => console.log(err));

    //       if (Directory?.includes('Simpu')) {

    //       }

    //     fs.mkdir(makePath)
    //       .then(folder => console.log(JSON.stringify(folder, null, 2)))
    //       .catch(err => console.log(err));

    //     console.log(`file path ${Platform.OS}`, JSON.stringify(makePath, null, 2));

    let PictureDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      path: PictureDir,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/Simpu_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res: any) => {
        // Showing alert after successful downloading
        console.log('Image -> ', JSON.stringify(res));
        //     alert('Image Downloaded Successfully.');
        messsageToast({message: 'Saved successfully', type: 'success'});
      })
      .catch(err => console.log('err from image download', err));
  };

  const getExtention = (filename: any) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  return checkPermission;
};

export default useImageDownload;
