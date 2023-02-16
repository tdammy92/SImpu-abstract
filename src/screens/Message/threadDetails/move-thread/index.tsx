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
import {useMutation} from 'react-query';
import {resolveConversation} from 'src/services/mutations/inbox';
import {trimText} from 'src/utils/string-utils/string';

type Props = {
  ref: RBSheetProps;
  threadDetail: any;
};

const {height, width} = Dimensions.get('screen');

const Resolve = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const navigation = useNavigation();

  const thread = props?.threadDetail?.thread;

  // console.log('resolve', JSON.stringify(thread, null, 2));

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  const [resolveNote, setResolveNote] = useState('');
  const ListRef = useRef(null);

  //Mark conversation as read
  const resolveMutation = useMutation(
    () =>
      resolveConversation({
        data: {request_rating: true},
        Auth: token,
        organisationId: organisation?.id,
        threadId: thread?.uuid,
      }),
    {
      onSuccess(data, variables, context) {
        //@ts-ignore
        ref.current.close();
        messsageToast({message: `Conversation resolved`, type: 'success'});
      },
      onError(error, variables, context) {
        console.log('error from resolve', error);
      },
    },
  );

  const closeSheet = () => {
    //@ts-ignore
    if (ref?.current) {
      //@ts-ignore
      ref?.current.close();
    }
  };

  const handleResolve = () => {
    resolveMutation.mutate();
  };

  const isEmail = thread?.channel_name === 'email';
  const sender = thread?.sender?.name ?? thread?.sender?.platform_nick;
  const subject = thread?.subject;

  return (
    <>
      {/* @ts-ignore */}
      <RBSheet
        ref={ref}
        height={height * 0.47}
        openDuration={250}
        closeOnDragDown
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
            // alignItems: 'center',
            height: 'auto',
            justifyContent: 'center',
            backgroundColor: colors.light,
          },
        }}>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: colors.light,
            width: '100%',
            alignItems: 'center',
            padding: hp(10),
          }}>
          <Text style={styles.resolveTitle}>Resolve Conversation</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Text style={styles.infoText}>
              You are about to resolve a conversation with{' '}
              {!isEmail ? (
                <Text style={styles.infoText2}>{trimText(sender, 20)}</Text>
              ) : (
                <Text style={styles.infoText2}>
                  the subject {trimText(subject, 35)}
                </Text>
              )}
              , Once a conversation is resolved it is moved to the closed tab
              for this inbox.
            </Text>
            <View
              style={{
                width: '95%',
                maxHeight: hp(250),
                height: hp(140),
                borderRadius: hp(10),
                borderWidth: 1,
                borderColor: colors.secondaryBg,
                backgroundColor: colors.bootomHeaderBg,
                marginVertical: hp(10),
              }}>
              <TextInput
                style={styles.inputStyle}
                value={resolveNote}
                autoFocus={true}
                onChangeText={text => setResolveNote(text)}
                maxLength={160}
                multiline
                placeholder="Enter note!"
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 4,
                  padding: hp(2),
                }}>
                <Text
                  style={{
                    fontSize: FontSize.SmallText,
                    color:
                      resolveNote.length > 145 ? 'red' : colors.secondaryBg,
                  }}>
                  {resolveNote?.length}/160
                </Text>
              </View>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                onPress={closeSheet}
                style={[
                  styles.resolveButton,
                  {
                    borderColor: colors.secondaryBg,
                  },
                ]}>
                <Text style={[styles.btnText, {color: colors.secondaryBg}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <View style={{width: wp(30)}} />
              <TouchableOpacity
                onPress={handleResolve}
                style={[
                  styles.resolveButton,
                  {
                    backgroundColor: colors.secondaryBg,
                    borderColor: colors.secondaryBg,
                  },
                ]}>
                <Text style={[styles.btnText, {color: colors.light}]}>
                  Resolve
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </>
  );
});

export default Resolve;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    width: '96%',
    height: '96%',
    borderTopLeftRadius: hp(15),
    borderTopRightRadius: hp(15),
  },
  resolveTitle: {
    fontSize: FontSize.BigText,
    marginTop: hp(10),
    textAlign: 'center',
    color: colors.dark,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    padding: hp(5),
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
});
