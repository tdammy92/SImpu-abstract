import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, {forwardRef} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from 'src/constants/theme';


type Props = {
  Snap: (event: GestureResponderEvent) => void;
  Gallery: (event: GestureResponderEvent) => void;
  ref: RBSheetProps;
};

const ImagePicker = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  return (
    <RBSheet
      ref={ref}
      height={200}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: theme.primaryBg,
        },
      }}>
      <View style={styles.contentContainer}>
        <Text style={{color: 'white',textAlign:'center',fontSize:18,fontWeight:'400',paddingTop:10}}>Profile Photo</Text>

        <View  style={styles.IconWrapper}>
          <TouchableOpacity onPress={props.Snap}>
            <View style={styles.itemWrapper}>
              <Entypo name="camera" size={40} color={'white'} />
              <Text style={styles.TextLabel}>Camera</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={props.Gallery}>
            <View style={styles.itemWrapper}>
              <MaterialIcons name="perm-media" size={40} color={'white'} />
              <Text style={styles.TextLabel}>Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </RBSheet>
  );
});

export default ImagePicker;

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: '90%',
    flexDirection:'column'
  },
  IconWrapper:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  itemWrapper: {
    flexDirection: 'column',
  },

  TextLabel: {
    color: 'white',
    textAlign: 'justify',
  },
});
