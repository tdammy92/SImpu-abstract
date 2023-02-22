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
import {
  AssineeType,
  InboxTagType,
  MemberType,
  TeamType,
  ThreadType,
} from 'src/@types/inbox';
import {
  useMemberList,
  useTagList,
  useTeamsList,
} from 'src/services/query/queries';
import {queryClient} from 'src/index';
import TagIcon from 'src/assets/images/TagIcon.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  ref: RBSheetProps;
  threadDetail: ThreadType;
};

const {height, width} = Dimensions.get('screen');

const Tags = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const navigation = useNavigation();

  const thread: ThreadType = props?.threadDetail;
  const tags: InboxTagType[] = props?.threadDetail?.tags;

  // console.log('Taaags', JSON.stringify(tags, null, 2));

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  const assignMutations = useMutation(assignConversationThread, {
    onSuccess(data, variables, context) {
      console.log('data after assigned', JSON.stringify(data, null, 2));
      queryClient.invalidateQueries(['Teams']);
      queryClient.invalidateQueries(['Members']);
      queryClient.invalidateQueries(['threadInfo', thread?.uuid]);
      queryClient.invalidateQueries(['conversations', thread?.uuid]);
    },
    onError(error, variables, context) {
      console.log('error after assigned', error);
    },
  });

  //hooks to fetch shared tags
  const {data: sharedTagsData} = useTagList(
    {
      type: 'shared',
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

  //hooks to fetch shared tags
  const {data: personalTagsData} = useTagList(
    {
      type: 'personal',
      Auth: token,
      organisationId: organisation?.id,
    },
    {
      enabled: thread?.inbox?.type !== 'shared',
      onSuccess(data: any, variables: any, context: any) {
        // setThreadDetail(data?.data);
        // console.log('data from assigned', JSON.stringify(data, null, 2));
      },
      onError(error: any, variables: any, context: any) {
        console.log('organisation member error', error);
      },
    },
  );

  // console.log('Unfiltered Assignes', JSON.stringify(assignees, null, 2));

  // console.log('Unfiltered Tags', JSON.stringify(personalTagsData, null, 2));

  //filter out already assigned Teams
  const personalTagss = useMemo(
    () =>
      personalTagsData?.data?.tags?.tags?.filter((tag: InboxTagType) => {
        return !tags?.find((taged: InboxTagType) => {
          return tag?.uuid === taged?.uuid;
        });
      }),

    [personalTagsData, tags],
  );

  //filter out already assigned Teams
  const sharedTagss = useMemo(
    () =>
      sharedTagsData?.data?.tags?.tags?.filter((tag: InboxTagType) => {
        return !tags?.find((taged: InboxTagType) => {
          return tag?.uuid === taged?.uuid;
        });
      }),

    [sharedTagsData, tags],
  );

  const addTag = (type: 'user' | 'team', id: string) => {
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

  const Tag = (tag: InboxTagType) => {
    return (
      <View style={[styles.asigneeContainer]}>
        <View>
          <View style={styles.asigneeWrapper}>
            <TagIcon
              width={hp(20)}
              height={hp(20)}
              color={tag?.color ?? colors.secondaryBg}
            />
            <View style={{marginLeft: wp(5)}}>
              <Text style={[styles.asigneeName]}>{tag?.name}</Text>
              {/* <Text style={[styles.asigneeName, {fontSize: FontSize.SmallText}]}>
              {assignee.type}
            </Text> */}
            </View>
          </View>
          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-evenly',
              // backgroundColor: 'yellow',
              width: '100%',
            }}>
            {tag?.children?.length > 0 && (
              <View style={{position: 'absolute', top: hp(4), left: wp(4)}}>
                <MaterialCommunityIcons
                  name="arrow-right-bottom"
                  color={colors.darkGray}
                  size={25}
                />
              </View>
            )}
            {tag?.children?.map((childTag: InboxTagType, i: number) => (
              <View
                key={`${i}`}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: hp(5),
                  marginLeft: wp(30),
                  marginTop: i === 0 ? hp(8) : hp(5),
                }}>
                <TagIcon
                  width={hp(18)}
                  height={hp(18)}
                  color={childTag?.color ?? colors.secondaryBg}
                />
                <Text
                  style={{
                    color: colors.dark,
                    fontSize: FontSize.MediumText,
                    marginLeft: wp(4),
                  }}>
                  {childTag?.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {/* {selected && (
          <View>
            <AntDesign name="checkcircleo" size={hp(18)} color={colors.dark} />
          </View>
        )} */}
      </View>
    );
  };

  // const Team = (team: TeamType) => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.asigneeContainer}
  //       onPress={() => handleAssignTo('team', team?.id)}>
  //       <View style={[styles.asigneeWrapper]}>
  //         <UserAvatar
  //           size={hp(35)}
  //           style={{height: hp(35), width: hp(35)}}
  //           borderRadius={hp(35 * 0.5)}
  //           name={team?.name}
  //           // url={assignee.image_url}
  //         />
  //         <View style={{marginLeft: wp(5)}}>
  //           <Text style={[styles.asigneeName]}>{team?.name}</Text>
  //           <Text style={[styles.asigneeName, {fontSize: FontSize.SmallText}]}>
  //             {team?.members?.length} member(s)
  //           </Text>
  //         </View>
  //       </View>
  //       <View>
  //         <Entypo name="circle" size={hp(18)} color={colors.dark} />
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

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
            backgroundColor: 'rgba(105,105,105,0.7)',
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
          <Text style={styles.TitleText}>Tags</Text>
          <Divider />

          <ScrollView style={{maxHeight: height * 0.57}}>
            <View style={[styles.sectionwrapper]}>
              {/* <Text style={[styles.sectionTitle]}>Selected Tags</Text> */}
              {tags &&
                tags?.map((tag: InboxTagType, i: number) => (
                  <Tag {...tag} key={`${i}`} />
                ))}

              {tags?.length === 0 && (
                <Text style={styles.emptyText}>No Selected Tags</Text>
              )}
            </View>
            <Divider />
            <View style={[styles.sectionwrapper]}>
              {/* <Text style={[styles.sectionTitle]}>Personal Tags</Text> */}
              {personalTagss &&
                personalTagss?.map((tag: InboxTagType, i: number) => (
                  <Tag {...tag} key={`${i}`} />
                ))}

              {personalTagss?.length === 0 && (
                <Text style={styles.emptyText}>No Personal Tags</Text>
              )}
            </View>
            <Divider />
            <View style={[styles.sectionwrapper]}>
              {/* <Text style={[styles.sectionTitle]}>Shared Tags</Text> */}
              {sharedTagss &&
                sharedTagss?.map((tag: InboxTagType, i: number) => (
                  <Tag {...tag} key={`${i}`} />
                ))}

              {sharedTagss?.length === 0 && (
                <Text style={styles.emptyText}>No Shared Tags</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </>
  );
});

export default memo(Tags);

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
    fontSize: FontSize.SmallText + 2,
    textAlign: 'center',
  },
});
