import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import Animes from "../screens/Animes/Animes"
import AddAnimes from "../screens/Animes/AddAnimes"

const Stack = createStackNavigator()

export default function AnimesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='animes'
                component={Animes}
                options={{title: 'Animes'}}
            />
            <Stack.Screen
                name='add-animes'
                component={AddAnimes}
                options={{title:'Añadir Anime'}}
            />
        </Stack.Navigator>
    )
}