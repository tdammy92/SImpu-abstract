import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  useNavigation,
  Route,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';
import {DrawerItem} from '@react-navigation/drawer';
//@ts-ignore
import {Bullets} from 'react-native-easy-content-loader';
import TagIcon from 'src/assets/images/TagIcon.svg';
import PendingAvailble from 'src/assets/images/GrayNotification.svg';
import {colors, FONTS, FontSize} from 'src/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SCREEN_NAME} from '../constants';
import {toggleAnmiation} from './Animation';
import {formatNumbers, hp} from 'src/utils';

const Accordion = ({
  data,
  title,
  count,
  open,
  threadType,
  showLoader,
  route,
}: any) => {
  const navigation = useNavigation();
  const [show, setshow] = useState(open);
  const animationRef = useRef(new Animated.Value(0)).current;

  const toggleList = () => {
    const config = {
      duration: 300,
      toValue: show ? 0 : 1,
      useNativeDriver: true,
    };

    Animated.timing(animationRef, config).start();
    LayoutAnimation.configureNext(toggleAnmiation);
    setshow(!show);
  };
  const rotateArrow = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={[styles.accordionContainer]}>
      {/* accordion header */}
      <TouchableOpacity
        style={styles.accordionHeaderContainer}
        onPress={toggleList}>
        {/* <Animated.View style={{transform: [{rotateZ: rotateArrow}]}}> */}
        <AntDesign name={!show ? 'right' : 'down'} size={16} color={'gray'} />
        {/* </Animated.View> */}
        <Text style={styles.accordionHeaderText}>{title}</Text>
      </TouchableOpacity>
      {/* accordion body */}
      {show && (
        <>
          {!showLoader ? (
            <View style={styles.accordionBodyContainer}>
              {data?.map((item: any, i: any) => {
                return (
                  <DrawerItem
                    key={`${i}`}
                    label={({color, focused}) => {
                      return (
                        <View style={[styles.customInboxItemList]}>
                          {threadType === 'tag' && (
                            <TagIcon
                              width={15}
                              height={15}
                              color={item?.color ?? '#A5ABB3'}
                            />
                          )}

                          {threadType === 'inbox' && (
                            <PendingAvailble
                              width={10}
                              height={10}
                              color={item?.color ?? '#A5ABB3'}
                            />
                          )}

                          <Text style={styles.customInboxtext}>
                            {item?.name}
                          </Text>
                          <Text style={styles.badgeText}>
                            {count?.inboxes[item?.uuid] > 0 &&
                              formatNumbers(count?.inboxes[item?.uuid])}
                          </Text>
                        </View>
                      );
                    }}
                    onPress={() =>
                      //@ts-ignore
                      navigation.navigate(SCREEN_NAME.teaminbox, {
                        menuName: item?.name,
                        threadType: threadType,
                        threadId: item?.uuid,
                      })
                    }
                  />
                );
              })}
            </View>
          ) : (
            //  @ts-ignore
            <Bullets active listSize={2} />
          )}
        </>
      )}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  accordionContainer: {flex: 1, width: '100%', overflow: 'hidden'},
  accordionHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  accordionBodyContainer: {
    width: '100%',
  },
  accordionHeaderText: {
    color: colors.dark,
    fontFamily: FONTS.TEXT_SEMI_BOLD,
    fontSize: FontSize.BigText,
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  customInboxItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },

  customInboxtext: {
    marginLeft: 5,
    fontSize: FontSize.BigText,
    fontFamily: FONTS.TEXT_REGULAR,
    color: colors.dark,
  },

  badgeText: {
    fontFamily: FONTS.TEXT_REGULAR,
    fontSize: FontSize.MediumText,
    color: colors.secondaryBg,
    position: 'absolute',
    right: -20,
  },
});
