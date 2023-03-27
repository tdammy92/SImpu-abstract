import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import prettyBytes from 'pretty-bytes';
import {StoreState} from 'src/@types/store';
import {hp, messsageToast, splitLastOccurrence, wp} from 'src/utils';
import {FontSize, FONTS, Avatar, colors} from 'src/constants';
import {imageType, audioType, videoType, docType} from 'src/constants';
import stc from 'string-to-color';
import Modal from 'react-native-modal';
//@ts-ignore
import * as mime from 'react-native-mime-types';
import {removeEmoji, trimText} from 'src/utils/string-utils/string';
import AttachmentIcon from 'src/components/common/AttachmentIcon';
import {FormatText} from 'src/utils/string-utils/string';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import useDebounce from 'src/Hooks/useDebounce';
import {useSearchCustomers} from 'src/services/query/queries';
import {useMutation, useQueryClient} from 'react-query';
import {forwardMessageSocials} from 'src/services/mutations/inbox';
import CustomerLoader from 'src/components/Loaders/customerLoader';
import Entypo from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('screen');

const ForwardModal = ({closeFowardModal, showForwardModal}: any) => {
  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );
  const {forward: ForwardItem, forwardIsActive} = useSelector(
    (state: StoreState) => state.forward,
  );
  const queryClient = useQueryClient();

  const [searchContact, setsearchContact] = useState('');
  const [Contact, setContact] = useState([]);
  const [SelectedContact, setSelectedContact] = useState('');

  const debounceValue = useDebounce(searchContact, 400);

  const forwardMessageMutation = useMutation(forwardMessageSocials, {
    onSuccess(data, variables, context) {
      //inavlid query conversations
      closeFowardModal();
      queryClient.invalidateQueries('conversations');
    },
    onError(error: any, variables, context) {
      console.log('post message error', error);
      //  queryClient.invalidateQueries('conversations');

      messsageToast({message: `${error?.message}`, type: 'danger'});
    },
  });

  //search customer query
  const {data, isLoading: isLoadingContact} = useSearchCustomers(
    {
      searchQuery: debounceValue,
      page: 1,
      channelId: ForwardItem?.author?.channel_id,
      headers: {
        Auth: token,
        organisationId: organisation?.id,
      },
    },

    {
      enabled: !!ForwardItem?.author?.channel_name,
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const searchCustomerResults = data?.pages
          ?.map((res: any) => res?.customers?.map((r: any) => r))
          .flat(2);
        setContact(searchCustomerResults);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);

        //@ts-ignore
        // messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

  const fowardMessage = async () => {
    const data = {
      //  message: {
      //    type: 'message',
      body: {
        user_nick: SelectedContact,
      },
      //    attachment_ids: [],
      //  },
      params: {
        messageId: ForwardItem?.uuid,
        Auth: token,
        organisationId: organisation?.id,
      },
    };
    await forwardMessageMutation.mutateAsync(data);
  };

  //   console.log('Foward from store', JSON.stringify(ForwardItem, null, 2));
  return (
    <Modal
      isVisible={showForwardModal}
      statusBarTranslucent={true}
      onBackdropPress={closeFowardModal}

      // style={[StyleSheet.absoluteFillObject]}
    >
      <View style={styles.ModalContainer}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: hp(10),
            top: hp(10),
            padding: hp(10),
            // backgroundColor: 'red',
          }}
          onPress={closeFowardModal}>
          <AntDesign
            name="close"
            color={colors.secondaryBg}
            size={hp(20)}
            style={{marginTop: hp(3)}}
          />
        </TouchableOpacity>
        <View style={styles.HeadingWrapper}>
          <Text style={styles.searchTitle}>Forward </Text>
          <View
            style={{
              borderLeftColor: colors.secondaryBg,
              borderLeftWidth: 0.9,
              padding: hp(5),
              marginVertical: hp(5),
            }}>
            <Text
              style={{fontSize: FontSize.MediumText, color: colors.darkGray}}>
              {ForwardItem?.author?.platform_name ??
                ForwardItem?.author?.platform_nick}
              :
            </Text>
            <View style={{flexDirection: 'row'}}>
              {ForwardItem?.entity?.attachments && (
                <View style={{marginRight: wp(4)}}>
                  {imageType.includes(
                    mime.extension(
                      ForwardItem?.entity?.attachments[0].mimetype,
                    ),
                  ) && (
                    <Image
                      source={{
                        uri: ForwardItem?.entity?.attachments[0]?.data?.url,
                      }}
                      style={{
                        height: hp(40),
                        width: hp(30),
                        borderRadius: hp(5),
                      }}
                    />
                  )}
                </View>
              )}
              <Text style={{fontSize: FontSize.SmallText, color: colors.dark}}>
                {trimText(ForwardItem?.entity?.content?.body ?? '', 30)}
              </Text>
            </View>
          </View>
          <View style={styles.searchInputWrapper}>
            <Ionicons
              name="md-search-sharp"
              color={colors.secondaryBg}
              size={hp(24)}
              style={{marginTop: hp(3)}}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Contact to forward to"
              value={searchContact}
              onChangeText={text => setsearchContact(text)}
            />
          </View>
        </View>

        {!isLoadingContact ? (
          <ScrollView
            style={styles.contactListContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}>
            {Contact?.map((contact: any, idx: number) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedContact(contact?.platform_nick)}
                  key={`${idx}`}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: hp(7),
                    paddingHorizontal: hp(10),
                    borderBottomColor: colors.lightGray,
                    borderBottomWidth: 0.6,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <UserAvatar
                      size={hp(24)}
                      style={{height: hp(24), width: hp(24)}}
                      borderRadius={hp(24 * 0.5)}
                      name={removeEmoji(
                        contact?.platform_name ?? contact?.platform_nick,
                      )}
                      src={contact?.image_url ?? Avatar}
                    />

                    <View style={{marginLeft: wp(5)}}>
                      <Text
                        style={{
                          fontSize: FontSize.MediumText,
                          color: colors.dark,
                        }}>
                        {contact?.platform_name ?? contact?.platform_nick}
                      </Text>
                      <Text>{contact?.platform_nick}</Text>
                    </View>
                  </View>

                  <View>
                    {SelectedContact === contact?.platform_nick ? (
                      <AntDesign
                        name="checkcircleo"
                        size={hp(18)}
                        color={colors.secondaryBg}
                      />
                    ) : (
                      <Entypo
                        name="circle"
                        size={hp(18)}
                        color={colors.secondaryBg}
                      />
                    )}
                  </View>
                  {/* <View style={{}}>
                    <AntDesign
                      name={
                        SelectedContact === contact?.platform_nick
                          ? 'checkcircleo'
                          : 'minuscircleo'
                      }
                      color={
                        SelectedContact === contact?.platform_nick
                          ? colors.secondaryBg
                          : colors.darkGray
                      }
                      size={hp(18)}
                      style={{marginTop: hp(3)}}
                    />
                  </View> */}
                </TouchableOpacity>
              );
            })}

            {Contact?.length < 1 && (
              <Text
                style={{
                  fontSize: FontSize.MediumText,
                  color: colors.dark,
                  padding: hp(10),
                }}>
                No contact found
              </Text>
            )}
          </ScrollView>
        ) : (
          <View style={styles.contactListContainer}>
            <CustomerLoader />
          </View>
        )}

        <TouchableOpacity
          disabled={!SelectedContact && !forwardIsActive}
          onPress={fowardMessage}
          style={[
            styles.forwardBtn,
            {
              backgroundColor: SelectedContact
                ? colors.secondaryBg
                : colors.bootomHeaderBg,
            },
          ]}>
          <Text
            style={[
              styles.forwardBtnText,
              {color: SelectedContact ? colors.light : colors.darkGray},
            ]}>
            Forward
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ForwardModal;

const styles = StyleSheet.create({
  ModalContainer: {
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: hp(15),
    maxHeight: height * 0.6,
    paddingHorizontal: hp(15),
  },

  HeadingWrapper: {
    paddingVertical: hp(15),
    marginTop: hp(10),
  },

  searchTitle: {
    fontSize: FontSize.MediumText,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    color: colors.dark,
    marginTop: hp(10),
  },

  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondaryBg,
    borderRadius: hp(10),
    paddingHorizontal: hp(10),
    marginVertical: hp(5),
    height: hp(50),
  },
  searchInput: {
    marginLeft: wp(10),
    color: colors.dark,
    fontSize: FontSize.MediumText,
  },
  contactListContainer: {
    // borderColor: colors.secondaryBg,
    // borderWidth: 1,
    borderRadius: hp(15),
    maxHeight: hp(height * 0.27),
  },
  forwardBtn: {
    //     backgroundColor: colors.secondaryBg,
    paddingVertical: hp(10),
    marginVertical: hp(10),
    marginTop: hp(15),
    alignItems: 'center',
    borderRadius: hp(10),
  },
  forwardBtnText: {
    fontSize: FontSize.MediumText,
    color: colors.light,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },
});
