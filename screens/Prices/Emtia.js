import React, {useEffect, useState} from "react";
import {SafeAreaView, FlatList, View, StatusBar, Platform, StyleSheet, Text, ActivityIndicator} from "react-native";
import {fetchEmtia} from "../../utils/emtiaApi";
import {EmtiaItem} from "../../components/EmtiaItem";
import COLORS from "../../utils/COLORS";

const Emtia = () => {
    const [myData,setMyData]=useState([])
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState(null)
    
    useEffect(()=>{
        fetchEmtia().then((data) => {
            setMyData(data.data.kiymetli_metal)
        },
        (error) => {
            setError(error);
        })
    },[])
    const renderItem = ({ item }) => (
       <EmtiaItem name={item.kiymetli_metal} price={item.son} change={item.fark} state={item.durum}/>
    );
    const itemSeparator = () => (
        <View style={styles.itemSeparator}/>
    );

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content"/>
        {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
        <View style={styles.view}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={myData}
                renderItem={renderItem}
                ItemSeparatorComponent={itemSeparator}
                keyExtractor={item => item.kiymetli_metal}
            >
            </FlatList>
        </View>
        )}   
    </SafeAreaView>
  );
};

export default Emtia;
const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor:COLORS.black, 
        color: COLORS.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.height : 0
    },
    itemSeparator: {
        height: 1, 
        width: "100%", 
        backgroundColor: COLORS.grey, 
        marginVertical: 12,
    },
    view: {
        backgroundColor:COLORS.black, 
        padding:16,
    },
    tabBar: {
        marginTop: 5,
        marginHorizontal: 5,
        backgroundColor: COLORS.greyDark,
    },
    text: {
        color: COLORS.white,
        fontSize: 16,
    },
});