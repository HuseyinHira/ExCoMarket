import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './screens/Home';
import User from './screens/User';
import Prices from './screens/Prices';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import COLORS from "./utils/COLORS";

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                // headerShown: false,
                tabBarActiveTintColor: COLORS.white,
                tabBarInactiveTintColor: COLORS.greyLight,
                tabBarStyle: { backgroundColor: COLORS.black },
                headerStyle: {
                  backgroundColor: COLORS.black,
                },
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 25,
                },
            })}>
              <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: (tabInfo) => (
                    <Ionicons
                      name="md-home"
                      size={tabInfo.focused ? 26 : 20}
                      color={COLORS.white}
                    />
                  ),
                }} />
              <Tab.Screen 
                name="Prices" 
                component={Prices}
                options={{
                  tabBarLabel: 'Prices',
                  tabBarIcon: (tabInfo) => (
                    <Ionicons
                      name="stats-chart-outline"
                      size={tabInfo.focused ? 26 : 20}
                      color={COLORS.white}
                    />
                  ),
                }}/>
              <Tab.Screen 
                name="User" 
                component={User}
                options={{
                  tabBarLabel: 'User',
                  tabBarIcon: (tabInfo) => (
                    <Ionicons
                      name="md-person-circle-outline"
                      size={tabInfo.focused ? 26 : 20}
                      color={COLORS.white}              
                    />
                  ),
                }}/>
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      );
}

export default App;