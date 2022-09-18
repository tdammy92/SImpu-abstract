import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
import {StyledComponentProps, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONTS} from 'src/constants';

const HiddenItemWithActions = (props: any) => {
  const {
    swipeAnimatedValue,
    leftActionActivated,
    rightActionActivated,
    rowActionAnimatedValue,
    rowHeightAnimatedValue,
    onClose,
    onDelete,
  } = props;

  if (rightActionActivated) {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 500,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 75,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View style={[styles.rowBack, {height: rowHeightAnimatedValue}]}>
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.sides,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <MaterialCommunityIcons name="archive" size={28} color="#6BCB77" />
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTS.AVERTA_REGULAR,
              color: '#6BCB77',
            }}>
            Archive
          </Text>
        </Animated.View>
      </TouchableOpacity>
      {/* {!leftActionActivated && (
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={onClose}>
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={28}
            style={styles.trash}
            color="#fff"
          />
        </TouchableOpacity>
      )} */}
      {!leftActionActivated && (
        <Animated.View
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            {
              // flex: 1,
              width: rowActionAnimatedValue,
            },
          ]}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={onDelete}>
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-90, -45],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={28}
                color="#FF4848"
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONTS.AVERTA_REGULAR,
                  color: '#FF4848',
                }}>
                Delete
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default HiddenItemWithActions;

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#276EF1',
    right: 75,
  },
  backRightBtnRight: {
    // backgroundColor: '#FF4848',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 40,
    marginRight: 7,
  },
  sides: {
    height: 25,
    width: 40,
    // marginRight: 7,
  },
});
