import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Animes from '../screens/Animes'

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                             
                <Tab.Screen name='animes' 
                    component={Animes}
                    options={{title:"Animes"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}