import React, {useState, useLayoutEffect} from "react";
import {SafeAreaView, FlatList, View, StatusBar, Platform, StyleSheet, Text} from "react-native";
import {fetchExchangeRate} from "../../utils/exchangeRateApi";
import {ExchangeRateItem} from "../../components/Prices/ExchangeRateItem"
import { auth, database } from "../../utils/firebaseApi";
import COLORS from "../../utils/COLORS";

const ExchangeRate = () =>{
    const [myData,setMyData]=useState([])
    const [error,setError]=useState(null)
    const [loading, setLoading] = useState(false)
    const [favouriteData,setFavouriteData]=useState([])

    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
    }

    useLayoutEffect(()=>{
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        fetchExchangeRate().then((data) => {
            setMyData(data.TCMB_AnlikKurBilgileri)
        },
        (error) => {
            setError(error);
        })
        if(user != null)
        {
        database.collection("users").doc(user.uid).get().then(doc=>{
            doc.data().exchangeFavs.forEach(item=>{
                console.log(item);
                favouriteData.push(item.fav.name)
            })
        })
        }
        return subscriber;
    },[user]);

    const renderItem = ({ item }) => {
        if(item.BanknoteBuying.toString()!=""){
            return(
                <ExchangeRateItem favouriteData={favouriteData} name={item.Isim} buyRate={item.BanknoteBuying} sellRate={item.BanknoteSelling}/>
            )
        }
        else{
            return(
            <ExchangeRateItem favouriteData={favouriteData} name={item.Isim} buyRate={item.ForexBuying} sellRate={item.ForexSelling}/>
            )
        }
    }
    
    const itemSeparator = () => (
        <View style={styles.itemSeparator}/>
    );

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content"/>
        {loading ? (
          <ActivityIndicator
            visible={loading}
            textContent={'Loading...'}
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