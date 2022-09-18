import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
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
//@ts-ignore
import {Bullets} from 'react-native-easy-content-loader';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import dummyData from 'src/constants/dummyData';
import SearchList from './component/SearchList';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const Search = (props: any) => {
  const navigation = useNavigation();

  const inputRef = useRef<null>(null);

  const [Data, setData] = useState(() => dummyData);
  const [searchValue, setsearchValue] = useState('');
  const [ShowSearchOptions, setsShowSearchOptions] = useState(true);
  const [searchoption, setsearchoption] = useState('');
  const [ShowSearchModal, setsShowSearchModal] = useState(false);

  //handle Input modal Close
  const closeInpuPop = () => {
    setsShowSearchModal(false);
    setsearchoption('');
    setsShowSearchOptions(true);
    //@ts-ignore
    inputRef.current.blur();

    navigation.goBack();
  };

  //handle tag selection
  const handleSelectedInput = (option: string) => {
    setsearchoption(option);
    setsShowSearchOptions(false);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      setsShowSearchOptions(false);
    } else {
      setsShowSearchOptions(true);
    }
    // return () => {};
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
              borderWidth: ShowSearchModal ? 2 : 1,
              borderColor: ShowSearchModal ? '#026AE8' : '#000',
            },
          ]}>
          {ShowSearchModal && (
            <TouchableOpacity onPress={closeInpuPop}>
              <AntDesign name="arrowleft" size={18} color="#026AE8" />
            </TouchableOpacity>
          )}

          {/* {!ShowSearchModal && (
            <EvilIcons
              name="search"
              size={25}
              color={ShowSearchModal ? '#026AE8' : 'black'}
            />
          )} */}

          {searchoption !== '' && (
            <Text style={styles.selectedPill}>{searchoption}</Text>
          )}

          <TextInput
            ref={inputRef}
            autoFocus={false}
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={'#000'}
            onFocus={() => setsShowSearchModal(true)}
            value={searchValue}
            onChangeText={text => setsearchValue(text.toLocaleLowerCase())}
          />
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
                    paddingLeft: 5,
                  }}>
                  <AntDesign name="mail" size={17} color="black" />
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
                  <View style={styles.Icontainer}>
                    <Ionicons name="people-outline" size={20} color="black" />
                    <Text style={styles.Itext}>PEOPLE</Text>
                  </View>
                  <View style={styles.scrollContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {/* @ts-ignore */}
                      {/* <Bullets active listSize={4} /> */}

                      {Data.filter(ite =>
                        ite.name.toLocaleLowerCase().includes(searchValue),
                      )
                        .reverse()
                        .map((it, i) => {
                          return <SearchList key={i} item={it} />;
                        })}
                    </ScrollView>
                  </View>
                </View>
                <Divider />
                <View style={styles.topResultContainer}>
                  <View style={styles.Icontainer}>
                    <Ionicons
                      name="newspaper-outline"
                      size={20}
                      color="black"
                    />
                    <Text style={styles.Itext}>TOP RESULT</Text>
                  </View>
                  <View style={styles.scrollContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {/* @ts-ignore */}
                      <Bullets active listSize={4} />
                    </ScrollView>
                  </View>
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
