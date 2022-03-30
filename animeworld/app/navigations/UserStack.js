import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import User from "../screens/Users/User"

const Stack = createStackNavigator()

export default function UserStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='user'
                component={User}
                options={{title: 'Usuario'}}
            />
        </Stack.Navigator>
    )
}