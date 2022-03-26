import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements'

import AnimesStack from "./AnimesStack";
import FavoritesStack from "./FavoritesStack";
import SearchStack from "./SearchStack";
import TopAnimesStack from "./TopAnimeStack";
import UserStack from "./UserStack";
import TiendaStack from "./TiendaStack";
import GenerosStack from "./GenerosStack";
//import Animes from '../screens/Animes'
//import Favorites from "../screens/Favorites";
//import Search from "../screens/Search";
//import TopAnimes from "../screens/TopAnimes";
//import User from "../screens/User";

const Tab = createBottomTabNavigator()

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
             initialRouteName="animes"
             tabBarOptions={{
                 inactiveTintColor: '#19282F',
                 activeTintColor: '#E83A14'
             }}
             screenOptions={({route})  => ({
                     tabBarIcon:({color})=>screenOptions(route,color)
             })}
            >                             
                <Tab.Screen name='animes' 
                    component={AnimesStack}
                    options={{title:"Animes"}}
                />
                <Tab.Screen name='generos' 
                    component={GenerosStack}
                    options={{title:"Generos"}}
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
                <Tab.Screen name='tienda' 
                    component={TiendaStack}
                    options={{title:"Tienda"}}
                />
                <Tab.Screen name='user' 
                    component={UserStack}
                    options={{title:"Usuario"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
function screenOptions(route,color){
    let iconName
    switch(route.name){
        case 'animes':
            iconName='television'
        break
        case 'generos':
            iconName='shape'
        break
        case 'favorites':
            iconName='cards-heart'
        break
        case 'Top-Animes':
            iconName='star-face'
        break    
        case 'search':
            iconName='magnify'
        break
        case 'tienda':
            iconName='store'
        break
        case 'user':
            iconName = 'account-circle'
        break
    }
    return(
        <Icon type='material-community' name={iconName} size={22} color={color}/>
    )
}