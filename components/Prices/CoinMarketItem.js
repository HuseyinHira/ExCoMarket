import {Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import COLORS from "../../utils/COLORS";
import firebase from "firebase";
import 'react-native-gesture-handler';
import { auth, database } from "../../utils/firebaseApi";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const CoinMarketItem=(props)=>{
    const [refreshing, setRefreshing] = React.useState(false);
    const [isFav, setIsFav] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const addFavourites = () => {
        database.collection("users").doc(auth.currentUser.uid).update({
            coinFavs:firebase.firestore.FieldValue.arrayUnion({fav:{
                image: props.image,
                name: props.name,
                change: props.currentPriceChange,
                price: props.currentPrice,
            }})
        })
        .then(setIsFav(true))
        .then(onRefresh())
    }

    if (auth.currentUser == null){
        return(
       <View style={styles.container}>
            <View style={styles.view1}>
                <Image
                    style={styles.image}
                    source={{uri: props.image}}
                >
                </Image>
                <Text style={styles.name}>
                {props.name}
                </Text>
            </View>
            <View style={styles.view2}>
                <Text
                    style={styles.change}>
                    {props.currentPrice} ₺
                </Text>
                <View style={styles.view3}>
                    {props.currentPriceChange>0?(
                        <Ionicons
                           name="trending-up-outline"
                           size={12}
                           color={COLORS.green}
                        />
                    ):(
                        <Ionicons
                           name="trending-down-outline"
                           size={12}
                           color={COLORS.red}
                        />
                    )}
                        <Text
                            style={styles.trendingUpDown, {color:props.currentPriceChange>0?COLORS.green:COLORS.red}}>
                            {props.currentPriceChange}%
                        </Text>
                    </View>
                </View>
       </View>
    )}
    else{
        return(
            <View style={styles.container}>
                <View style={styles.view1}>
                    <Image
                        style={styles.image}
                        source={{uri: props.image}}
                    >
                    </Image>
                    <Text style={styles.name}>
                        {props.name}
                    </Text>
                </View>
                <View style={styles.view2}>
                    <Text
                         style={styles.change}>
                         {props.currentPrice} ₺
                    </Text>
                    <View style={styles.view3}>
                        {props.currentPriceChange>0?(
                            <Ionicons
                                name="trending-up-outline"
                                size={12}
                                color={COLORS.green}
                            />
                        ):(
                            <Ionicons
                                name="trending-down-outline"
                                size={12}
                                color={COLORS.red}
                            />
                        )}
                            <Text
                                style={styles.trendingUpDown, {color:props.currentPriceChange>0?COLORS.green:COLORS.red}}>
                                {props.currentPriceChange}%
                            </Text>
                    </View>
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
    },
    image: {
        height:20,
        width:20,
        backgroundColor:COLORS.white,
    },
    name: {
        marginLeft:5,
        fontSize:14,
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