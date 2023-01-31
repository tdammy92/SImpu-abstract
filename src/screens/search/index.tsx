import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  StyledComponentProps,
  Text,
  Input,
  Icon,
  Divider,
  useStyleSheet,
} from '@ui-kitten/components';
import ContentLoader, {Bullets} from 'react-native-easy-content-loader';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useSearchCustomers, useSearchThreads} from 'src/services/query/queries';
import {colors} from 'src/constants';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import useDebounce from 'src/Hooks/useDebounce';
import SearchThread from './component/SearchedThread';
import SearchCustomer from './component/SearchCustomer';
import {hp, wp} from 'src/utils';
import Animated, {FlipInXUp, FlipOutXUp} from 'react-native-reanimated';

const Search = (props: any) => {
  const navigation = useNavigation();
  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const inputRef = useRef<null>(null);

  const [searchValue, setsearchValue] = useState('');
  const [ShowSearchOptions, setsShowSearchOptions] = useState(true);
  const [searchoption, setsearchoption] = useState('');
  const [ShowSearchModal, setsShowSearchModal] = useState(false);

  //state for searched conversation
  const [searchThreadData, setSearchThreadData] = useState([]);
  const [searchCustomerData, setSearchCustomerData] = useState([]);

  const debounceValue = useDebounce(searchValue, 400);

  // console.log('dbounce value ', debounceValue);
  //handle Input modal Close
  const closeInpuPop = () => {
    setsShowSearchModal(false);
    setsearchoption('');
    setsShowSearchOptions(true);
    //@ts-ignore
    inputRef.current.blur();

    navigation.goBack();
  };

  /**
   *
   * @param option
   * query calls
   */

  //search customer query
  const SearchCustomerQuery = useSearchCustomers(
    {
      searchQuery: debounceValue,
      page: 1,
      headers: {
        Auth: token,
        organisationId: organisation?.id,
      },
    },

    {
      enabled: !!debounceValue,
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const searchCustomerResults = data?.pages
          ?.map((res: any) => res?.customers?.map((r: any) => r))
          .flat(2);
        setSearchCustomerData(searchCustomerResults);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);

        //@ts-ignore
        // messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

  //search thread query
  const SearchThreadQuery = useSearchThreads(
    {
      searchQuery: debounceValue,
      page: 1,
      headers: {
        Auth: token,
        organisationId: organisation?.id,
      },
    },

    {
      enabled: !!debounceValue,
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const searchThreadsResults = data?.pages
          ?.map((res: any) => res?.threads?.map((r: any) => r))
          .flat(2);

        setSearchThreadData(searchThreadsResults);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);
        // messsageToast({message: 'Profile updated', type: 'success'});
        //@ts-ignore
        // messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

  //handle tag selection
  const handleSelectedInput = (option: string) => {
    setsearchoption(option);
    // setsShowSearchOptions(false);
  };

  const closeSearchOption = () => {
    setsearchoption('');
    setsShowSearchOptions(true);
    setsearchValue('');
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      setsShowSearchOptions(false);
    } else {
      setsShowSearchOptions(true);
    }
  }, [searchValue]);

  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 15, marginTop: 15}}>
        <View
          style={[
            styles.inputWrapper,
            {
              borderWidth: ShowSearchModal ? 1 : 0,
              borderColor: ShowSearchModal ? colors.dark : colors.lightGray,
            },
          ]}>
          {ShowSearchModal && (
            <TouchableOpacity style={{padding: 4}} onPress={closeInpuPop}>
              <AntDesign name="arrowleft" size={22} color={colors.dark} />
            </TouchableOpacity>
          )}

          {searchoption !== '' && (
            <Animated.View
              entering={FlipInXUp}
              exiting={FlipOutXUp}
              style={styles.selectedPill}>
              <Text style={styles.selectedPillText}>{searchoption}</Text>
            </Animated.View>
          )}

          <TextInput
            ref={inputRef}
            autoFocus={false}
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor={colors.darkGray}
            onFocus={() => setsShowSearchModal(true)}
            value={searchValue}
            onChangeText={text => setsearchValue(text.toLocaleLowerCase())}
          />

          <TouchableOpacity onPress={closeSearchOption}>
            <AntDesign name="close" size={20} color={colors.dark} />
          </TouchableOpacity>
        </View>

        {/* message fillter options */}
        {ShowSearchModal && (
          <View style={styles.searchModalContainer}>
            {ShowSearchOptions && (
              <View style={styles.searchTop}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: wp(4),
                  }}>
                  <AntDesign name="mail" size={hp(20)} color="black" />
                  <Text style={styles.pillHeaderText}>SEARCH FOR:</Text>
                </View>

                <View style={styles.pillContainer}>
                  <TouchableOpacity
                    style={styles.searchPill}
                    onPress={() => handleSelectedInput('Email:to')}>
                    <Text style={styles.pillText}>Email:to</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.searchPill}
                    onPress={() => handleSelectedInput('Email:cc')}>
                    <Text style={styles.pillText}>Email:cc</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.searchPill}
                    onPress={() => handleSelectedInput('Email:bcc')}>
                    <Text style={styles.pillText}>Email:bcc</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.searchPill}
                    onPress={() => handleSelectedInput('Emai:subject')}>
                    <Text style={styles.pillText}>Email:subject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.searchPill}
                    onPress={() => handleSelectedInput('Converstaion ID')}>
                    <Text style={styles.pillText}>Conversation ID</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <Divider />

            {/* search list items */}
            {!ShowSearchOptions && (
              <View style={styles.searchBottom}>
                <View style={styles.peopleContainer}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.titleConatiner}>
                      <Ionicons
                        name="people-outline"
                        size={20}
                        color={colors.darkGray}
                      />
                      <Text style={styles.Itext}>PEOPLE</Text>
                    </View>
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={colors.darkGray}
                    />
                  </View>

                  <ScrollView
                    horizontal
                    style={[styles.customerScrollContainer, ,]}
                    showsHorizontalScrollIndicator={false}>
                    {SearchCustomerQuery?.isLoading
                      ? Array(3)
                          .fill(1)
                          .map((_, i) => (
                            <React.Fragment key={`${i}`}>
                              {/* @ts-ignore */}
                              <ContentLoader
                                containerStyles={{
                                  width: 'auto',
                                  borderWidth: 0.7,
                                  borderColor: colors.lightGray,
                                  marginLeft: wp(5),
                                  height: hp(60),
                                  borderRadius: hp(10),
                                  alignItems: 'center',
                                }}
                                loading={true}
                                avatar
                                aSize={30}
                                title={false}
                                pRows={2}
                                pHeight={[8, 10]}
                                pWidth={[80, 100]}
                              />
                            </React.Fragment>
                          ))
                      : searchCustomerData?.map((item, i) => {
                          return (
                            <SearchCustomer
                              key={i}
                              item={item}
                              idx={i}
                              lt={searchCustomerData?.length}
                            />
                          );
                        })}

                    {!SearchCustomerQuery?.isLoading &&
                      searchCustomerData?.length === 0 && (
                        <View
                          style={[styles.emptyWrapper, {marginLeft: wp(10)}]}>
                          <Text style={styles.emptyText}>No results found</Text>
                        </View>
                      )}
                  </ScrollView>
                </View>
                <Divider />
                <View style={styles.topResultContainer}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.titleConatiner}>
                      <Ionicons
                        name="newspaper-outline"
                        size={20}
                        color={colors.darkGray}
                      />
                      <Text style={styles.Itext}>TOP RESULT</Text>
                    </View>
                    <Ionicons
                      name="arrow-down"
                      size={20}
                      color={colors.darkGray}
                    />
                  </View>

                  <ScrollView
                    style={styles.threadScrollContainer}
                    showsVerticalScrollIndicator={false}>
                    {SearchThreadQuery?.isLoading ? (
                      // @ts-ignore
                      <Bullets active listSize={3} />
                    ) : (
                      searchThreadData?.map((item, i) => {
                        return (
                          <SearchThread
                            key={i}
                            item={item}
                            idx={i}
                            lt={searchThreadData?.length}
                          />
                        );
                      })
                    )}
                    {!SearchThreadQuery?.isLoading &&
                      searchThreadData?.length === 0 && (
                        <View style={styles.emptyWrapper}>
                          <Text style={styles.emptyText}>No results found</Text>
                        </View>
                      )}
                  </ScrollView>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;
