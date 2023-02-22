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
import {Divider, Text} from '@ui-kitten/components';
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
  resolveConversation,
} from 'src/services/mutations/inbox';
import {trimText} from 'src/utils/string-utils/string';
import {AssineeType, MemberType, TeamType, ThreadType} from 'src/@types/inbox';
import {useMemberList, useTeamsList} from 'src/services/query/queries';
import {queryClient} from 'src/index';

type Props = {
  ref: RBSheetProps;
  threadDetail: any;
};

const {height, width} = Dimensions.get('screen');

const Assign = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const navigation = useNavigation();

  const thread: ThreadType = props?.threadDetail;
  const assignees: AssineeType[] = props?.threadDetail?.assignees;

  // console.log('assigned', JSON.stringify(assignees, null, 2));

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  const assignMutations = useMutation(assignConversationThread, {
    onSuccess(data, variables, context) {
      // console.log('data after assigned', JSON.stringify(data, null, 2));
      messsageToast({
        message: 'Assigned Conversation',
        type: 'success',
        // description: 'Error',
      });

      queryClient.invalidateQueries(['Teams']);
      queryClient.invalidateQueries(['Members']);
      queryClient.invalidateQueries(['threadInfo', thread?.uuid]);
      queryClient.invalidateQueries(['conversations', thread?.uuid]);
    },
    onError(error, variables, context) {
      // console.log('error after assigned', error);
      //@ts-ignore
      messsageToast({message: error, type: 'danger', description: 'Error'});
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
        console.log('assign member error', error);
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
        console.log('asssign teams member error', error);
      },
    },
  );

  // console.log('Unfiltered member', JSON.stringify(Memberdata, null, 2));

  // console.log(
  //   'Unfiltered Teams',
  //   JSON.stringify(TeamData?.data?.teams, null, 2),
  // );

  //filter out already assigned Teams
  const Teams = useMemo(
    () =>
      TeamData?.data?.teams?.filter((team: TeamType) => {
        return !assignees?.find((assignee: AssineeType) => {
          return assignee?.uuid === team?.id;
        });
      }),

    [TeamData, assignees],
  );

  //filter out already assigned members
  const organisationMember = useMemo(
    () =>
      Memberdata?.data?.members?.filter((member: MemberType) => {
        return !assignees?.find((assignee: AssineeType) => {
          return member?.id === assignee?.user_id;
        });
      }),

    [Memberdata, assignees],
  );

  const handleAssignTo = (type: 'user' | 'team', id: string) => {
    assignMutations.mutate({
      type,
      assignee_id: id,
      Auth: token,
      organisationId: organisation.id,
      threadId: thread?.uuid,
    });
  };

  const closeSheet = () => {
    //@ts-ignore
    if (ref?.current) {
      //@ts-ignore
      ref?.current.close();
    }
  };

  const Assignee = (assignee: AssineeType) => {
    return (
      <View style={[styles.asigneeContainer]}>
        <View style={styles.asigneeWrapper}>
          <UserAvatar
            size={hp(35)}
            style={{height: hp(35), width: hp(35)}}
            borderRadius={hp(35 * 0.5)}
            name={assignee.name}
            url={assignee.image_url}
          />
          <View style={{marginLeft: wp(5)}}>
            <Text style={[styles.asigneeName]}>{assignee.name}</Text>
            <Text style={[styles.asigneeName, {fontSize: FontSize.SmallText}]}>
              {assignee.type}
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
    return (
      <TouchableOpacity
        style={styles.asigneeContainer}
        onPress={() => handleAssignTo('user', member?.id)}>
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
        <View>
          <Entypo name="circle" size={hp(18)} color={colors.dark} />
        </View>
      </TouchableOpacity>
    );
  };

  const Team = (team: TeamType) => {
    return (
      <TouchableOpacity
        style={styles.asigneeContainer}
        onPress={() => handleAssignTo('team', team?.id)}>
        <View style={[styles.asigneeWrapper]}>
          <UserAvatar
            size={hp(35)}
            style={{height: hp(35), width: hp(35)}}
            borderRadius={hp(35 * 0.5)}
            name={team?.name}
            // url={assignee.image_url}
          />
          <View style={{marginLeft: wp(5)}}>
            <Text style={[styles.asigneeName]}>{team?.name}</Text>
            <Text style={[styles.asigneeName, {fontSize: FontSize.SmallText}]}>
              {team?.members?.length} member(s)
            </Text>
          </View>
        </View>
        <View>
          <Entypo name="circle" size={hp(18)} color={colors.dark} />
        </View>
      </TouchableOpacity>
    );
  };

  // console.log('Member', JSON.stringify(organisationMember, null, 2));
  // console.log('Team', JSON.stringify(Teams, null, 2));

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
            backgroundColor: 'rgba(0,0,0,0.2)',
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
          <Text style={styles.TitleText}>Assign</Text>
          <Divider />

          <ScrollView style={{maxHeight: height * 0.57}}>
            <View style={[styles.sectionwrapper]}>
              <Text style={[styles.sectionTitle]}>Assigned</Text>
              {assignees &&
                assignees?.map((assignee: AssineeType, i: number) => (
                  <Assignee {...assignee} key={`${i}`} />
                ))}

              {!assignees ||
                (assignees?.length === 0 && (
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
            <Divider />
            <View style={[styles.sectionwrapper]}>
              <Text style={[styles.sectionTitle]}>Teams</Text>
              {Teams &&
                Teams?.map((team: TeamType, i: number) => (
                  <Team {...team} key={`${i}`} />
                ))}

              {Teams?.length === 0 && (
                <Text style={styles.emptyText}>No Teams</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </>
  );
});

export default memo(Assign);

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
