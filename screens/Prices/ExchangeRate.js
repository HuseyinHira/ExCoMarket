import React, {useEffect, useState} from "react";
import {SafeAreaView, FlatList, View, StatusBar, Platform, StyleSheet, Text} from "react-native";
import {fetchExchangeRate} from "../../utils/exchangeRateApi";
import {ExchangeRateItem} from "../../components/ExchangeRateItem"
import COLORS from "../../utils/COLORS";

const ExchangeRate = () =>{
    const [myData,setMyData]=useState([])
    const [error,setError]=useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
      fetchExchangeRate().then((data) => {
            setMyData(data.TCMB_AnlikKurBilgileri)
        },
        (error) => {
            setError(error);
        })
    },[])
    const renderItem = ({ item }) => (
       <ExchangeRateItem name={item.Isim} buyRate={item.BanknoteBuying} sellRate={item.BanknoteSelling}/>
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
                keyExtractor={item => item.CurrencyName}
            >
            </FlatList>
        </View>
        )}     
    </SafeAreaView>
  );
};

export default ExchangeRate;
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