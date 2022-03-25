import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AnimesStack from "./AnimesStack";
import FavoritesStack from "./FavoritesStack";
import SearchStack from "./SearchStack";
import TopAnimesStack from "./TopAnimeStack";
import UserStack from "./UserStack";
//import Animes from '../screens/Animes'
//import Favorites from "../screens/Favorites";
//import Search from "../screens/Search";
//import TopAnimes from "../screens/TopAnimes";
//import User from "../screens/User";

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                             
                <Tab.Screen name='animes' 
                    component={AnimesStack}
                    options={{title:"Animes"}}
                />
                <Tab.Screen name='favorites' 
                    component={FavoritesStack}
                    options={{title:"Favoritos"}}
                />
                <Tab.Screen name='search' 
                    component={SearchStack}
                    options={{title:"Buscador"}}
                />
                <Tab.Screen name='Top-Animes' 
                    component={TopAnimesStack}
                    options={{title:"Top 10"}}
                />
                <Tab.Screen name='user' 
                    component={UserStack}
                    options={{title:"Usuario"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}