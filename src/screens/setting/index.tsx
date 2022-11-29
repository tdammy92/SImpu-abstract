import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Text, Toggle, Button, Avatar} from '@ui-kitten/components';
import {View, Image, Pressable, Linking, Alert} from 'react-native';

import {getApplicationName, getReadableVersion} from 'react-native-device-info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Labellist from 'src/components/common/Label';
import {globalStyles} from 'src/styles';
import styles from './styles';
import NightIcon from '../../assets/images/Night.svg';
import NotifyIcon from '../../assets/images/Alarm.svg';
import QuoteLeft from '../../assets/images/Quote_Left.svg';
import ArrowRight from '../../assets/images/Arrow_Right.svg';
import StaffIcon from '../../assets/images/Staff.svg';
import AccountIcon from '../../assets/images/Card_Security.svg';
import PrivacyIcon from '../../assets/images/Password.svg';
import DataStorage from '../../assets/images/Storage.svg';
import AboutIcon from '../../assets/images/Love_Circled.svg';
import LogOut from '../../assets/images/Export.svg';
import {MainStackParamList, SCREEN_NAME} from 'src/navigation/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar as avatar} from '../../constants/general';
import {StoreState} from 'src/@types/store';
import {logOutUser} from '../../store/user/userReducer';
import {hp, wp} from 'src/utils';
import {colors} from 'src/constants';
import LogoutSheet from './component/LogoutSheet';
import {pusher, queryClient} from 'src/index';
interface Props
  extends NativeStackScreenProps<MainStackParamList, SCREEN_NAME.settings> {}

const Setting = (props: Props): JSX.Element => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {profile} = useSelector((state: StoreState) => state.user);

  const [checked, setChecked] = useState(false);
  const [notifyCheck, setNotifyCheck] = useState(false);

  const logoutSheet = useRef<any>(null);

  const openSheet = () => {
    if (logoutSheet.current) {
      logoutSheet.current.open();
    }
  };

  const closeSheet = () => {
    //@ts-ignore

    if (logoutSheet.current) {
      logoutSheet.current.close();
    }
  };

  const navigateProfile = useCallback(() => {
    navigation.navigate(SCREEN_NAME.editprofile);
  }, [navigation]);

  const navigatePrivacy = useCallback(() => {
    navigation.navigate(SCREEN_NAME.privacy);
  }, [navigation]);
  // const navigateDataStorage = React.useCallback(() => {
  //   navigation.navigate(SCREEN_NAME.datastorage);
  // }, [navigation]);
  // const navigateManageChannels = React.useCallback(() => {
  //   // navigation.navigate(SCREEN_NAME.managesocials);
  // }, [navigation]);

  const navigateQuickReplies = useCallback(() => {
    navigation.navigate(SCREEN_NAME.quickreplies);
  }, [navigation]);

  //handle logout function
  const handleLogout = async () => {
    closeSheet();
    dispatch(logOutUser());
    queryClient.clear();
    await pusher.disconnect();
    setTimeout(
      () => navigation.reset({index: 0, routes: [{name: SCREEN_NAME.auth}]}),
      300,
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={navigateProfile}
          style={[styles.nameContainer, globalStyles.colBetween]}>
          <View style={{position: 'absolute', right: 10, top: 10}}>
            <MaterialCommunityIcons
              name="circle-edit-outline"
              color="#0A0748"
              size={25}
            />
          </View>

          <UserAvatar
            name={`${profile?.first_name} ${profile?.last_name}`}
            size={hp(100)}
            style={{height: hp(100), width: hp(100)}}
            borderRadius={hp(100 * 0.5)}
            src={profile?.image}
          />

          {(profile?.first_name || profile?.last_name) && (
            <Text
              style={
                styles.headerText
              }>{`${profile?.first_name} ${profile?.last_name}`}</Text>
          )}

          {(profile?.country_code || profile?.phone) && (
            <Text
              style={
                styles.lowerText
              }>{`+${profile?.country_code}${profile?.phone}`}</Text>
          )}

          {profile?.email && (
            <Text style={styles.lowerText}>{`${profile?.email}`}</Text>
          )}
        </Pressable>

        <View style={styles.cardList}>
          <Labellist
            icon2={
              <Toggle checked={checked} onChange={() => setChecked(!checked)} />
            }
            icon1={<NightIcon />}
            text="Dark mode"
          />
          <Labellist
            border
            icon2={
              <Toggle
                checked={notifyCheck}
                onChange={() => setNotifyCheck(!notifyCheck)}
              />
            }
            icon1={<NotifyIcon />}
            text="Notifications"
          />
        </View>
        <View style={styles.cardList}>
          {/* <Labellist
          onPress={navigateQuickReplies}
          icon2={<ArrowRight />}
          icon1={<QuoteLeft />}
          text="Quick Replies"
        /> */}
          {/* <Labellist
          onPress={navigateManageChannels}
          border
          icon2={<ArrowRight />}
          icon1={<StaffIcon />}
          text="Manage Social Channels"
        />
        <Labellist
          border
          icon2={<ArrowRight />}
          icon1={<AccountIcon />}
          text="Manage Bank Account"
        /> */}
        </View>
        <View style={styles.cardList}>
          {/* <Labellist
          onPress={navigatePrivacy}
          icon2={<ArrowRight />}
          icon1={<PrivacyIcon />}
          text="Privacy and Security"
        /> */}
          {/* <Labellist
          onPress={navigateDataStorage}
          border
          icon2={<ArrowRight />}
          icon1={<DataStorage />}
          text="Data and Storage"
        /> */}

          <Labellist
            onPress={navigateQuickReplies}
            icon2={<ArrowRight />}
            icon1={<QuoteLeft />}
            text="Quick Replies"
          />
          <Labellist
            border
            icon2={<ArrowRight />}
            icon1={<AboutIcon />}
            text="About Simpu"
            onPress={() => Linking.openURL('https://simpu.co')}
            // onPress={() => navigation.navigate(SCREEN_NAME.about)}
          />
        </View>
        <View style={styles.cardList}>
          <Labellist
            icon2={<ArrowRight />}
            icon1={<LogOut />}
            text="Logout"
            onPress={openSheet}
          />
        </View>

        <View style={styles.infotextWrapper}>
          <Text style={styles.infoText1}>
            <Text style={styles.infoText1}>{getApplicationName()} </Text>
            <Text style={styles.infoText1}>version {getReadableVersion()}</Text>
          </Text>
          <Text style={styles.infoText2}>Built to empower teams</Text>
        </View>
      </View>
      <LogoutSheet
        ref={logoutSheet}
        // closeSheet={closeSheet}
        handlePress={handleLogout}
      />
    </>
  );
};
export default Setting;
