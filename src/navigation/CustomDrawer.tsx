import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Layout, MenuItem, OverflowMenu} from '@ui-kitten/components';

//@ts-ignore
import {Bullets} from 'react-native-easy-content-loader';

import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {hp, wp} from 'src/utils';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text, Divider} from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

import {colors, FONTS} from 'src/constants';
import {SCREEN_NAME} from './constants';
import {StoreState} from 'src/@types/store';
import Availble from 'src/assets/images/Available.svg';
import NotAvailble from 'src/assets/images/notificationLabel.svg';

import {
  useSidebarTags,
  useSidebarInboxes,
  useGetOrganisations,
} from 'src/services/queries';

import Accordion from './component/Accordion';
import OrganisationSheet from './component/OrganisationSheet';

const CustomDrawer = (props: any): JSX.Element => {
  const OrganisationSheetRef = useRef<any>(null);

  const {count, ...rest} = props;
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const netInfo = useNetInfo();
  const [isAvailable, setisAvailable] = useState<boolean | null>(true);

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

  // console.log(navigation.getState());
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

  //load organisations
  const {data: organisationData, isLoading: loadingOrganisations} =
    useGetOrganisations({Auth: token}, {});

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      setisAvailable(state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* user profile  */}
      <View style={styles.headerContainer}>
        <View style={styles.userDetails}>
          <View>
            <UserAvatar
              size={hp(40)}
              style={{height: hp(40), width: hp(40)}}
              borderRadius={hp(40 * 0.5)}
              name={`${profile?.first_name} ${profile?.last_name}`}
              src={profile.image}
            />
            <View style={{position: 'absolute', bottom: 2, right: 1}}>
              {isAvailable ? <Availble /> : <NotAvailble />}
            </View>
          </View>
          <View style={{paddingLeft: 5}}>
            <Text style={styles.userName}>
              {profile?.first_name} {profile?.last_name}
            </Text>
            <Text
              style={[
                styles.statusText,
                {color: isAvailable ? '#287D3C' : '#EB5757'},
              ]}>
              {isAvailable ? 'Available' : 'offline'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(SCREEN_NAME.config)}>
          <AntDesign name="setting" size={20} color="#7D8282" />
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
        <DrawerItemList {...rest} />

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
            <Octicons name="organization" size={14} color={colors.dark} />
            <Text style={styles.selectOrgBtnText}>Organisation:</Text>

            <View style={styles.orgPill}>
              <Text style={styles.orgPillText}>{organisation?.name}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.orgPill}>
            <Text
              style={{
                fontFamily: FONTS.TEXT_SEMI_BOLD,
                fontSize: hp(12),
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
  },
  bottomView: {
    paddingVertical: hp(15),
  },
  statusText: {
    fontSize: 12,
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

  customInboxTitleText: {
    fontSize: hp(13),
    color: '#7D8282',
    fontFamily: FONTS.TEXT_BOLD,
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
    paddingHorizontal: 10,
    width: '100%',
    height: hp(50),
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',

    backgroundColor: colors.light,
    borderTopColor: '#e4e4e4',
    borderTopWidth: 1,
  },

  selectOrgBtnContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectOrgBtnText: {
    marginLeft: 5,
    fontSize: hp(14),
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
    fontSize: hp(12),
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
