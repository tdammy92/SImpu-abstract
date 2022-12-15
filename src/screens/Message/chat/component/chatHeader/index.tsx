import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Divider, ListItem, Text} from '@ui-kitten/components';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {colors} from 'src/constants';
import {hp} from 'src/utils';
//@ts-ignore
import UserAvatar from 'react-native-user-avatar';

type chatHeaderProps = {
  imageUrl?: string;
  name: string;
  openSheet: any;
};

const ChatHeader = ({imageUrl, name, openSheet}: chatHeaderProps) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.userDetails}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              // onPress={() => navigation.navigate(SCREEN_NAME.main)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="arrow-back-sharp"
                size={22}
                color={colors.secondaryBg}
              />
              <View style={{marginLeft: 5}}>
                {/* @ts-ignore */}

                <UserAvatar
                  size={hp(40)}
                  style={{height: hp(40), width: hp(40)}}
                  borderRadius={hp(40 * 0.5)}
                  name={name}
                  src={imageUrl}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.usernameText}>{name}</Text>
          </View>
        </View>
        <TouchableOpacity style={{padding: 10}} onPress={openSheet}>
          <View style={styles.headerRight}>
            <SimpleLineIcons
              name="options-vertical"
              size={22}
              color={'#A5ACB8'}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
    </>
  );
};

export default ChatHeader;
