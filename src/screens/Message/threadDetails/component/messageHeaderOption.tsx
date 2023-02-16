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
} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {copyIdToClipboard, hp, messsageToast, wp} from 'src/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider, Text} from '@ui-kitten/components';
import {colors, FONTS, FontSize} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_NAME} from 'src/navigation/constants';

import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import Modal from 'react-native-modal';
import Resolve from '../resolve-thread';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  ref: RBSheetProps;
  threadDetail: any;
  openResolve: any;
};

const {height, width} = Dimensions.get('screen');

const HeaderOption = forwardRef(
  (props: Props, ref: React.ForwardedRef<any>) => {
    const navigation = useNavigation();
    const {openResolve} = props;
    const thread = props?.threadDetail?.thread;

    const {profile, user, token} = useSelector(
      (state: StoreState) => state?.user,
    );
    const organisation = useSelector(
      (state: StoreState) => state?.organisation?.details,
    );

    // console.log('thread Detail', JSON.stringify(thread, null, 2));

    // const resolveMutation = useMutation(resolveConversation,{})

    const navigateToDetails = useCallback(() => {
      //@ts-ignore
      navigation.navigate(SCREEN_NAME.conversationDetails, {
        threadDetail: thread,
      });

      //@ts-ignore
      ref.current.close();
    }, [thread]);

    const copyId = () => {
      copyIdToClipboard('Copied Conversation ID', thread?.uuid);

      //@ts-ignore
      ref.current.close();
    };

    return (
      <>
        {/* @ts-ignore */}
        <RBSheet
          ref={ref}
          height={height * 0.45}
          openDuration={250}
          closeOnDragDown
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.3)',
            },
            draggableIcon: {
              backgroundColor: '#E5E4E2',
            },
            container: {
              borderTopLeftRadius: hp(30),
              borderTopRightRadius: hp(30),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.light,
              padding: 0,
            },
          }}>
          <View
            style={styles.container}
            // showsVerticalScrollIndicator={false}
          >
            <View style={styles.gridConatiner}>
              <TouchableOpacity style={styles.boxContainer}>
                <Feather name="user-check" size={25} color={colors.dark} />
                <Text style={styles.opionText}>Assign</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boxContainer}>
                <Feather name="users" size={23} color="#000" />
                <Text style={styles.opionText}>Participants</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boxContainer}>
                <MaterialCommunityIcons
                  name="arrow-right-bold-outline"
                  size={25}
                  color={colors.dark}
                />
                <Text style={styles.opionText}>Move to</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.boxContainer}>
                <AntDesign name="tagso" size={25} color={colors.dark} />
                <Text style={styles.opionText}>Tags</Text>
              </TouchableOpacity>
            </View>
            <Divider style={{height: 2}} />
            <ScrollView
              style={styles.ListContainer}
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={openResolve}
                style={styles.ListBox}
                disabled={
                  thread?.state === 'closed' || thread?.state === 'resolved'
                }>
                <MaterialCommunityIcons
                  name="check-all"
                  size={25}
                  color={
                    thread?.state === 'closed' || thread?.state === 'resolved'
                      ? colors.lightGray
                      : colors.dark
                  }
                />
                <Text
                  style={[
                    styles.optionListText,
                    {
                      color:
                        thread?.state === 'closed' ||
                        thread?.state === 'resolved'
                          ? colors.lightGray
                          : colors.dark,
                    },
                  ]}>
                  {thread?.state === 'closed' || thread?.state === 'resolved'
                    ? 'Closed'
                    : 'Resolve'}
                </Text>
              </TouchableOpacity>
              <Divider style={{height: 2}} />
              <TouchableOpacity style={styles.ListBox}>
                <AntDesign name="mail" size={25} color={colors.dark} />
                <Text style={styles.optionListText}>Mark as unread</Text>
              </TouchableOpacity>
              <Divider style={{height: 2}} />
              <TouchableOpacity style={styles.ListBox} onPress={copyId}>
                <MaterialIcons
                  name="content-copy"
                  size={25}
                  color={colors.dark}
                />
                <Text style={styles.optionListText}>Copy conversation Id</Text>
              </TouchableOpacity>
              <Divider style={{height: 2}} />

              <TouchableOpacity
                style={styles.ListBox}
                onPress={navigateToDetails}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={25}
                  color={colors.dark}
                />
                <Text style={styles.optionListText}>
                  View conversation details
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </RBSheet>
      </>
    );
  },
);

export default HeaderOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    width: '96%',
    height: '96%',

    borderTopLeftRadius: hp(15),
    borderTopRightRadius: hp(15),
  },
  gridConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp(10),
  },
  ListContainer: {
    paddingHorizontal: hp(15),
  },
  ListBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(15),
  },
  boxContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opionText: {
    textAlign: 'justify',
    paddingTop: hp(5),
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    color: colors.dark,
  },
  optionListText: {
    marginLeft: hp(8),
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    color: colors.dark,
  },
});
