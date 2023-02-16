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
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  ref: RBSheetProps;
  handleReply: any;
  handleForward: any;
};

const {height, width} = Dimensions.get('screen');

const OptionSheet = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const {handleReply, handleForward} = props;

  const {profile, user, token} = useSelector(
    (state: StoreState) => state?.user,
  );
  const organisation = useSelector(
    (state: StoreState) => state?.organisation?.details,
  );

  return (
    <>
      {/* @ts-ignore */}
      <RBSheet
        ref={ref}
        height={height * 0.3}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(105,105,105,0.2)',
          },
          draggableIcon: {
            backgroundColor: colors.light,
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
        <View style={styles.container}>
          <ScrollView style={{}}>
            <TouchableOpacity
              style={styles.btnOptionWrapper}
              onPress={handleReply}>
              <MaterialCommunityIcons
                name="reply"
                color={colors.dark}
                size={hp(22)}
              />
              <Text style={styles.optionText}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOptionWrapper}
              onPress={() => {}}>
              <Entypo name="reply-all" color={colors.dark} size={hp(22)} />
              <Text style={styles.optionText}>Reply all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnOptionWrapper]}
              onPress={handleForward}>
              <Entypo name="forward" color={colors.dark} size={hp(22)} />
              <Text style={styles.optionText}>Forward</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnOptionWrapper]}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                color={'red'}
                size={hp(22)}
              />
              <Text style={[styles.optionText, {color: 'red'}]}>
                Delete Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnOptionWrapper,
                {borderBottomWidth: 0, paddingBottom: hp(15)},
              ]}>
              <MaterialCommunityIcons
                name="content-copy"
                color={colors.dark}
                size={hp(22)}
              />
              <Text style={styles.optionText}>Message Id</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </RBSheet>
    </>
  );
});

export default memo(OptionSheet);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    width: '100%',
    borderTopLeftRadius: hp(15),
    borderTopRightRadius: hp(15),
  },
  btnOptionWrapper: {
    paddingVertical: hp(10),
    borderBottomWidth: 0.8,
    borderBottomColor: colors.lightGray,
    paddingHorizontal: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: FontSize.BigText,
    color: colors.dark,
    marginLeft: hp(10),
  },
});
