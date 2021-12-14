import React, {useState, useEffect} from "react";
import { Text, SafeAreaView, View, StyleSheet, KeyboardAvoidingView, TextInput} from "react-native";
import Home from "./Home"
import { TouchableOpacity } from "react-native-gesture-handler";
import COLORS from "../utils/COLORS";
import { auth, database } from "../utils/firebaseApi";
import 'react-native-gesture-handler';

const User = () =>{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoggedIn, setIsLoggedIn] = React.useState(null);

  const onAuthStateChanged = (user) => {
    setIsLoggedIn(user);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, [])


  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      database.collection("users").doc(authUser.user.uid).set({
          userId: authUser.user.uid,
          emtiaFavs: [],
          exchangeFavs: [],
          coinFavs: [],
      })     
  })
  .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
    })
    .catch(error => alert(error.message))
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .catch(error => alert(error.message))
  }


  if (isLoggedIn === null){
    return (
      <SafeAreaView style={styles.container} >
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.inputContainer}>
            <TextInput placeholder="E-Mail" style={styles.input} value={email} onChangeText={text => setEmail(text)}/>
            <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text styles={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={[styles.button,styles.buttonOutline]}>
              <Text styles={[styles.buttonText, styles.buttonOutlineText]}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );}else{
    return(
      <View style={styles.container}>
        <Text style={styles.text}>E-Mail: {auth.currentUser?.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    )
  }
};
  
export default User;

const styles = StyleSheet.create({
  scroll: {
    flex:1,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 200,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.greyLight,
    width: 200,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: COLORS.greyLight,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: COLORS.white,
    fontSize: 16,
    marginTop: 5,
  },
})