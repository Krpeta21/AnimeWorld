import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import Generos from "../screens/Generos"

const Stack = createStackNavigator()

export default function GenerosStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='generos'
                component={Generos}
                options={{title: 'Generos'}}
            />
        </Stack.Navigator>
    )
}