import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {requestNotificationType} from 'src/@types/inbox';
import {
  getUniqueId,
  getManufacturer,
  getBaseOs,
  getBrand,
  getDeviceName,
  getSystemVersion,
  getDeviceId,
  getApiLevel,
} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDeviceDetails = () => {
  const deviceRef = useRef({
    imei: '',
    fcm_token: '',
    name: '',
    brand: '',
    model: '',
    os: '',
    os_version: '',
    os_api_level: '',
  });

  //get user's device detials
  //   const [DeviceDetails, setDeviceDetails] = useState<requestNotificationType>({
  //     imei: '',
  //     fcm_token: '',
  //     name: '',
  //     brand: '',
  //     model: '',
  //     os: '',
  //     os_version: '',
  //     os_api_level: '',
  //   });

  //getuser details
  const getUserDeviceInfo = async () => {
    //get Fcmtoken
    const fcmToken = await AsyncStorage?.getItem('fcmToken');

    //@ts-ignore
    deviceRef.current.fcm_token = fcmToken;

    //get imei
    getUniqueId().then(uniqueId => {
      //  setDeviceDetails({...DeviceDetails, imei: uniqueId});
      deviceRef.current.imei = uniqueId;
    });

    //get device name
    getDeviceName().then(deviceName => {
      deviceRef.current.name = deviceName;
    });

    //get device Os
    getBaseOs().then(OS => {
      deviceRef.current.os = OS;
    });

    //get brand
    //@ts-ignore
    deviceRef.current.brand = getBrand();

    //get IOS version
    //@ts-ignore
    deviceRef.current.os_version = getSystemVersion();

    //get device model
    //@ts-ignore
    deviceRef.current.model = getDeviceId();

    //get apilevel
    getApiLevel().then(apiLevel => {
      //@ts-ignore
      deviceRef.current.os_api_level = apiLevel;
    });
  };

  useEffect(() => {
    getUserDeviceInfo();
  }, []);

  return deviceRef.current;
};

export default useDeviceDetails;
