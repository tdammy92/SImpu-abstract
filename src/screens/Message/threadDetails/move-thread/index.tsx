import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useRef,
  useLayoutEffect,
  useState,
  memo,
  useMemo,
} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {copyIdToClipboard, hp, messsageToast, wp} from 'src/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {CheckBox, Divider, Text} from '@ui-kitten/components';
import {colors, FONTS, FontSize} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from 'src/navigation/constants';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import Modal from 'react-native-modal';
import {useMutation} from 'react-query';
import {
  assignConversationThread,
  moveThread,
  resolveConversation,
} from 'src/services/mutations/inbox';
import {trimText} from 'src/utils/string-utils/string';
import {
  AssineeType,
  InboxTagType,
  InboxType,
  MemberType,
  TeamType,
  ThreadType,
} from 'src/@types/inbox';
import {
  useMemberList,
  usePersonalInbox,
  useSharedInbox,
  useTagList,
  useTeamsList,
} from 'src/services/query/queries';
import {queryClient} from 'src/index';
import TagIcon from 'src/assets/images/TagIcon.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PendingAvailble from 'src/assets/images/GrayNotification.svg';

type Props = {
  ref: RBSheetProps;
  threadDetail: ThreadType;
};

const {height, width} = Dimensions.get('screen');

const MoveThread = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const navigation = useNavigation();

  const thread: ThreadType = props?.threadDetail;

  const inbox = props?.threadDetail?.inbox;

  // console.log('Taaags', JSON.stringify(inbox, null, 2));

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  const moveMutations = useMutation(moveThread, {
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries(['threadInfo']);
      // await queryClient.invalidateQueries(['personal-inbox']);
      // await queryClient.invalidateQueries(['shared-inbox']);
      closeSheet();

      messsageToast({message: `Conversation moved`, type: 'success'});
      // console.log('data after moving Inbox', JSON.stringify(data, null, 2));
    },
    onError(error, variables, context) {
      console.log('error moving conversation', error);
      messsageToast({message: `${error}`, type: 'warning'});
    },
  });

  //hooks to fetch personal inbox
  const {data: personalInbox} = usePersonalInbox(
    {
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      enabled: inbox?.type !== 'shared',
      onSuccess(data: any, variables: any, context: any) {
        // setThreadDetail(data?.data);
        // console.log('data from personal inbox', JSON.stringify(data, null, 2));
      },
      onError(error: any, variables: any, context: any) {
        console.log('Move To personal inbox error', error);
      },
    },
  );
  //hooks to fetch shared inbox
  const {data: sharedInbox} = useSharedInbox(
    {
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {
        // setThreadDetail(data?.data);
        // console.log('data from assigned', JSON.stringify(data, null, 2));
        // console.log('data from shared inbox', JSON.stringify(data, null, 2));
      },
      onError(error: any, variables: any, context: any) {
        console.log('Move To shared inbox error', error);
      },
    },
  );

  // filter out current inbox
  const allInboxes = useMemo(() => {
    return [...(sharedInbox ?? []), ...(personalInbox ?? [])];
  }, [sharedInbox, personalInbox, thread]);

  const moveTo = (id: string) => {
    moveMutations.mutate({
      inboxId: id,
      Auth: token,
      organisationId: organisation.id,
      threadId: thread?.uuid,
    });
  };

  function closeSheet() {
    //@ts-ignore
    if (ref?.current) {
      //@ts-ignore
      ref?.current.close();
    }
  }

  const InboX = (inbx: InboxType) => {
    return (
      <>
        <TouchableOpacity
          style={styles.inboxWrapper}
          onPress={() => moveTo(inbx?.uuid)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PendingAvailble
              width={10}
              height={10}
              color={inbx?.color ?? colors.secondaryBgDark}
            />
            <Text style={[styles.inboxName, {marginLeft: wp(5)}]}>
              {inbx?.name}
            </Text>
          </View>

          <CheckBox
            checked={inbox?.uuid === inbx?.uuid}
            onChange={() => {}}></CheckBox>
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  // console.log('Member', JSON.stringify(organisationMember, null, 2));
  // console.log('tread', JSON.stringify(thread?.inbox, null, 2));

  return (
    <>
      {/* @ts-ignore */}
      <RBSheet
        ref={ref}
        height={height * 0.6}
        openDuration={250}
        // closeOnDragDown={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
          draggableIcon: {
            backgroundColor: '#E5E4E2',
          },
          container: {
            borderTopLeftRadius: hp(30),
            borderTopRightRadius: hp(30),

            height: 'auto',
            justifyContent: 'center',
            backgroundColor: colors.light,
          },
        }}>
        <View
          style={{
            width: '100%',
            minHeight: hp(300),
          }}>
          <Text style={styles.TitleText}>Move</Text>
          <Divider />

          <ScrollView
            style={{maxHeight: height * 0.57, paddingBottom: hp(10)}}
            contentInset={{bottom: hp(15)}}>
            {allInboxes &&
              allInboxes?.map((inbx: InboxType, i: number) => (
                <InboX {...inbx} key={`${i}`} />
              ))}
          </ScrollView>
        </View>
      </RBSheet>
    </>
  );
});

export default memo(MoveThread);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    width: '96%',
    height: '96%',
    borderTopLeftRadius: hp(15),
    borderTopRightRadius: hp(15),
  },
  TitleText: {
    fontSize: FontSize.BigText,
    // marginTop: hp(10),
    textAlign: 'center',
    color: colors.dark,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    paddingVertical: hp(10),
  },
  infoText: {
    textAlign: 'justify',

    fontSize: FontSize.MediumText,
    lineHeight: 22,
    fontFamily: FONTS.TEXT_REGULAR,
  },

  infoText2: {
    fontSize: FontSize.MediumText,
    // lineHeight: 22,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
  },

  inputStyle: {
    width: '100%',
    height: '100%',
    padding: hp(10),
    paddingBottom: hp(15),
    fontSize: FontSize.MediumText,
    color: colors.dark,
    alignSelf: 'center',

    textAlignVertical: 'top',
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  resolveButton: {
    borderWidth: 1,
    paddingVertical: hp(5),
    paddingHorizontal: hp(10),
    borderRadius: hp(10),
    width: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: FontSize.MediumText,
  },

  sectionTitle: {
    marginLeft: wp(10),
    paddingTop: hp(5),
    fontSize: FontSize.BigText,
    fontFamily: FONTS.TEXT_REGULAR,
  },

  //assignee container
  asigneeContainer: {
    borderBottomColor: colors.bootomHeaderBg,
    borderBottomWidth: 1,
    paddingVertical: hp(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },

  //assignee wrapppr
  inboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(15),
    paddingVertical: hp(15),
    justifyContent: 'space-between',
  },

  inboxName: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    // textTransform: 'capitalize',
  },

  emptyText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.SmallText + 2,
    textAlign: 'center',
  },
});
