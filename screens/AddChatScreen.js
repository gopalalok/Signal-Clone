import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input,Icon, Button } from 'react-native-elements';
import { db } from '../firebase';
import * as firebase from 'firebase';

const AddChatScreen = ({navigation}) => {

    const [input, setInput] = useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
          title:'Add a new Chat',
          headerBackTitle:"Chats"
        })
    },[navigation]);

    const createChat = async()=>{
        await db.collection("chats").add({
            chatName: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(()=>{
            navigation.goBack();
        })
        .catch((error)=>alert(error));
    }

    return (
    <View style={styles.container}>
        <Input
            placeholder='Enter a chat name'
            value={input}
            onChangeText={(text)=>setInput(text)}
            leftIcon = {
                <Icon name='wechat' type='antdesign' size={24} color="green" />
            }
            onSubmitEditing = {createChat}
        />
        <Button disabled={!input || (input.trim().length) == 0 } onPress={createChat} title="Create new Chat" />
    </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})