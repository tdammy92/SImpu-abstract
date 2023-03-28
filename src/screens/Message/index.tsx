import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

import React, {Fragment, useCallback, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {pusher, queryClient} from 'src/index';
import {
  useGetOrganisations,
  useMessageThreads,
  useProfile,
} from 'src/services/query/queries';
import {StoreState} from 'src/@types/store';
import {removeDeviceNotification} from 'src/services/mutations/notification';
import {useMutation} from 'react-query';
import {SCREEN_NAME} from 'src/navigation/constants';
import {showLoader, hideLoader} from 'src/store/Loader';
import {logOutUser, updateProfile} from 'src/store/user/userReducer';
import {format} from 'date-fns';
import {Divider} from '@ui-kitten/components';
import {updateOrganisation} from 'src/store/organisation/organisationReducer';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp, wp} from 'src/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height} = Dimensions?.get('screen');
const SheetHeight = Math.floor(height * 0.3);

const Unassigned = ({navigation}: any) => {
  const dispatch = useDispatch();

  //vales from store
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );
  const organisationId = organisation?.id;
  const {details} = useSelector((state: StoreState) => state.device);
  const [fetchProfile, setfetchProfile] = useState(false);

  const sheetRef = useRef<any>(null);

  //refecth profile
  const profileRefetched = useProfile(
    `profile   ${organisation?.id}`,
    {
      organisationId: organisationId,
      Auth: token,
    },
    {
      enabled: fetchProfile,
      retryOnMount: false,
      refetchOnMount: false,
      keepPreviousData: false,
      onSuccess: (data: any) => {
        //update profile
        dispatch(updateProfile(data?.data?.profile));
      },
    },
  );

  //fecthing organisations data
  const {data: organisationData, isLoading: loadingOrganisations} =
    useGetOrganisations({Auth: token, organisationId: organisationId}, {});
  const organisations = organisationData?.data?.organisations;

  //removes current device from notification
  const removeDeviceMutation = useMutation(removeDeviceNotification, {
    onSuccess(data, variables, context) {
      goBackToLoginScreen();
    },
    onError(error, variables, context) {
      goBackToLoginScreen();
      console.log(error);
    },
  });

  function goBackToLoginScreen() {
    setTimeout(
      () => navigation.reset({index: 0, routes: [{name: SCREEN_NAME.auth}]}),
      300,
    );

    dispatch(hideLoader());
  }

  //fetch unassigned messages
  const {
    data: Unassigned,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useMessageThreads(
    {
      filter: 'open',
      sort: 'newest',
      start_date: undefined,
      end_date: undefined,
      page: 1,
      Auth: token,
      organisationId: organisation?.id,
    },
    {},
  );

  //This snippet flattens the array
  const unassignedData = Unassigned?.pages
    ?.map((res: any) => res?.data?.threads?.map((r: any) => r))
    .flat(2);

  //unsubscribing from channels before logout
  const UnsubscribeCurrentPusherChannel = async () => {
    const orgChannelName = `presence-organisation-${organisationId}`;
    const liveChatChannelName = `presence-livechat-${organisationId}`;
    const userChannelName = `private-profile-${profile?.id}`;

    try {
      await pusher.unsubscribe({channelName: orgChannelName});
      await pusher.unsubscribe({channelName: liveChatChannelName});
      await pusher.unsubscribe({channelName: userChannelName});
    } catch (e) {
      console.log('error from pusher unsub', e);
    }
  };

  //change organisaion
  const changeOrganisations = async (index: any) => {
    await UnsubscribeCurrentPusherChannel();
    dispatch(updateOrganisation(organisations[index]));
    setfetchProfile(true);
    closeSheet();
  };

  //handle logout function
  const handleLogout = async () => {
    dispatch(showLoader());
    dispatch(logOutUser());

    //clear all query keys
    queryClient.clear();

    // unsubscribe pusher channels
    await UnsubscribeCurrentPusherChannel();

    //disconnect pusher notifications
    await pusher.disconnect();

    await removeDeviceMutation.mutateAsync({
      device_id: details.id,
      Auth: token,
    });
  };

  const renderItem = useCallback(
    (data: any) => {
      // console.log(JSON.stringify(data, null, 2));
      return (
        <View style={{marginVertical: 10}}>
          <Text>
            {data?.item?.sender?.platform_nick ??
              data?.item?.sender?.platform_name}
          </Text>
          <Text>{data?.item?.channel_name}</Text>
          <Text>
            {format(new Date(data?.item?.created_datetime), 'd/M/yyyy')}
          </Text>
        </View>
      );
    },
    [unassignedData],
  );

  //open sheet code
  function openSheet() {
    if (sheetRef.current) {
      sheetRef?.current?.open();
    }
  }
  //close sheet
  function closeSheet() {
    if (sheetRef.current) {
      sheetRef?.current?.close();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.top}>
          <Text style={{fontSize: 22}}>Unassigned</Text>

          <TouchableOpacity onPress={handleLogout}>
            <Text style={{fontSize: 17}}>logout</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>
            Name: {profile?.last_name} {profile?.first_name}
          </Text>

          <Text>Organisation: {organisation?.name}</Text>
        </View>

        {/* change organisation(changes channel) */}
        <TouchableOpacity
          onPress={openSheet}
          style={{
            marginVertical: 10,
            borderColor: colors?.bootomHeaderBg,
            backgroundColor: colors?.bootomHeaderBg,
            borderRadius: 10,
            borderWidth: 1,
            padding: 5,
            alignItems: 'center',
          }}>
          <Text>Change Organisation</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: '100%'}}>
        <FlatList
          style={{marginHorizontal: 10}}
          data={unassignedData ?? []}
          keyExtractor={(item, i) => `${i}`}
          renderItem={renderItem}
        />
      </View>

      {/* select organisation bottom sheeet */}
      {/* @ts-ignore */}
      <RBSheet
        ref={sheetRef}
        openDuration={250}
        closeOnDragDown
        height={SheetHeight}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(105,105,105,0.7)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(255,255,255,0)',
            height: 0,
            margin: 0,
          },
          container: {
            borderTopLeftRadius: hp(10),
            borderTopRightRadius: hp(10),
          },
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor: colors.bootomHeaderBg,
          }}>
          <Text style={styles.sheetHeaderText}>Select Organisation</Text>
        </View>
        <Divider />
        <View style={{padding: 0, margin: 0, height: '100%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 15,
              paddingVertical: hp(10),
            }}
            contentInset={{bottom: hp(30)}}>
            {organisations?.map((org: any, i: any) => {
              return (
                <Fragment key={`${i}`}>
                  <TouchableOpacity
                    key={org?.name}
                    style={styles.listContainer}
                    onPress={() => changeOrganisations(i)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.organisationText}>{org?.name}</Text>
                    </View>

                    <View>
                      {organisation?.id === org?.id && (
                        <AntDesign name="checkcircleo" size={20} color="#000" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Divider />
                </Fragment>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Unassigned;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: colors?.light,
  },

  header: {
    height: 180,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },

  sheetHeaderText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.MediumText,
    textTransform: 'uppercase',
    color: colors.dark,
  },
  listContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  organisationText: {
    marginLeft: 5,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    color: colors.dark,
  },
});
