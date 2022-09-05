import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';
import {
  StyledComponentProps,
  Text,
  Input,
  Icon,
  useStyleSheet,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
// import {ScrollView} from 'react-native-gesture-handler';

const AlertIcon = (props: any) => <Icon {...props} name="search-outline" />;

const MessageHeader = (props: any) => {
  const navigation = useNavigation();

  const {openSortSheet, closeSortSheet} = props;
  const openDraw = () => navigation.dispatch(DrawerActions.openDrawer());

  const [selectedIndex, setselectedIndex] = useState(0);
  const [options, setoptions] = useState([
    'Open',
    'Archived',
    'Snoozed',
    'Trash',
    'Spam',
  ]);

  const handleSelectedIndex = (index: number) => {
    setselectedIndex(index);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={openDraw}>
        <AntDesign name="menu-fold" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.headerDetails}>
        <Text style={styles.headerTitleText}>{props?.name}</Text>
        <View style={styles.inputWrapper}>
          <Input placeholder="Search" accessoryLeft={AlertIcon} />
        </View>

        <View style={styles.sliderView}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {options.map((option, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 2,
                    paddingHorizontal: hp(15),
                  }}
                  onPress={() => handleSelectedIndex(index)}>
                  <View
                    style={{
                      borderBottomColor:
                        selectedIndex === index ? '#026AE8' : '',
                      borderBottomWidth: selectedIndex === index ? 3 : 0,
                    }}>
                    <Text style={[styles.sliderText, {}]}>{option}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#c4c4c4', 'rgba(255,255,255,0.1)']}
            style={{
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}> */}
          <TouchableOpacity
            style={{marginTop: 0, backgroundColor: ''}}
            onPress={openSortSheet}>
            <Octicons name="sort-asc" size={23} color="#000" />
          </TouchableOpacity>
          {/* </LinearGradient> */}
        </View>
      </View>
    </View>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({
  headerContainer: {
    //@ts-ignore
    marginTop: hp(StatusBar.currentHeight + 30),
    marginHorizontal: wp(20),
  },

  headerDetails: {
    marginVertical: hp(20),
  },

  headerTitleText: {
    fontSize: hp(22),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
    color: '#000',
  },
  inputWrapper: {
    marginVertical: hp(10),
  },
  sliderView: {
    flexDirection: 'row',
    //     alignItems: 'flex-start',
  },
  sliderText: {
    fontFamily: FONTS.AVERTA_REGULAR,
    fontSize: hp(18),
    paddingBottom: 5,
    color: '#000',
  },
});
