import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import onboardingData from 'src/constants/onboardingData';
import List from './components/List';
import FooterComponent from './components/FooterBtns';
import {hp, wp} from 'src/utils';
import {FONTS} from 'src/constants';
import {SCREEN_NAME} from 'src/navigation/constants';

const colors = ['#7267CB', '#AF0069', '#A85CF9', '#C6D57E'];

const Onboarding = ({navigation}: any) => {
  const {width, height} = Dimensions.get('screen');
  const ListRef = useRef(null);
  const [currentSlideIndex, setcurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNextSlide();
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  //funtion to go to the previous slide
  const goToPreviousSlide = () => {
    if (currentSlideIndex === 0) {
      return;
    }
    if (currentSlideIndex !== 0) {
      const back = currentSlideIndex - 1;
      setcurrentSlideIndex(back);
    }
  };

  //function to goto the next slide
  const goToNextSlide = () => {
    if (currentSlideIndex !== onboardingData.length - 1) {
      setcurrentSlideIndex(currentSlideIndex + 1);
    } else if (currentSlideIndex === onboardingData.length - 1) {
      // setcurrentSlideIndex(0);
      navigation.navigate(SCREEN_NAME.auth);
    }
  };

  //effect to change the index and animate the view
  useEffect(() => {
    //@ts-ignore
    ListRef?.current.scrollToIndex({index: currentSlideIndex, animate: true});
  }, [currentSlideIndex]);

  //Loading bar
  const Loader = () => {
    const ProgressAni = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.timing(ProgressAni, {
        toValue: (width - 10) / onboardingData.length,
        duration: 6000,
        useNativeDriver: false,
      }).start();
    }, [ProgressAni]);

    return (
      <Animated.Text
        style={{
          backgroundColor: '#fff',
          width: ProgressAni,
          borderRadius: 16,
        }}></Animated.Text>
    );
  };

  const LoaderBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '10%',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            width: '98%',
            marginVertical: 15,
            justifyContent: 'center',
            flex: 1,
            height: 20,
          }}>
          <View style={[styles.indicator, {justifyContent: 'center'}]}>
            {onboardingData?.map((_, i) => {
              return (
                <View
                  key={i}
                  style={[
                    styles.indicatorItem,
                    {
                      width: width / onboardingData.length - 10,
                    },
                  ]}>
                  {i === currentSlideIndex ? <Loader /> : null}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {backgroundColor: colors[currentSlideIndex]},
        ]}>
        <View style={{flex: 1}}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              zIndex: 100,
            }}>
            <TouchableOpacity
              style={{backgroundColor: '', flex: 1}}
              onPress={goToPreviousSlide}></TouchableOpacity>
            <TouchableOpacity
              style={{backgroundColor: '', flex: 1}}
              onPress={goToNextSlide}></TouchableOpacity>
          </View>
          <LoaderBar />
          <View style={styles.simpuWrapper}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.simpuIcon}
            />
            <Text style={styles.simpuText}>Welcome to Simpu</Text>
          </View>
          <FlatList
            ref={ListRef}
            initialScrollIndex={currentSlideIndex}
            onScrollToIndexFailed={() => {}}
            pagingEnabled
            contentContainerStyle={styles.ListStyle}
            data={onboardingData}
            keyExtractor={item => item.id}
            renderItem={List}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <FooterComponent navigation={navigation} />
      </View>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },

  indicator: {
    // width: '100%',

    marginTop: hp(25),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 10,
  },

  indicatorItem: {
    height: 2.5,
    // opacity: 0.7,
    backgroundColor: '#cfcfcfcf',
    marginHorizontal: 1,
    borderRadius: 15,
  },
  ListStyle: {
    // paddingHorizontal: wp(20),
  },

  simpuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  simpuIcon: {height: 22, width: 35, margin: 10},
  simpuText: {
    color: '#fff',
    fontSize: hp(20),
    fontFamily: FONTS.AVERTA_SEMI_BOLD,
  },
});
