import { StyleSheet, Text, View,Button } from 'react-native'
import React,{useState} from 'react'
import Modal from "react-native-modal";

const AppModal = ({showModal,message}:any) => {
    // const [isModalVisible, setModalVisible] = useState(false);


  return (
    <Modal isVisible={showModal} animationIn='slideInUp'>
    <View style={{ flex: 1 }}>
      <Text>{message}</Text>

      <Button title="Cancel" onPress={showModal} />
     
    </View>
  </Modal>
  )
}

export default AppModal

const styles = StyleSheet.create({})