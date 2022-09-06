import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {KeyboardAwareScrollView} from 'src/components/common/KeyBoardAvoidingView';
import {SafeAreaView} from 'src/components/common/SafeAreaView';
import styles from './styles';
import {colors} from 'src/constants';

const Chat = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-sharp"
                size={22}
                color={colors.primaryText}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity>
              <SimpleLineIcons
                name="options-vertical"
                size={22}
                color={colors.primaryText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
