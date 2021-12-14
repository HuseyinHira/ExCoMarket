import {Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../../utils/COLORS";
import { Ionicons } from '@expo/vector-icons';
import firebase from "firebase";
import 'react-native-gesture-handler';
import { auth, database } from "../../utils/firebaseApi";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ExchangeRateItem=(props)=>{

    const [refreshing, setRefreshing] = React.useState(false);
    const [isFav, setIsFav] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const addFavourites = () => {
        database.collection("users").doc(auth.currentUser.uid).update({
            exchangeFavs:firebase.firestore.FieldValue.arrayUnion({fav:{
                name: props.name,
                sellRate: props.sellRate,
                buyRate: props.buyRate,
            }})
        })
        .then(setIsFav(true))
        .then(onRefresh())
    }

    if (auth.currentUser == null){
        return(
            <View style={styles.container}>
                <Text style={styles.name}>
                {props.name}
                </Text>
                <View style={styles.view1}>
                    <Text
                        style={styles.change}>
                        Satış: {props.sellRate} ₺
                    </Text>
                    <Text
                        style={styles.change}>
                        Alış: {props.buyRate} ₺
                    </Text>
                </View>
            </View>
    )}
    else{
        return(
            <View style={styles.container}>
                 <Text style={styles.name}>
                    {props.name}
                 </Text>
                 <View style={styles.view1}>
                     <Text
                         style={styles.change}>
                         Satış: {props.sellRate} ₺
                     </Text>
                     <Text
                         style={styles.change}>
                         Alış: {props.buyRate} ₺
                     </Text>
                 </View>
                 <TouchableOpacity onPress={isFav ? null:addFavourites} style={styles.favourite}>
                        <Ionicons
                           name={props.favouriteData.includes(props.name) ? "star":"star-outline"}
                           size={15}
                           color={COLORS.white}
                        />
                 </TouchableOpacity>
            </View>
         )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        flexDirection:"row",
        flex: 1,
    },
    name: {
        marginLeft:8,
        fontSize:14,
        fontWeight:"bold",
        color:COLORS.white,
        flex: 8,
    },
    view1: {
        marginLeft:"auto",
        flexDirection:"column",
        flex: 8,
    },
    change: {
        textAlign:"right",
        fontSize:12,
        fontWeight:"bold",
        color:COLORS.white,
    },
    favourite:{
        flex: 2,
        marginLeft:"auto",
        alignItems:"center",
    }
});