import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import React, {forwardRef} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {hp, wp} from 'src/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider, Text} from '@ui-kitten/components';
import {colors, FONTS} from 'src/constants';

type Props = {
  ref: RBSheetProps;
};

const {height} = Dimensions.get('screen');
const HeaderOption = forwardRef(
  (props: Props, ref: React.ForwardedRef<any>) => {
    return (
      //@ts-ignore
      <RBSheet
        ref={ref}
        height={height / 2.5}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(105,105,105,0.7)',
          },
          draggableIcon: {
            backgroundColor: '#E5E4E2',
            // backgroundColor: '#276EF1',
          },
          container: {
            borderTopLeftRadius: hp(30),
            borderTopRightRadius: hp(30),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E5E4E2',
            padding: 0,
          },
        }}>
        <View style={styles.container}>
          <View style={styles.gridConatiner}>
            <TouchableOpacity style={styles.boxContainer}>
              <MaterialCommunityIcons
                name="note-text-outline"
                size={23}
                color="#000"
              />
              <Text style={styles.opionText}>Add note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxContainer}>
              <MaterialCommunityIcons
                name="arrow-right-bold-outline"
                size={23}
                color="#000"
              />
              <Text style={styles.opionText}>Move to</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxContainer}>
              <MaterialCommunityIcons
                name="alarm-snooze"
                size={23}
                color="#000"
              />
              <Text style={styles.opionText}>Snooze</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boxContainer}>
              <AntDesign name="tagso" size={23} color="#000" />
              <Text style={styles.opionText}>Tags</Text>
            </TouchableOpacity>
          </View>
          <Divider style={{height: 2}} />
          <View style={styles.ListContainer}>
            <TouchableOpacity style={styles.ListBox}>
              <AntDesign name="mail" size={23} color="#000" />
              <Text style={styles.optionListText}>Mark as unread</Text>
            </TouchableOpacity>
            <Divider style={{height: 2}} />
            <TouchableOpacity style={styles.ListBox}>
              <MaterialIcons name="content-copy" size={23} color="#000" />
              <Text style={styles.optionListText}>Copy conversation Id</Text>
            </TouchableOpacity>
            <Divider style={{height: 2}} />
            <TouchableOpacity style={styles.ListBox}>
              <MaterialIcons name="link" size={23} color="#000" />
              <Text style={styles.optionListText}>Copy conversation link</Text>
            </TouchableOpacity>
            <Divider style={{height: 2}} />
            <TouchableOpacity style={styles.ListBox}>
              <MaterialCommunityIcons
                name="information-outline"
                size={23}
                color="#000"
              />
              <Text style={styles.optionListText}>
                View conversation details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    );
  },
);

export default HeaderOption;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '96%',
    height: '96%',
    borderRadius: 15,
  },
  gridConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp(10),
  },
  ListContainer: {
    paddingHorizontal: hp(20),
  },
  ListBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  boxContainer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opionText: {
    textAlign: 'justify',
    paddingTop: hp(5),
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(16),
    color: colors.primaryText,
  },
  optionListText: {
    marginLeft: hp(8),
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(16),
    color: colors.primaryText,
  },
});
