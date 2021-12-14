import React from "react";
import COLORS from "../utils/COLORS";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoinMarket from "./Prices/CoinMarket";
import ExchangeRate from "./Prices/ExchangeRate";
import Emtia from "./Prices/Emtia";  


const Tab = createMaterialTopTabNavigator();
  
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={({ route }) => ({
              tabBarActiveTintColor: COLORS.white,
              tabBarInactiveTintColor: COLORS.greyLight,
              tabBarStyle: { backgroundColor: COLORS.black },              
            })}>
        <Tab.Screen name="Exchange Rate" component={ExchangeRate} />
        <Tab.Screen name="EMTIA" component={Emtia} />
        <Tab.Screen name="Crypto" component={CoinMarket} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}