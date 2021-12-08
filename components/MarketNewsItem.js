import {Text,TouchableOpacity,Image,View,Linking,StyleSheet} from "react-native";
import React from "react";
import COLORS from "../utils/COLORS";
import { OpenURLButton } from "../utils/openWebSite";

export const MarketNewsItem=(props)=>{
    return(
       <TouchableOpacity onPress={()=>OpenURLButton(props.source)} style={styles.container}>       
            <Image 
                style={styles.image}
                source={{uri: props.imageNews}}
            >
            </Image>
            <Text style={styles.text}>
               {props.nameNews}
            </Text>
       </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        flexDirection:"row",
        width:"100%",
    },
    image: {
        height:100,
        width:150
    },
    text: {
        marginLeft:8,
        marginRight:150,
        fontSize:12,
        fontWeight:"bold",
        color:COLORS.white,
    },
})