import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import Tienda from "../screens/Tienda"

const Stack = createStackNavigator()

export default function TiendaStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='tienda'
                component={Tienda}
                options={{title: 'Tienda'}}
            />
        </Stack.Navigator>
    )
}