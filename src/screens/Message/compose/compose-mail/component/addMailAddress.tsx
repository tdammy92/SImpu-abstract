import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import React, {useState, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONTS, FontSize, colors} from 'src/constants';
import {hp, messsageToast, wp} from 'src/utils';

import useDebounce from 'src/Hooks/useDebounce';
import {useSearchCustomers} from 'src/services/query/queries';
import {StoreState} from 'src/@types/store';
import {useSelector} from 'react-redux';
import ChannelIcon from 'src/components/common/ChannelIcon';

const {width, height} = Dimensions.get('screen');

const AddMail = ({
  zIndex,
  title,
  valueArr,
  setValueArr,
  placeholder,
  SelectedChannel,
  showSearchCustomer,
}: any) => {
  const {token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const textInputRef = useRef(null);
  const [sugestion, setsugestion] = useState([]);
  //   const [contact, setContact] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const debounceValue = useDebounce(value, 400);

  //search customer query
  const SearchCustomerQuery = useSearchCustomers(
    {
      searchQuery: debounceValue,
      page: 1,
      channelId: SelectedChannel?.channel_id,
      headers: {
        Auth: token,
        organisationId: organisation?.id,
      },
    },

    {
      enabled: !!debounceValue && showSearchCustomer,
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const searchCustomerResults = data?.pages
          ?.map((res: any) => res?.customers?.map((r: any) => r))
          .flat(2);

        //remove already selected recipent
        //    const filteredRecpient = searchCustomerResults?.filter(
        //      (item: any) => !valueArr?.inludes(item?.platform_nick),
        //    );
        setsugestion(searchCustomerResults);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);
      },
    },
  );

  //check if mail is added to array
  function checkExistance(recipient: string) {
    const exist = valueArr
      ?.map((item: string) => item.toLowerCase())
      .includes(recipient.toLowerCase());

    return exist;
  }

  //add typed recipent
  const handleAddRecipent = () => {
    if (checkExistance(value)) {
      messsageToast({
        message: `${value} has been added to recipient`,
        type: 'warning',
      });
      return;
    }

    Keyboard.dismiss();
    setValueArr([...valueArr, value]);
    if (textInputRef?.current) {
      //@ts-ignore
      textInputRef?.current.clear();
    }
  };

  //selected recipent from sugestions
  const handleAddFromSuggestion = (recipient: string) => {
    console.log('i got cliked');
    if (checkExistance(recipient)) {
      messsageToast({
        message: `${recipient} has been added to recipient`,
        type: 'warning',
      });
      return;
    }
    setValueArr([...valueArr, recipient]);
    setsugestion([]);
    if (textInputRef?.current) {
      //@ts-ignore
      textInputRef?.current.clear();
    }
  };
  //selected recipent from sugestions
  const handleAddFromKeyBoard = ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    console.log('eeevent', nativeEvent);

    // if (nativeEvent.key === 'done') {
    //   console.log('d key i needed');
    // }
  };

  //remove a recipent
  const removeRecipent = (recipent: string) => {
    const remaining = valueArr.filter(
      (item: string) => item.toLowerCase() !== recipent.toLowerCase(),
    );
    setValueArr(remaining);
  };

  return (
    <View style={{paddingVertical: hp(4), position: 'relative', zIndex}}>
      {/* {valueArr?.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          contentInset={{}}
          style={{
            maxHeight: hp(40),
          }}>
          {valueArr?.map((recipent: string, idx: number) => {
            return (
              <View
                key={`${idx}`}
                style={[
                  styles.selectedContactWrapper,
                  {marginLeft: idx === 0 ? wp(10) : wp(3)},
                ]}>
                <View style={{marginRight: wp(10)}}>
                  <Text
                    style={{color: colors.dark, fontSize: FontSize.MediumText}}>
                    {recipent}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeRecipent(recipent)}>
                  <AntDesign
                    name={'closecircleo'}
                    color={colors.darkGray}
                    size={hp(16)}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )} */}
      <View
        style={[
          styles.inputWrapper,
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: 'blue',
            flexWrap: 'wrap',
          }}>
          <Text style={styles.inputLabelText}>{title}:</Text>
          {valueArr?.map((recipent: string, idx: number) => {
            return (
              <View
                key={`${idx}`}
                style={[
                  styles.selectedContactWrapper,
                  {marginLeft: idx === 0 ? wp(10) : wp(3)},
                ]}>
                <View style={{marginRight: wp(10)}}>
                  <Text
                    style={{color: colors.dark, fontSize: FontSize.MediumText}}>
                    {recipent}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeRecipent(recipent)}>
                  <AntDesign
                    name={'closecircleo'}
                    color={colors.darkGray}
                    size={hp(16)}
                  />
                </TouchableOpacity>
              </View>
            );
          })}

          <TextInput
            ref={textInputRef}
            onBlur={() => {
              setsugestion([]);
              Keyboard.dismiss();
            }}
            returnKeyType="done"
            onSubmitEditing={handleAddRecipent}
            onKeyPress={handleAddFromKeyBoard}
            placeholder={valueArr.length > 0 ? '' : placeholder}
            style={[
              styles.inputStyle,

              {
                // backgroundColor: 'blue',
                // marginRight: wp(15),
                // borderColor: 'red',
                // borderWidth: 1,
              },
            ]}
            value={value}
            onChangeText={text => setValue(text)}
          />
        </View>
        {/* <TouchableOpacity
          onPress={handleAddRecipent}
          style={{
            position: 'absolute',
            right: wp(8),
            padding: hp(5),
          }}>
          <AntDesign
            name={'pluscircleo'}
            color={colors.darkGray}
            size={hp(20)}
          />
        </TouchableOpacity> */}
      </View>

      {/* {sugestion?.length > 0 && value !== '' && (
        <ScrollView
          style={{
            position: 'absolute',
            top: valueArr?.length > 0 ? hp(80) : hp(58),
            borderBottomLeftRadius: hp(15),
            borderBottomRightRadius: hp(15),
            backgroundColor: colors.light,
            right: wp(8),
            maxHeight: hp(300),
            width: width * 0.7,
          }}>
          {sugestion?.map((item: any, indx: number) => {
            return (
              <TouchableOpacity
                onPress={() => handleAddFromSuggestion(item?.platform_nick)}
                key={`${indx}`}
                style={{
                  marginVertical: hp(4),
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: wp(5),
                  paddingVertical: hp(8),
                  borderBottomWidth: 0.4,
                  borderBottomColor: colors.darkGray,
                  backgroundColor: colors.light,
                }}>
                <ChannelIcon name={item?.channel_name} />
                <Text
                  style={{
                    color: colors.dark,

                    fontSize: FontSize.MediumText,
                    marginLeft: wp(4),
                  }}>
                  {item?.platform_name ?? item?.platform_nick}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )} */}
    </View>
  );
};

export default AddMail;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: hp(60),
    paddingHorizontal: wp(10),
  },
  inputLabelText: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.BigText,
    marginRight: wp(5),
  },

  inputStyle: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'transparent',
    fontSize: FontSize.BigText,
  },

  selectedContactWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(4),
    //    width: wp(150),
    height: hp(30),
    marginVertical: hp(2),
    marginHorizontal: wp(3),
    borderRadius: hp(10),
    backgroundColor: colors.bootomHeaderBg,
    //     zIndex: 5,
    //     justifyContent: 'space-between',
  },
});
