import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { decode, encode } from 'base-64'
import { firebase } from './src/firebase/config'
import {InboxScreen, LoginScreen, RegistrationScreen, TransactionScreen} from './src/screens'
import {BottomTab, HeaderBar} from "./src/components";
import ContactTransactionHistoryScreen
    from "./src/screens/contactsScreen/contactTransactionHistoryScreen/contactTransactionHistoryScreen";
import {doc, getFirestore, setDoc} from "firebase/firestore";

const db = getFirestore();

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const MainStack= createNativeStackNavigator();

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    /*firebase.firestore().collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
        })
    })*/
    const BASE_URL = 'http://data.fixer.io/api/latest?access_key=58e5a7571841f48f5115f4d32e251c31&format=1&symbols=RON,USD,GBP,RSD,HUF';
    useEffect(() => {
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                saveCurrencies(data.rates, data.base)
            });
    }, []);

    const saveCurrencies = async(currencies, baseCurrency) => {

        const currencyNames = Object.keys(currencies);
        for(const currency of currencyNames){

            await setDoc(doc(db, "currencies", currency),
                {
                    name: currency,
                    exchangeRate: currencies[currency]
                },
                { merge: true });
        }

        await setDoc(doc(db, "currencies", baseCurrency),
            {
                name: baseCurrency,
                exchangeRate: 0
            },
            { merge: true }
        );
    }

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
        <MainStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#77b3d4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'left',
        }}
        >
            { user ? (
                <MainStack.Group>
                    <MainStack.Screen name="Main" component={BottomTab} options={{headerShown: false}}/>
                    <MainStack.Screen name="Transaction" component={TransactionScreen}
                                      options={{headerShown: false}}
                    />
                    <MainStack.Screen name="ContactTransactionHistory" component={ContactTransactionHistoryScreen}
                                      options={{headerShown: false}}
                    />
                    <MainStack.Screen name="Inbox" component={InboxScreen}
                                      options={{headerShown: false}}
                    />
                </MainStack.Group>
            ) : (
                <MainStack.Group>
                    <MainStack.Screen name="Login" component={LoginScreen} />
                    <MainStack.Screen name="Registration" component={RegistrationScreen} />
                </MainStack.Group>
            )}
        </MainStack.Navigator>
    </NavigationContainer>
    );
}
