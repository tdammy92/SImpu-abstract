import React from 'react';
import {Text, Toggle, Button, Avatar} from '@ui-kitten/components';
import {View, Image, Pressable, Linking, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
// import {useSelector, useDispatch} from 'react-redux';
import {Avatar as avatar} from '../../constants/general';
import {StoreState} from 'src/@types/store';
// import {logOutUser} from '../../store/user/userReducer';
import {hp, wp} from 'src/utils';
interface Props
  extends NativeStackScreenProps<MainStackParamList, SCREEN_NAME.settings> {}

const Setting = (props: Props): JSX.Element => {
  const {navigation} = props;
  // const dispatch = useDispatch();
  // const user = useSelector((state: StoreState) => state.user.profile);

  const [checked, setChecked] = React.useState(false);
  const [notifyCheck, setNotifyCheck] = React.useState(false);

  const navigateProfile = React.useCallback(() => {
    navigation.navigate(SCREEN_NAME.editprofile);
  }, [navigation]);
  const navigatePrivacy = React.useCallback(() => {
    navigation.navigate(SCREEN_NAME.privacy);
  }, [navigation]);
  const navigateDataStorage = React.useCallback(() => {
    navigation.navigate(SCREEN_NAME.datastorage);
  }, [navigation]);
  const navigateManageChannels = React.useCallback(() => {
    // navigation.navigate(SCREEN_NAME.managesocials);
  }, [navigation]);
  const navigateQuickReplies = React.useCallback(() => {
    navigation.navigate(SCREEN_NAME.quickreplies);
  }, [navigation]);

  //handle logout function
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout?',
      'Are you sure you want to logout ?',
      [
        {
          text: 'cancle',
          onPress: () => console.log('cancled logot '),
        },
        {
          text: 'yes',
          onPress: () => {
            // dispatch(logOutUser()),
            navigation.reset({index: 0, routes: [{name: SCREEN_NAME.login}]});
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log('cancled'),
      },
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* oncomment this when ready to make api calls */}

      {/* <Pressable
        onPress={navigateProfile}
        style={[styles.nameContainer, globalStyles.colBetween]}>
        <Image
          style={{height: 100, width: 100, borderRadius: 25}}
          source={{uri: user?.image || Avatar}}
        />
        {(user?.first_name || user?.last_name) && (
          <Text style={styles.headerText}>{`${
            user?.first_name || 'firstname'
          } ${user?.last_name || 'lastname'}`}</Text>
        )}

        {user?.country_code ? (
          <Text style={styles.lowerText}>{`${user?.country_code || ''} ${
            user?.phone || ''
          }`}</Text>
        ) : null}
        <Text style={styles.lowerText}>{`${user?.email || ''}`}</Text>
        {(!user?.first_name || !user?.last_name) && (
          <Text style={styles.editText}>Update Profile</Text>
        )}
      </Pressable> */}
      <Pressable
        onPress={navigateProfile}
        style={[styles.nameContainer, globalStyles.colBetween]}>
        {/* <Image
          style={{height: 100, width: 100, borderRadius: 25}}
          source={{uri: user?.image || Avatar}}
        /> */}

        <Avatar
          size="giant"
          style={{width: wp(80), height: hp(82)}}
          source={{uri: avatar}}
        />

        <Text style={styles.headerText}>Collins Tompson</Text>

        <Text style={styles.lowerText}>+2348121716398</Text>

        <Text style={styles.lowerText}>dev@Simpu.co</Text>

        <Text style={styles.editText}>Update Profile</Text>
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
        <Labellist
          onPress={navigateQuickReplies}
          icon2={<ArrowRight />}
          icon1={<QuoteLeft />}
          text="Quick Replies"
        />
        <Labellist
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
        />
      </View>
      <View style={styles.cardList}>
        <Labellist
          onPress={navigatePrivacy}
          icon2={<ArrowRight />}
          icon1={<PrivacyIcon />}
          text="Privacy and Security"
        />
        <Labellist
          onPress={navigateDataStorage}
          border
          icon2={<ArrowRight />}
          icon1={<DataStorage />}
          text="Data and Storage"
        />
        <Labellist
          border
          icon2={<ArrowRight />}
          icon1={<AboutIcon />}
          text="About Simpu"
          onPress={() => Linking.openURL('https://simpu.co')}
        />
      </View>
      <Labellist
        icon2={<ArrowRight />}
        icon1={<LogOut />}
        text="Logout"
        onPress={handleLogout}
      />
    </ScrollView>
  );
};
export default Setting;