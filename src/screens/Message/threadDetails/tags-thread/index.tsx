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
  tagThread,
  resolveConversation,
  untagThread,
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
import {AxiosError} from 'axios';

type Props = {
  ref: RBSheetProps;
  threadDetail: ThreadType;
};

const {height, width} = Dimensions.get('screen');

const Tags = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const navigation = useNavigation();

  const thread: ThreadType = props?.threadDetail;
  const tags: InboxTagType[] = props?.threadDetail?.tags;
  const tagIds: string[] = tags?.map(i => i?.uuid);
  // const [tagIds, setTagIds] = useState<string[]>([]);

  // console.log('Taaags from info', JSON.stringify(thread?.tags, null, 2));

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  //tagMutations
  const {mutate: TagThreadMutation} = useMutation<any, AxiosError, any, any>(
    tagThread,
    {
      onMutate: async tag => {
        await queryClient.cancelQueries([
          'threadInfo',
          thread?.uuid,
          organisation?.id,
        ]);

        //@ts-ignore
        const {data: previousData} = await queryClient.getQueryData([
          'threadInfo',
          thread?.uuid,
          organisation?.id,
        ]);

        queryClient.setQueryData(
          ['threadInfo', thread?.uuid, organisation?.id],
          ({data}: any) => {
            // console.log('previous old query', JSON.stringify(data, null, 2));
            return {
              thread: {
                ...data?.thread,
                tags: [...data?.thread?.tags, tag],
              },
            };
          },
        );

        return {previousData};
      },

      onError: async (error, variables, context) => {
        // console.log('error from tag', error);
        await queryClient.setQueryData(
          ['threadInfo', thread?.uuid, organisation?.id],
          context?.previousData,
        );

        //@ts-ignore
        messsageToast({
          message: error?.message ?? "conversation could'nt be tagged",
          type: 'danger',
        });
        // queryClient.setQueryData(['tags', variables.uuid], context.previousTag);
      },
      onSuccess: async () => {
        messsageToast({
          message: 'conversation tagged successfully',
          type: 'success',
        });
        // await queryClient.invalidateQueries(['threadInfo', thread?.uuid]);
      },
      onSettled: async (data, error, variables, context) => {
        closeSheet();
        await queryClient.invalidateQueries(['Tags']);
        await queryClient.invalidateQueries(['threadInfo', thread?.uuid]);
      },
    },
  );

  //UnTagMutations
  const {mutate: UnTagThreadMutation} = useMutation<any, AxiosError, any, any>(
    untagThread,
    {
      onMutate: async tag => {
        await queryClient.cancelQueries([
          'threadInfo',
          thread?.uuid,
          organisation?.id,
        ]);

        //@ts-ignore
        const {data: previousData} = await queryClient.getQueryData([
          'threadInfo',
          thread?.uuid,
          organisation?.id,
        ]);

        queryClient.setQueryData(
          ['threadInfo', thread?.uuid, organisation?.id],
          ({data}: any) => {
            // console.log('previous old query', JSON.stringify(data, null, 2));
            return {
              thread: {
                ...data?.thread,
                tags: data?.thread?.tags.filter(
                  (tg: any) => tg.uuid !== tag?.uuid,
                ),
              },
            };
          },
        );

        return {previousData};
      },

      onError: async (error, variables, context) => {
        message: error?.message ?? "conversation could'nt be untagged",
          await queryClient.setQueryData(
            ['threadInfo', thread?.uuid, organisation?.id],
            context?.previousData,
          );
        // queryClient.setQueryData(['tags', variables.uuid], context.previousTag);
      },
      onSuccess: async () => {
        messsageToast({
          message: 'Tag Removed from conversation',
          type: 'success',
        });

        // closeSheet();
      },
      onSettled: async (data, error, variables, context) => {
        closeSheet();
        await queryClient.invalidateQueries(['threadInfo', thread?.uuid]);
        await queryClient.invalidateQueries(['Tags']);
      },
    },
  );

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
  // console.log('Tagssss', JSON.stringify(tags, null, 2));

  //filter out already assigned Teams
  const AllTagss = useMemo(() => {
    const temp = [
      ...(sharedTagsData?.data?.tags?.tags ?? []),
      ...(personalTagsData?.data?.tags?.tags ?? []),
    ];

    return temp;

    // return temp?.filter((tag: InboxTagType) => {
    //   return !tags?.find((taged: InboxTagType) => {
    //     return tag?.uuid === taged?.uuid;
    //   });
    // });
  }, [sharedTagsData, personalTagsData, tags]);

  //add or remove tag onclick
  const handleTagClick = async (SelectedtagId: string) => {
    if (!!tagIds.includes(SelectedtagId)) {
      UnTagThreadMutation({
        Auth: token,
        tagId: SelectedtagId,
        threadId: thread?.uuid,
        organisationId: organisation?.id,
      });
    } else {
      TagThreadMutation({
        Auth: token,
        tagId: [SelectedtagId],
        threadId: thread?.uuid,
        organisationId: organisation?.id,
      });
    }
  };

  // function addTagToList(tagId: string) {
  //   /*
  //   checks if the tag is added to array,
  //   then removes if is added to array els adds to array
  //   */

  //   if (tagIds.includes(tagId)) {
  //     const tempTags = tagIds.filter(id => id !== tagId);
  //     setTagIds(tempTags);
  //     return;
  //   }
  //   setTagIds([...(tagIds ?? []), tagId]);
  // }

  function closeSheet() {
    //@ts-ignore
    if (ref?.current) {
      //@ts-ignore
      ref?.current.close();
    }
  }

  const Tag = ({tag}: {tag: InboxTagType}) => {
    // console.log('tagList', JSON.stringify(tag, null, 2));
    return (
      <View style={[styles.asigneeContainer]}>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // backgroundColor: 'yellow',
              // width: '100%',
            }}
            onPress={() => handleTagClick(tag?.uuid)}>
            <View style={styles.asigneeWrapper}>
              <TagIcon
                width={hp(16)}
                height={hp(16)}
                color={tag?.color ?? colors.secondaryBg}
              />
              <View style={{marginLeft: wp(5)}}>
                <Text style={[styles.asigneeName]}>{tag?.name}</Text>
              </View>
            </View>

            <CheckBox
              checked={!!tagIds?.includes(tag?.uuid)}
              onChange={() => {}}></CheckBox>
          </TouchableOpacity>
          <View
            style={{
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
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: hp(5),
                  marginLeft: wp(30),
                  marginTop: i === 0 ? hp(8) : hp(5),
                }}
                onPress={() => handleTagClick(childTag?.uuid)}
                key={`${i}`}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TagIcon
                    width={hp(16)}
                    height={hp(16)}
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
                <CheckBox
                  checked={!!tagIds?.includes(childTag?.uuid)}
                  onChange={() => {}}></CheckBox>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  // console.log('Member', JSON.stringify(organisationMember, null, 2));
  // console.log('tread', JSON.stringify(thread?.inbox, null, 2));
  // console.log('tread', JSON.stringify(tagIds, null, 2));

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
            width: '100%',

            minHeight: hp(300),
          }}>
          <Text style={styles.TitleText}>Tags</Text>
          <Divider />

          <ScrollView
            style={{maxHeight: height * 0.57, paddingBottom: hp(10)}}
            contentInset={{bottom: hp(15)}}>
            <View style={[styles.sectionwrapper]}>
              {AllTagss &&
                AllTagss?.map((tag: InboxTagType, i: number) => (
                  <Tag tag={tag} key={`${i}`} />
                ))}

              {AllTagss?.length === 0 && (
                <Text style={styles.emptyText}>No Tags</Text>
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
