import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {Divider, Text} from '@ui-kitten/components';
import React, {
  useState,
  useRef,
  forwardRef,
  memo,
  useMemo,
  useCallback,
  Fragment,
} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';
import {hp, wp} from 'src/utils';
import {updateOrganisation} from 'src/store/organisation/organisationReducer';
import {colors, FONTS} from 'src/constants';
import {StoreState} from 'src/@types/store';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {organisation} from 'src/@types/profile';

const {height} = Dimensions.get('screen');
const SheetHeight = Math.floor(height * 0.3);

const OrganisationSheet = forwardRef(
  (props: any, ref: React.ForwardedRef<any>) => {
    const dispatch = useDispatch();
    const organisations = props?.data?.data?.organisations;

    //redux store imports
    const {profile} = useSelector((state: StoreState) => state.user);
    const organisation = useSelector(
      (state: StoreState) => state.organisation.details,
    );

    //change organisaion
    const changePrganisations = (index: any) => {
      dispatch(updateOrganisation(organisations[index]));
      props.close();
    };

    return (
      //@ts-ignore
      <RBSheet
        ref={ref}
        openDuration={250}
        closeOnDragDown
        height={SheetHeight}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(105,105,105,0.7)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(255,255,255,0)',
            height: 0,
            margin: 0,
          },
          container: {
            borderTopLeftRadius: hp(10),
            borderTopRightRadius: hp(10),
          },
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor: colors.bootomHeaderBg,
          }}>
          <Text style={styles.sheetHeaderText}>Select Organisation</Text>
        </View>
        <Divider />
        <View style={{padding: 0, margin: 0, height: '100%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 15,
              paddingVertical: hp(10),
            }}
            contentInset={{bottom: hp(30)}}>
            {organisations?.map((org: any, i: any) => {
              return (
                <Fragment key={`${i}`}>
                  <TouchableOpacity
                    key={org?.name}
                    style={styles.listContainer}
                    onPress={() => changePrganisations(i)}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <UserAvatar
                        name={org?.name}
                        size={hp(25)}
                        borderRadius={!!org?.image ? hp(25) : 5}
                        src={org?.image}
                      />
                      <Text style={styles.organisationText}>{org?.name}</Text>
                    </View>

                    <View>
                      {organisation?.id === org?.id && (
                        <AntDesign name="checkcircleo" size={20} color="#000" />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Divider />
                </Fragment>
              );
            })}
          </ScrollView>
        </View>
      </RBSheet>
    );
  },
);

export default OrganisationSheet;

const styles = StyleSheet.create({
  sheetHeader: {},
  sheetHeaderText: {
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: hp(14),
    textTransform: 'uppercase',
    color: colors.dark,
  },
  listContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  organisationText: {
    marginLeft: 5,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: hp(15),
    color: colors.dark,
  },
});
