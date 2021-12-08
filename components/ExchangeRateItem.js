import {Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../utils/COLORS";
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../utils/firebaseApi";

export const ExchangeRateItem=(props)=>{
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
                 <TouchableOpacity style={styles.favourite}>
                        <Ionicons
                           name="star-outline"
                           size={12}
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
        flex: 1,
        marginLeft:"auto",
        alignItems:"center",
    }
});