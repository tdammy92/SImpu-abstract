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
import {Text, Input, Icon, Divider, useStyleSheet} from '@ui-kitten/components';
import ContentLoader, {Bullets} from 'react-native-easy-content-loader';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useAdvanvedSearchThreads,
  useSearchCustomers,
  useSearchThreads,
} from 'src/services/query/queries';
import {FONTS, FontSize, colors} from 'src/constants';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';
import useDebounce from 'src/Hooks/useDebounce';
import SearchThread from './component/SearchedThread';
import SearchCustomer from './component/SearchCustomer';
import {hp, wp} from 'src/utils';
import Animated, {
  FlipInXUp,
  FlipOutXUp,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import {ThreadType, customerType, filterType} from 'src/@types/inbox';
import {
  addSelectedFilter,
  removeSelectedFilter,
} from 'src/store/search/filterMessageReducer';
import {removeEmoji} from 'src/utils/string-utils/string';
import ChannelIcon from 'src/components/common/ChannelIcon';
import Customer from './component/Customer';

const getType = (
  type: filterType | null,
  value: string | null | undefined,
): any => {
  switch (type) {
    case 'Email:to':
      return {to: [value]};
    case 'Email:from':
      return {from: [value]};
    case 'Email:cc':
      return {cc: [value]};
    case 'Email:bcc':
      return {bcc: [value]};
    case 'Email:subject':
      return {subject: value};
    // case 'Recipient':
    //   return {recipeint: value};
    case 'Conversation ID':
      return {uuid: [value]};
    default:
      return {};
  }
};

const Search = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {profile, token} = useSelector((state: StoreState) => state.user);
  const organisation = useSelector(
    (state: StoreState) => state.organisation.details,
  );

  const {filterMessageType, selectedFilter} = useSelector(
    (state: StoreState) => state.filterMessageBy,
  );

  const inputRef = useRef<null>(null);

  const [searchValue, setsearchValue] = useState('');
  const [ShowSearchOptions, setsShowSearchOptions] = useState(true);
  const [ShowSearchModal, setsShowSearchModal] = useState(false);

  const [SelectedCustomer, setSelectedCustomer] = useState<customerType | null>(
    null,
  );

  //state for searched conversation
  const [AdvancedSearchedThreadData, setAdvancedSearchedThreadData] = useState(
    [],
  );
  const [searchThreadData, setSearchThreadData] = useState([]);
  const [searchCustomerData, setSearchCustomerData] = useState([]);

  const debounceValue = useDebounce(searchValue, 400);

  // console.log('dbounce value ', debounceValue);
  //handle Input modal Close
  const closeInpuPop = () => {
    setsShowSearchModal(false);

    setSelectedCustomer(null);
    dispatch(removeSelectedFilter());
    setsShowSearchOptions(true);

    setAdvancedSearchedThreadData([]);
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
  //Advanced search thread query
  const AdvancedSearchThreadQuery = useAdvanvedSearchThreads(
    {
      filterQuery: getType(
        selectedFilter,
        SelectedCustomer?.uuid || debounceValue,
      ),
      page: 1,
      headers: {
        Auth: token,
        organisationId: organisation?.id,
      },
    },

    {
      enabled: !!selectedFilter && (!!SelectedCustomer || !!debounceValue),
      onSuccess(data: any, variables: any, context: any) {
        //This snippet flattens the array
        const searchThreadsResults = data?.pages
          ?.map((res: any) => res?.threads?.map((r: any) => r))
          .flat(2);

        // console.log('1234damyy', JSON.stringify(searchThreadsResults, null, 2));

        setAdvancedSearchedThreadData(searchThreadsResults);
      },
      onError(error: any, variables: any, context: any) {
        console.log('post message error', error);
        // messsageToast({message: 'Profile updated', type: 'success'});
        //@ts-ignore
        // messsageToast({message: `${error?.message}`, type: 'danger'});
      },
    },
  );

  // function to close and reset all selected and typed in fields
  const closeSearchOption = () => {
    setsShowSearchOptions(true);
    setsearchValue('');
    setSelectedCustomer(null);
    dispatch(removeSelectedFilter());
  };

  const selectCustomer = (customer: customerType) => {
    setSelectedCustomer(customer);
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

  // console.log('filterBy', selectedFilter);

  // console.log(
  //   'Advanced search data',
  //   JSON.stringify(AdvancedSearchedThreadData, null, 2),
  // );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setsShowSearchModal(false);
      setSelectedCustomer(null);
      dispatch(removeSelectedFilter());
      setsShowSearchOptions(true);
      dispatch(removeSelectedFilter());
    });

    return unsubscribe;
  }, [navigation]);

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

          {/* slsected filter options */}
          {!!selectedFilter && (
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              style={styles.selectedPill}>
              <Text style={styles.selectedPillText}>{selectedFilter}</Text>
            </Animated.View>
          )}

          {/* Selected filter value */}
          {!!selectedFilter && !!SelectedCustomer && (
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
              style={[
                styles.selectedPill,
                {
                  backgroundColor: 'transparent',
                  borderWidth: 0.8,
                  borderColor: colors.darkGray,
                },
              ]}>
              <Text style={[styles.selectedPillText, {color: colors.dark}]}>
                {SelectedCustomer?.platform_nick ??
                  SelectedCustomer?.platform_name}
              </Text>
            </Animated.View>
          )}

          <TextInput
            ref={inputRef}
            editable={!SelectedCustomer}
            autoFocus={false}
            style={styles.input}
            placeholder={!SelectedCustomer ? 'Search...' : ''}
            placeholderTextColor={colors.darkGray}
            onFocus={() => setsShowSearchModal(true)}
            value={searchValue}
            onChangeText={text => setsearchValue(text)}
          />

          <TouchableOpacity onPress={closeSearchOption}>
            <AntDesign name="close" size={20} color={colors.dark} />
          </TouchableOpacity>
        </View>

        {/* message fillter options */}
        {ShowSearchModal && (
          <View style={styles.searchModalContainer}>
            {!selectedFilter && ShowSearchOptions && (
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
                  {filterMessageType?.map((item: filterType, index: number) => {
                    return (
                      <TouchableOpacity
                        key={`${index}`}
                        style={styles.searchPill}
                        onPress={() => dispatch(addSelectedFilter(item))}>
                        <Text style={styles.pillText}>{item}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            <Divider />

            {/* search list items */}
            {!selectedFilter && !ShowSearchOptions && (
              <View style={styles.searchBottom}>
                {/* customer search container */}
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
                    style={[styles.customerScrollContainer, {}]}
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

                {/* top result search container */}
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
                      !searchThreadData?.length && (
                        <View style={styles.emptyWrapper}>
                          <Text style={styles.emptyText}>No results found</Text>
                        </View>
                      )}
                  </ScrollView>
                </View>
              </View>
            )}

            {/* filter customer result with filter options */}
            {!(!!selectedFilter && !!SelectedCustomer) && (
              <>
                {!!selectedFilter &&
                  !SearchCustomerQuery?.isLoading &&
                  !!searchCustomerData?.length && (
                    <View>
                      <ScrollView>
                        {searchCustomerData?.map(
                          (item: customerType, i: number) => {
                            return (
                              <Customer
                                item={item}
                                selectCustomer={selectCustomer}
                                key={`${i}`}
                              />
                            );
                          },
                        )}
                      </ScrollView>
                    </View>
                  )}
              </>
            )}

            {!!selectedFilter && !!SelectedCustomer && (
              <ScrollView
                style={styles.threadScrollContainer}
                showsVerticalScrollIndicator={false}>
                {AdvancedSearchedThreadData?.map((item: any, i) => {
                  return <SearchThread key={`${i}`} item={item} index={i} />;
                })}
                {!AdvancedSearchThreadQuery?.isLoading &&
                  !AdvancedSearchedThreadData?.length && (
                    <View style={styles.emptyWrapper}>
                      <Text style={styles.emptyText}>No results found</Text>
                    </View>
                  )}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;
