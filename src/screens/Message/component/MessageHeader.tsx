import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';
import {
  StyledComponentProps,
  Text,
  Input,
  Icon,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hp, wp} from 'src/utils';
import {colors, FONTS} from 'src/constants';
// import {ScrollView} from 'react-native-gesture-handler';

const AlertIcon = (props: any) => <Icon {...props} name="search-outline" />;

const MessageHeader = (props: any) => {
  const navigation = useNavigation();

  const {openSortSheet, isSocial, isTeamInbox, closeSortSheet} = props;
  const openDraw = () => navigation.dispatch(DrawerActions.openDrawer());

  const [selectedIndex, setselectedIndex] = useState(0);
  const [teamOptions, setteamOptions] = useState([
    'Unassigned',
    'Assigned',
    'Closed',
  ]);

  const [socialOptions, setsocialOptions] = useState([
    'All',
    'Favorite',
    'Snoozed',
  ]);

  const handleSelectedIndex = (index: number) => {
    setselectedIndex(index);
  };

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={openDraw}>
          <AntDesign name="menu-fold" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openDraw}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>0</Text>
          </View>
          <Ionicons
            name="notifications-outline"
            size={30}
            color="#000"
            style={{transform: [{rotate: '35deg'}]}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.headerDetails}>
        <View style={styles.inputWrapper}>
          <Input placeholder="Search" accessoryLeft={AlertIcon} />
        </View>

        <View style={styles.sliderView}>
          <Text style={styles.headerTitleText}>
            {props?.name !== 'Social' ? props?.name : ''}
          </Text>
          {isTeamInbox && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {teamOptions.map((option, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: hp(15),
                    }}
                    onPress={() => handleSelectedIndex(index)}>
                    <View
                      style={{
                        borderBottomColor:
                          selectedIndex === index ? '#026AE8' : '',
                        borderBottomWidth: selectedIndex === index ? 3 : 0,
                      }}>
                      <Text style={[styles.sliderText, {}]}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          {isSocial && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {socialOptions.map((option, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: hp(15),
                    }}
                    onPress={() => handleSelectedIndex(index)}>
                    <View
                      style={{
                        borderBottomColor:
                          selectedIndex === index ? '#026AE8' : '',
                        borderBottomWidth: selectedIndex === index ? 3 : 0,
                      }}>
                      <Text style={[styles.sliderText, {}]}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          {/* <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#c4c4c4', 'rgba(255,255,255,0.1)']}
            style={{
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}> */}
          <TouchableOpacity
            style={{marginTop: 0, backgroundColor: ''}}
            onPress={openSortSheet}>
            <Octicons name="sort-asc" size={23} color="#000" />
          </TouchableOpacity>
          {/* </LinearGradient> */}
        </View>
      </View>
    </View>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({
  headerContainer: {
    //@ts-ignore
    marginTop: hp(StatusBar.currentHeight + 30),
    marginHorizontal: wp(12),
  },

  headerDetails: {
    marginVertical: hp(10),
  },

  badgeContainer: {
    position: 'absolute',
    backgroundColor: '#D22B2B',
    right: wp(10),
    top: hp(-8),
    elevation: 3,
    zIndex: 3,
    borderRadius: 50,
    height: hp(20),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#fff',
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    fontSize: hp(12),
    textAlign: 'center',
  },

  headerTitleText: {
    fontSize: hp(18),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    color: colors.primaryText,
  },
  inputWrapper: {
    marginVertical: hp(10),
  },
  sliderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //     alignItems: 'flex-start',
  },
  sliderText: {
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(16),
    paddingBottom: 5,
    color: colors.primaryText,
  },
});
