import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderNextBtn from 'src/components/common/HeaderNextBtn';
import HeaderBackArrow from 'src/components/common/HeaderBackArrow';
import {hp, wp} from 'src/utils';
import {FONTS, FontSize, colors} from 'src/constants';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from '@ui-kitten/components';
import {removeEmoji, trimText} from 'src/utils/string-utils/string';
import {useSearchCustomersMessages} from 'src/services/query/queries';
import {StoreState} from 'src/@types/store';
import {useSelector} from 'react-redux';
import ListLoader from 'src/components/common/ListLoader';
import EmptyInbox from 'src/components/common/EmptyInbox';
import ChannelIcon from 'src/components/common/ChannelIcon';
import {SCREEN_NAME} from 'src/navigation/constants';
import ContentLoader from 'react-native-easy-content-loader';
const {height, width} = Dimensions.get('screen');
const STATUSBAR_HEIGHT = StatusBar?.currentHeight;

const CustomerThreads = ({route}: any) => {
  const {customerDetails} = route.params;
  const navigation = useNavigation();
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const [customerThreads, setcustomerThreads] = useState([]);

  // console.log('customer details', JSON.stringify(customerDetails, null, 2));
  const customerThreadsQuery = useSearchCustomersMessages(
    {
      customerId: customerDetails?.uuid,
      page: 1,
      headers: {
        Auth: token,
        organisationId: organisation?.id,
      },
    },

    {
      enabled: !!customerDetails?.uuid,
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const customerThreads = data?.pages
          ?.map((res: any) => res?.threads?.map((r: any) => r))
          .flat(2);
        setcustomerThreads(customerThreads);

        // console.log(
        //   'customer threads',
        //   JSON.stringify(customerThreads, null, 2),
        // );
      },
      onError(error: any, variables: any, context: any) {
        //@ts-ignore
        // messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const threadList = ({item, index}: any) => {
    // console.log('Itemssss', JSON.stringify(index, null, 2));

    const handleNavigation = () => {
      if (item?.channel_name === 'email') {
        //@ts-ignore
        navigation.navigate(SCREEN_NAME.mail as never, {threadId: item?.uuid});
      } else {
        //@ts-ignore
        navigation.navigate(SCREEN_NAME.chat as never, {threadId: item?.uuid});
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.listCard,
          {
            marginBottom:
              index === customerThreads.length - 1 ? hp(150) : hp(5),
          },
        ]}
        onPress={handleNavigation}>
        <View style={{}}>
          <UserAvatar
            name={removeEmoji(
              item?.sender?.platform_name ?? item?.sender?.platform_nick,
            )}
            size={hp(30)}
            style={{height: hp(30), width: hp(30)}}
            borderRadius={hp(30 * 0.5)}
            src={item?.sender?.image_url}
          />
        </View>
        <View>
          <View style={styles.info}>
            <Text style={[styles.messageText, {}]}>
              {item?.channel_name === 'email'
                ? trimText(item?.subject, 25)
                : trimText(item?.last_message?.entity?.content?.body, 25)}
            </Text>
            <Text style={styles.name}>
              {trimText(
                item?.sender?.platform_name ?? item?.sender?.platform_nick,
                20,
              )}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: hp(5),
            right: hp(5),
            backgroundColor: colors.lightGray,
            borderRadius: hp(15),
            padding: hp(5),
          }}>
          {item?.channel_name && <ChannelIcon name={item?.channel_name} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* header container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{marginRight: wp(5), backgroundColor: ''}}
          onPress={handleBack}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color={colors.secondaryBg}
          />
        </TouchableOpacity>
        <UserAvatar
          name={removeEmoji(
            customerDetails?.platform_name ?? customerDetails?.platform_nick,
          )}
          size={hp(45)}
          style={{height: hp(45), width: hp(45)}}
          borderRadius={hp(45 * 0.5)}
          src={customerDetails?.image_url}
        />
        <View style={styles.nameWrapper}>
          <Text style={styles.nameText}>
            {trimText(
              customerDetails?.platform_name ?? customerDetails?.platform_nick,
              20,
            )}
          </Text>
          <Text style={styles.nameText2}>
            {trimText(customerDetails?.platform_nick, 22)}
          </Text>
        </View>
      </View>
      <Divider />

      {/* body container */}
      <View>
        <View>
          <Text style={styles.subHeadingText}>
            {customerThreads?.length > 0
              ? 'All coversation(s)'
              : 'No Coversation'}{' '}
            with{' '}
            {trimText(
              customerDetails?.platform_name ?? customerDetails?.platform_nick,
              20,
            )}
          </Text>
        </View>

        {/* thread list */}
        {!customerThreadsQuery?.isLoading ? (
          <FlatList
            data={customerThreads}
            style={{paddingTop: hp(10)}}
            keyExtractor={(_, i) => `${i}`}
            contentInset={{bottom: hp(50)}}
            contentContainerStyle={{paddingBottom: hp(50)}}
            renderItem={threadList}
            ListEmptyComponent={<EmptyInbox />}
            ItemSeparatorComponent={() => <Divider style={{height: hp(2)}} />}
          />
        ) : (
          <ScrollView style={{flex: 0.8, backgroundColor: 'yellow'}}>
            {Array(3)
              .fill(1)
              .map((_, i) => (
                <React.Fragment key={`${i}`}>
                  {/* @ts-ignore */}
                  <ContentLoader
                    containerStyles={{
                      width: '100%',

                      alignItems: 'center',
                    }}
                    loading={true}
                    avatar
                    aSize={30}
                    title={false}
                    pRows={1}
                    pHeight={[8]}
                    pWidth={[80]}
                  />
                </React.Fragment>
              ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default CustomerThreads;

const styles = StyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    height: hp(height * 0.12),
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: wp(15),
    paddingTop: hp(30),
    borderBottomWidth: 1.3,
    borderBottomColor: colors.bootomHeaderBg,
  },

  nameWrapper: {
    marginLeft: hp(5),
  },

  nameText: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.BigText,
    paddingBottom: hp(2),
  },
  nameText2: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
  },

  subHeadingText: {
    marginTop: hp(10),
    marginLeft: wp(15),
    color: colors.dark,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.MediumText,
  },
  listCard: {
    paddingHorizontal: wp(10),
    // backgroundColor: 'red',
    flexDirection: 'row',
    paddingVertical: hp(10),
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  info: {
    justifyContent: 'center',
    marginLeft: wp(7),
  },

  messageText: {
    fontSize: FontSize.BigText,
    color: colors.dark,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },

  name: {
    fontSize: FontSize.MediumText,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },
});
