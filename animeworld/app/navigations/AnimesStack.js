import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import Animes from "../screens/Animes"

const Stack = createStackNavigator()

export default function AnimesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='animes'
                component={Animes}
                options={{title: 'Animes'}}
            />
        </Stack.Navigator>
    )
}