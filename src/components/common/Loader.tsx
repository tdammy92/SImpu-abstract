import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import {StoreState} from 'src/@types/store';

const Loader = () => {
  
  const loading = useSelector((state: StoreState) => state.loader);
  

  


  const loader = () => {
    return (
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <ActivityIndicator size={'large'} color={'gray'} />
      </View>
    );
  };

  // return loading.Isloading? loader() : null;

};

export default Loader;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
