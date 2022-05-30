import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase';
import moment from 'moment';

const CustomListItem = ({id, chatName, enterChat}) => {

    const [chatMessages, setChatMessages] = useState([]);
    
    useEffect(()=>{
        const unsubscribe = db.collection("chats").doc(id)
                            .collection("messages")
                            .orderBy("timestamp","desc")
                            .onSnapshot((snapshot)=>
                            setChatMessages(
                                snapshot.docs.map((doc)=>doc.data())
                            ));
    })

    return (
    <View style={{position:"relative"}}>
        
        <ListItem onPress={()=>enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||"https://i.postimg.cc/50rVbF5h/order-food.jpg"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:'800'}}>
                    {chatName}
                </ListItem.Title>
                       
            </ListItem.Content>
        </ListItem>
        <View style={{position:'absolute',paddingTop:40, paddingLeft:50, width:"100%"}}>
            {
                chatMessages?.[0]?(
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                            <Text>   {chatMessages?.[0]?.displayName+" : "}{chatMessages?.[0]?.message}</Text> 
                        </View>
                                
                                    
                            
                        <View style={{paddingRight:10}}>
                            <Text>
                                {chatMessages?.[0]?.timestamp?moment(chatMessages[0].message.timestamp).format('LT'):"..."}
                            </Text>
                        </View>    
                    </View>              
                                
                ):(
                    <Text></Text>
                )
            }
        </View>

    </View>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})