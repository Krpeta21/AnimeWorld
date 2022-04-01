import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import User from "../screens/Users/User"
import Login from "../screens/Users/Login"
//import Register from "../screens/Account/Register"

const Stack = createStackNavigator()

export default function UserStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='user'
                component={User}
                options={{title: 'Usuario'}}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{title: 'Inicie Sesión'}}
            />
             {/* <Stack.Screen
                name="register"
                component={Register}
                options={{title: 'Registro'}}
            /> */}
        </Stack.Navigator>
    )
}