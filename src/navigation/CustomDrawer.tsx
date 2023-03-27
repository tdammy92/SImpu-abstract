import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Layout, MenuItem, OverflowMenu} from '@ui-kitten/components';

//@ts-ignore
import {Bullets} from 'react-native-easy-content-loader';

import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {hp, messsageToast, wp} from 'src/utils';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text, Divider} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

import {colors, FONTS, FontSize} from 'src/constants';
import {SCREEN_NAME} from './constants';
import {StoreState} from 'src/@types/store';
import Availble from 'src/assets/images/Available.svg';

import {
  useSidebarTags,
  useSidebarInboxes,
  useGetOrganisations,
} from 'src/services/query/queries';

import Accordion from './component/Accordion';
import OrganisationSheet from './component/OrganisationSheet';
import {addProfile} from 'src/store/user/userReducer';
import {useInboxWebsocket} from 'src/Hooks/usePushersocket';
import {trimText} from 'src/utils/string-utils/string';
import {queryClient} from '..';

const CustomDrawer = (props: any): JSX.Element => {
  const OrganisationSheetRef = useRef<any>(null);
  const navigation = useNavigation();

  const {count, ...rest} = props;
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const netInfo = useNetInfo();
  const [isAvailable, setisAvailable] = useState<boolean | null>(true);
  // useInboxWebsocket();

  //open sheet code
  const openSheet = () => {
    if (OrganisationSheetRef.current) {
      OrganisationSheetRef.current.open();
    }
  };

  //close sheet
  const closeSheet = () => {
    if (OrganisationSheetRef.current) {
      OrganisationSheetRef.current.close();
    }
  };

  //get side tags
  const {
    data: sideTagsData,
    isLoading: sideTagsLoading,
    error: sideTagsError,
  } = useSidebarTags(
    {
      is_pinned: true,
      type: 'shared',
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  //This snippet flattens the array
  const tagsData = sideTagsData?.pages
    ?.map((res: any) => res?.data?.tags?.tags)
    .flat(2);

  //get side inboxes
  const {
    data: sharedInboxData,
    isFetching,
    isLoading: sharedInboxLoading,
    error,
    isError,
  } = useSidebarInboxes(
    {
      is_pinned: true,
      type: 'shared',
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  async function reFetchAllQueries() {
    await queryClient.invalidateQueries();
  }

  //load organisations
  const {data: organisationData, isLoading: loadingOrganisations} =
    useGetOrganisations({Auth: token, organisationId: organisation?.id}, {});

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Connection state', state.isConnected);
      setisAvailable(state.isConnected);

      if (state.isConnected === true) {
        reFetchAllQueries();
      } else if (state.isConnected === false) {
        messsageToast({
          message: 'Your internet connection is down',
          type: 'warning',
        });
      }
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  // const filteredProps = {
  //   ...props,
  //   state: {
  //     ...props.state,
  //     routeNames: props.state.routeNames.filter((routeName: any) => {
  //       return routeName !== SCREEN_NAME.teaminbox;
  //     }),
  //     routes: props.state.routes.filter((route: any) => {
  //       return route.name !== SCREEN_NAME.teaminbox;
  //     }),
  //   },
  // };

  const navigateToProfile = useCallback(() => {
    //@ts-ignore
    navigation.navigate(SCREEN_NAME.config, {screen: SCREEN_NAME.editprofile});
  }, [navigation]);

  const navigateToSettings = useCallback(() => {
    //@ts-ignore
    navigation.navigate(SCREEN_NAME.config);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* user profile  */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigateToProfile}>
          <View style={styles.userDetails}>
            <View>
              <UserAvatar
                size={hp(40)}
                style={{height: hp(40), width: hp(40)}}
                borderRadius={hp(40 * 0.5)}
                name={`${profile?.first_name} ${profile?.last_name}`}
                src={profile?.image}
              />
              <View style={{position: 'absolute', bottom: hp(1), right: hp(1)}}>
                <Availble
                  color={isAvailable ? colors.onlineBgLight : colors.offlineBg}
                  height={hp(12)}
                  width={hp(12)}
                />
              </View>
            </View>
            <View style={{paddingLeft: 5}}>
              <Text style={styles.userName}>
                {profile?.first_name} {profile?.last_name}
              </Text>
              <Text
                style={[
                  styles.statusText,
                  {color: isAvailable ? colors.onlineBg : colors.offlineBg},
                ]}>
                {isAvailable ? 'Available' : 'offline'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToSettings}>
          <AntDesign name="setting" size={hp(24)} color={colors.darkGray} />
        </TouchableOpacity>
      </View>

      <Divider />

      {/* drawe menu content */}
      <DrawerContentScrollView
        {...props}
        style={{
          marginTop: 0,
          paddingTop: 10,
          paddingBottom: hp(15),
        }}
        contentContainerStyle={{
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: hp(60),
        }}
        contentInset={{bottom: hp(15)}}>
        {/* menu list item*/}
        <DrawerItemList {...props} />

        {/* tag and team inbox list */}
        <View style={styles.customInboxContainer}>
          {/* Team inboxes list accordion*/}
          <Accordion
            title="Team inboxes"
            data={sharedInboxData?.inboxes}
            count={count}
            open={true}
            threadType="inbox"
            showLoader={sharedInboxLoading}
          />
          <View style={{height: hp(10)}} />
          {/* Tags list accordion*/}
          <Accordion
            title="Tags"
            threadType="tag"
            data={tagsData}
            count={count}
            open={false}
            showLoader={sideTagsLoading}
          />
        </View>
      </DrawerContentScrollView>

      {/* organisation select list button*/}
      <View style={styles.organisationContainer}>
        {!loadingOrganisations ? (
          <TouchableOpacity
            style={styles.selectOrgBtnContainer}
            onPress={openSheet}>
            <Octicons name="organization" size={hp(20)} color={colors.dark} />

            <View style={styles.orgPill}>
              <Text style={styles.orgPillText}>
                {trimText(organisation?.name, 15)}
              </Text>
            </View>

            <View style={{position: 'absolute', right: 5}}>
              <Octicons name="chevron-up" size={20} color={colors.dark} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.orgPill}>
            <Text
              style={{
                fontFamily: FONTS.TEXT_SEMI_BOLD,
                fontSize: FontSize.MediumText,
                textAlign: 'center',
              }}>
              Fetching organisations...
            </Text>
          </View>
        )}
      </View>
      {/* sheet to switch organisations */}
      <OrganisationSheet
        close={closeSheet}
        data={organisationData}
        ref={OrganisationSheetRef}
      />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(10),
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userDetails: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },

  userName: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.MediumText,
  },
  bottomView: {
    paddingVertical: hp(15),
  },
  statusText: {
    fontSize: FontSize.MediumText,
    fontFamily: FONTS.TEXT_REGULAR,
  },

  customInboxContainer: {
    paddingLeft: 15,
    marginTop: 20,
    width: '100%',
    // backgroundColor: 'red',
  },
  customInboxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  customInboxItems: {
    // marginLeft: wp(5),
    width: '100%',
    paddingVertical: 0,
    marginVertical: 0,
  },
  customInboxItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',

    width: '100%',
    paddingVertical: 0,
    marginVertical: 0,
  },
  customInboxtext: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },

  badgeText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: 12,
    color: colors.dark,
    position: 'absolute',
    right: -20,
  },

  organisationContainer: {
    paddingHorizontal: 5,
    width: '100%',
    height: hp(50),
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: colors.light,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
  },

  selectOrgBtnContainer: {
    position: 'relative',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginLeft: hp(15),
  },
  selectOrgBtnText: {
    marginLeft: 5,
    fontSize: FontSize.MediumText,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },

  orgPill: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  orgPillText: {
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
    fontSize: FontSize.MediumText,
  },
});

// console.log('drawer menu  side inboxes', sideInbox);

// const filteredProps = {
//   ...props,
//   state: {
//     ...props.state,
//     routeNames: props.state.routeNames.filter((routeName: any) => {
//       return routeName !== SCREEN_NAME.teaminbox;
//     }),
//     routes: props.state.routes.filter((route: any) => {
//       return route.name !== SCREEN_NAME.teaminbox;
//     }),
//   },
// };

// console.log(JSON.stringify(filteredProps));
