import React, {useEffect, useState, useLayoutEffect} from "react";
import {SafeAreaView, FlatList, View, StatusBar, Platform, StyleSheet, Text, ActivityIndicator} from "react-native";
import {fetchEmtia} from "../../utils/emtiaApi";
import {EmtiaItem} from "../../components/Prices/EmtiaItem";
import COLORS from "../../utils/COLORS";
import { auth, database } from "../../utils/firebaseApi";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Emtia = () => {
    const [myData,setMyData]=useState([])
    const [favouriteData,setFavouriteData]=useState([])
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState(null)

    const [refreshing, setRefreshing] = React.useState(false);
    const [user, setUser] = useState();

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
    
    function onAuthStateChanged(user) {
        setUser(user);
    }

    useLayoutEffect(()=>{
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        fetchEmtia().then((data) => {
            setMyData(data.data.kiymetli_metal)
        },
        (error) => {
            setError(error);
        })
        if(user != null)
        {
        database.collection("users").doc(auth.currentUser.uid).get().then(doc=>{
            doc.data().emtiaFavs.forEach(item=>{
                favouriteData.push(item.fav.name)
            })
        })
        onRefresh();
        }
        return subscriber;
    },[user])
    const renderItem = ({ item }) => (
       <EmtiaItem  favouriteData={favouriteData} name={item.kiymetli_metal} price={item.son} change={item.fark} state={item.durum}/>
    );
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