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
  addParticipants,
} from 'src/services/mutations/inbox';
import {trimText} from 'src/utils/string-utils/string';
import {
  AssineeType,
  MemberType,
  TeamType,
  ThreadParticipantType,
  ThreadType,
} from 'src/@types/inbox';
import {useMemberList, useTeamsList} from 'src/services/query/queries';
import {queryClient} from 'src/index';
import Animated, {BounceInDown, BounceOutDown} from 'react-native-reanimated';

type Props = {
  ref: RBSheetProps;
  threadDetail: ThreadType;
};

const {height, width} = Dimensions.get('screen');

const Participant = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const navigation = useNavigation();

  const thread: ThreadType = props?.threadDetail;
  const participants: ThreadParticipantType[] | undefined =
    props?.threadDetail?.participants;

  const type = thread?.inbox?.type;
  const [addedMembers, setAddedMembers] = useState<string[]>([]);

  // console.log('assigned', JSON.stringify(assignees, null, 2));

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  const ParticipantMutations = useMutation(addParticipants, {
    onSuccess: async (data, variables, context) => {
      setAddedMembers([]);
      await queryClient.invalidateQueries(['Members', thread?.uuid]);
      await queryClient.invalidateQueries(['threadInfo', thread?.uuid]);
      await queryClient.invalidateQueries(['conversations', thread?.uuid]);
      closeSheet();

      messsageToast({
        message: 'Added new participant',
        type: 'success',
        // description: 'Error',
      });
    },
    onError(error, variables, context) {
      console.log('error after participant', error);
      //@ts-ignore
      messsageToast({message: error, type: 'danger'});
    },
  });

  const {data: Memberdata} = useMemberList(
    {
      threadID: thread?.uuid,
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {
        // setThreadDetail(data?.data);
        // console.log('data from assigned', JSON.stringify(data, null, 2));
      },
      onError(error: any, variables: any, context: any) {
        console.log('organisation member error', error);
      },
    },
  );

  const {data: TeamData} = useTeamsList(
    {
      // threadID: thread?.uuid,
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      onSuccess(data: any, variables: any, context: any) {
        // setThreadDetail(data?.data);
        // console.log('teams member', JSON.stringify(data, null, 2));
      },
      onError(error: any, variables: any, context: any) {
        console.log('tems member error', error);
      },
    },
  );

  //filter out already participants members
  const organisationMember = useMemo(
    () =>
      Memberdata?.data?.members?.filter((participant: any) => {
        return !participants?.find((part: ThreadParticipantType) => {
          return participant?.id === part?.user_id;
        });
      }),

    [Memberdata, participants],
  );

  const handleAddParticipant = () => {
    ParticipantMutations.mutate({
      user_ids: addedMembers,
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

  const Participant = (participant: ThreadParticipantType) => {
    return (
      <View style={[styles.asigneeContainer]}>
        <View style={styles.asigneeWrapper}>
          <UserAvatar
            size={hp(35)}
            style={{height: hp(35), width: hp(35)}}
            borderRadius={hp(35 * 0.5)}
            name={participant?.name}
            url={participant?.image}
          />
          <View style={{marginLeft: wp(5)}}>
            <Text style={[styles.asigneeName]}>{participant?.name}</Text>
            <Text style={[styles.asigneeName, {fontSize: FontSize.SmallText}]}>
              {participant?.type}
            </Text>
          </View>
        </View>
        <View>
          <AntDesign name="checkcircleo" size={hp(18)} color={colors.dark} />
        </View>
      </View>
    );
  };
  const Members = (member: MemberType) => {
    // console.log('member sss', JSON.stringify(member, null, 2));
    return (
      <TouchableOpacity
        style={styles.asigneeContainer}
        onPress={() => addToList(member?.id)}>
        <View style={[styles.asigneeWrapper]}>
          <UserAvatar
            size={hp(35)}
            style={{height: hp(35), width: hp(35)}}
            borderRadius={hp(35 * 0.5)}
            name={`${member?.first_name} ${member?.last_name}`}
            url={member?.image}
          />
          <View style={{marginLeft: wp(5)}}>
            <Text
              style={[
                styles.asigneeName,
              ]}>{`${member?.first_name} ${member?.last_name}`}</Text>
            {/* <Text style={[styles.asigneeName, {fontSize: FontSize.SmallText}]}>
            {assignee.type}
          </Text> */}
          </View>
        </View>

        <CheckBox
          checked={!!addedMembers.includes(member?.id)}
          onChange={() => {}}></CheckBox>
      </TouchableOpacity>
    );
  };

  function addToList(userId: string) {
    /*
    checks if the user is added to array, 
    then removes if is added to array els adds to array
    */

    if (addedMembers.includes(userId)) {
      const tempUser = addedMembers.filter(id => id !== userId);
      setAddedMembers(tempUser);
      return;
    }
    setAddedMembers([...(addedMembers ?? []), userId]);
  }

  // console.log('Member', JSON.stringify(organisationMember, null, 2));
  // console.log('Thread', JSON.stringify(addedMembers, null, 2));
  // console.log('Thread', JSON.stringify(thread?, null, 2));

  return (
    <>
      {/* @ts-ignore */}
      <RBSheet
        ref={ref}
        height={height * 0.6}
        openDuration={250}
        onClose={() => setAddedMembers([])}
        // closeOnDragDown={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.01)',
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
            // alignSelf: 'center',
            // backgroundColor: 'red',
            // backgroundColor: colors.light,
            width: '100%',
            // height: '100%',
            minHeight: hp(300),

            // alignItems: 'center',
            // padding: hp(10),
          }}>
          <Text style={styles.TitleText}>Participant</Text>
          <Divider />
          <ScrollView
            style={{maxHeight: height * 0.57, paddingBottom: hp(10)}}
            contentInset={{bottom: hp(15)}}>
            <View style={[styles.sectionwrapper]}>
              {participants &&
                participants?.map((part: ThreadParticipantType, i: number) => (
                  <Participant {...part} key={`${i}`} />
                ))}

              {!participants ||
                (participants?.length === 0 && (
                  <Text style={styles.emptyText}>Not assigned to any one</Text>
                ))}
            </View>
            <Divider />
            <View style={[styles.sectionwrapper]}>
              <Text style={[styles.sectionTitle]}>Member</Text>
              {organisationMember &&
                organisationMember?.map((assignee: MemberType, i: number) => (
                  <Members {...assignee} key={`${i}`} />
                ))}

              {organisationMember?.length === 0 && (
                <Text style={styles.emptyText}>No Organisation members</Text>
              )}
            </View>
          </ScrollView>

          {/* show button only when there is member to add */}
          {organisationMember?.length && (
            <>
              {!!addedMembers.length && (
                <Animated.View
                  entering={BounceInDown}
                  exiting={BounceOutDown}
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: hp(20),
                  }}>
                  <TouchableOpacity
                    disabled={!addedMembers.length}
                    onPress={handleAddParticipant}
                    style={{
                      backgroundColor: colors.secondaryBg,
                      width: wp(120),
                      height: hp(35),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: hp(8),
                      paddingVertical: hp(5),
                    }}>
                    <Text
                      style={{
                        color: colors.light,
                        fontFamily: FONTS.TEXT_REGULAR,
                        fontSize: FontSize.MediumText,
                        marginRight: wp(4),
                      }}>
                      Add
                    </Text>
                    <AntDesign
                      name="adduser"
                      color={colors.light}
                      size={hp(22)}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )}
            </>
          )}
        </View>
      </RBSheet>
    </>
  );
});

export default memo(Participant);

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

  //section code

  sectionwrapper: {
    flex: 1,
    height: 'auto',
    minHeight: hp(70),
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
  asigneeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  asigneeName: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    textTransform: 'capitalize',
    // marginLeft: wp(5),
  },

  emptyText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    textAlign: 'center',
  },
});
