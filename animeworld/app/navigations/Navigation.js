import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Animes from '../screens/Animes'
import Favorites from "../screens/Favorites";
import Search from "../screens/Search";
import TopAnimes from "../screens/TopAnimes";
import User from "../screens/User";

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                             
                <Tab.Screen name='animes' 
                    component={Animes}
                    options={{title:"Animes"}}
                />
                <Tab.Screen name='favorites' 
                    component={Favorites}
                    options={{title:"Favoritos"}}
                />
                <Tab.Screen name='search' 
                    component={Search}
                    options={{title:"Buscador"}}
                />
                <Tab.Screen name='Top-Animes' 
                    component={TopAnimes}
                    options={{title:"Top 10"}}
                />
                <Tab.Screen name='user' 
                    component={User}
                    options={{title:"Usuario"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}