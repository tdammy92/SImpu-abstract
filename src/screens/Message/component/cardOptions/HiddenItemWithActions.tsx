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
    onArchive,
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
      <TouchableOpacity onPress={onArchive}>
        <Animated.View
          style={[
            styles.sides,
            {
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 7,
              transform: [
                {
                  scale: swipeAnimatedValue.interpolate({
                    inputRange: [45, 90],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          <MaterialCommunityIcons name="archive" size={30} color="#3CCF4E" />
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTS.AVERTA_REGULAR,
              color: '#3CCF4E',
            }}>
            Archive
          </Text>
        </Animated.View>
      </TouchableOpacity>

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
                // styles.sides,
                {
                  marginRight: 7,
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
                size={30}
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
    backgroundColor: '#fff',
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
    width: 45,
  },
});
