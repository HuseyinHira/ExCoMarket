import {Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../../utils/COLORS";
import { auth, database } from "../../utils/firebaseApi";
import 'react-native-gesture-handler';
import firebase from "firebase";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const EmtiaItem=(props)=>{
    const [refreshing, setRefreshing] = React.useState(false);
    const [isFav, setIsFav] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const addFavourites = () => {
        database.collection("users").doc(auth.currentUser.uid).update({
            emtiaFavs:firebase.firestore.FieldValue.arrayUnion({fav:{
                name: props.name,
                change: props.change,
                price: props.price,
            }})
        })
        .then(setIsFav(true))
        .then(onRefresh())
    }

    if(auth.currentUser == null){
        return(
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.name}>
                    {props.name}
                    </Text>
                </View>
                <View style={styles.view2}>
                    <Text
                        style={styles.change}>
                        Fiyat: {props.price} ₺
                    </Text>
                    <View style={styles.view3}>
                        <Text
                            style={styles.trendingUpDown, {color:props.state == "yukseldi"?COLORS.green:COLORS.red}}>
                            Fark: {props.change}
                        </Text>
                    </View>
                </View>
            </View>
    )}
    else{
        return(
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Text style={styles.name}>
                    {props.name}
                    </Text>
                </View>
                <View style={styles.view2}>
                    <Text
                        style={styles.change}>
                        Fiyat: {props.price} ₺
                    </Text>
                    <View style={styles.view3}>
                        <Text
                            style={styles.trendingUpDown, {color:props.state == "yukseldi"?COLORS.green:COLORS.red}}>
                            Fark: {props.change}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={isFav ? null:addFavourites} style={styles.favourite}>
                        <Ionicons
                           name= {props.favouriteData.includes(props.name) ? "star":"star-outline"}
                           size={15}
                           color={COLORS.white}
                        />
                 </TouchableOpacity>
            </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        flexDirection:"row",
    },
    name: {
        marginLeft:8,
        fontSize:16,
        fontWeight:"bold",
        color:COLORS.white,
    },
    view1: {
        flex:8,
        flexDirection:'row',
        alignItems:'center',
    },
    view2: {
        flex:8,
        alignItems:'flex-end',
        justifyContent: 'center',
        flexDirection:"column"
    },
    view3: {
        alignItems:"center",
        justifyContent:"flex-end",
        flexDirection:"row"
    },
    change: {
        textAlign:"right",
        fontSize:12,
        fontWeight:"bold",
        color:COLORS.white,
    },
    trendingUpDown: {
        marginLeft:2,
        fontSize:12,
        fontWeight:"bold",
    },
    favourite:{
        flex: 2,
        marginLeft:"auto",
        alignItems:"center",
    }
});