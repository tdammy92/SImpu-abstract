import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {hp, wp} from 'src/utils';
import SidepanelIcon from 'src/assets/images/SidepanelIcon.svg';
import {FONTS, FontSize, colors} from 'src/constants';
const {width} = Dimensions.get('window');

type Props = {
  name: string;
  HandlePress?: any;
};
const SmallHeader = ({name, HandlePress}: Props) => {
  const navigation = useNavigation();

  const openDraw = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDraw} style={{}}>
        <SidepanelIcon height={hp(38)} width={hp(35)} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{name}</Text>
    </View>
  );
};

export default SmallHeader;

const styles = StyleSheet.create({
  container: {
    width: width,
    //@ts-ignore
    paddingTop: StatusBar?.currentHeight * 2,
    flexDirection: 'row',
    //     justifyContent: 'center',
    paddingHorizontal: wp(15),
    paddingBottom: hp(10),
  },

  titleText: {
    fontSize: FontSize.subHeadingText,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    color: colors.dark,
    marginLeft: wp(30),
    alignSelf: 'center',
  },
});
