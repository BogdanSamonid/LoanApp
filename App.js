import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {LoginScreen, RegistrationScreen, HomeScreen, InboxScreen} from './src/screens'
import {decode, encode} from 'base-64'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Button} from "react-native";
import View from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedView";
import Text from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedText";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Tab = createBottomTabNavigator();

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else {
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
    return (
        <></>
    )
    }

    return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#93b2da',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'left',
        }}>
            { user ? (
                <Tab.Group>
                    <Tab.Screen name="Home" component={HomeScreen}/>
                    <Tab.Screen name="Inbox" component={InboxScreen} />
                    <Tab.Screen name="Feed" component={FeedScreen} />
                    <Tab.Screen name="Contacts" component={ContactsScreen} />
                </Tab.Group>
            ) : (
                <Tab.Group>
                    <Tab.Screen name="Login" component={LoginScreen} />
                    <Tab.Screen name="Registration" component={RegistrationScreen} />
                </Tab.Group>
            )}
        </Tab.Navigator>
    </NavigationContainer>
    );
}
