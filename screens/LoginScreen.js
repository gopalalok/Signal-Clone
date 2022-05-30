import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("Home");
            }
        })

        return unsubscribe;
    },[]);

    const signIn = ()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error)=>alert(error));
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style='light' />
        <Image
            source={{
                uri:"https://i.postimg.cc/m2FMRYZh/Signal.png"
            }}
            style={{width:200,height:200}}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    autoFocus
                    type="password"
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    onSubmitEditing = {signIn}
                />

                
            </View>
            <Button containerStyle={styles.button}  title="Login" onPress={signIn}/>
            <Button onPress={()=>navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register" />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:'white',
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,
    }
})