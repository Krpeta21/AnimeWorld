import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import TopAnimes from "../screens/TopAnimes"

const Stack = createStackNavigator()

export default function TopAnimesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='top-animes'
                component={TopAnimes}
                options={{title: 'Top 10 animes'}}
            />
        </Stack.Navigator>
    )
}