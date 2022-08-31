import {StyleSheet, View, TextInput, Pressable} from 'react-native';
import {Text} from '@ui-kitten/components';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';
import React, {useState, useEffect, forwardRef} from 'react';
import {hp, wp} from 'src/utils';
import FONTS from 'src/constants/fonts';
import {globalStyles} from 'src/styles';


type Props = {
  ref: RBSheetProps;
  closeSheet:any;
  saveReples:any;
  EditReply?:any;
};

const AddReply = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {



  
  const [quickReplies, setquickReplies] = useState({title: '', message: ''});
  
  
  useEffect(() => {
  const res = props.EditReply
  console.log(res);

}, [])



  return (
    <RBSheet
      ref={ref}
      height={700}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
        },
      }}>
      <View style={styles.Container}>
        <View style={styles.actionBtn}>
          <Pressable onPress={props.closeSheet}>
            <Text style={styles.actionBtnText}>Cancel</Text>
          </Pressable>
          <Pressable onPress={() => props.saveReples(quickReplies)}>
            <Text style={styles.actionBtnText}>Save</Text>
          </Pressable>
        </View>
       { <View style={styles.header}>
          <Text style={styles.headerText1}>Create a quick reply</Text>
          <Text style={styles.headerText2}>
            Save a message you send often for later.
          </Text>
        </View>}

        <View style={styles.formContainer}>
          <View style={globalStyles.addedBorder}>
            <View  style={styles.inputContainer}>
              <Text  style={styles.textLabel}>Name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text)=>setquickReplies((prev)=>({...prev,title:text}))}
                value={quickReplies.title}
              />
            </View>
          </View>
          <View style={globalStyles.addedBorder}>
            <View  style={styles.inputContainer}>
              <Text  style={styles.textLabel}>Quick Reply:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text)=>setquickReplies((prev)=>({...prev,message:text}))}
                value={quickReplies.message}
              />
            </View>
          </View>
        </View>
      </View>
    </RBSheet>
  );
});

export default AddReply;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: '100%',
  },
  actionBtn: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  actionBtnText: {
    fontFamily: FONTS.PRO_REGULAR,
    fontSize: hp(17),
    color: '#276EF1',
    fontWeight: 'bold',
  },

  header: {
    paddingHorizontal: 15,
    marginTop: hp(25),
  },

  headerText1: {
    fontSize: hp(24),
    fontWeight: 'bold',
    color: '#191A1A',
  },
  headerText2: {
    paddingTop: hp(10),
    fontSize: hp(17),
    color: 'rgba(60, 60, 67, 0.6)',
    fontWeight: '400',
  },
  formContainer: {},
  inputContainer:{
    flexDirection:'row',
    paddingBottom:10,
    paddingHorizontal: 15,
    marginTop: hp(25),

    alignItems:'center',
  },

  textLabel:{},
  textInput: {
    fontSize:hp(17),
    color:'rgba(60, 60, 67, 0.6)',
    fontFamily:FONTS.PRO_REGULAR,
    flex:1,
    // borderColor:'red',
    // borderWidth:1,
    textAlign:'left',
    

  },

});
