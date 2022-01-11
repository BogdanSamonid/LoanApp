import React, {useEffect, useRef, useState} from 'react'
import {Text, TouchableOpacity, View, ScrollView, Image, ImageBackground} from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './styles';
import {getFirestore, setDoc, doc, query, collection, where, getDocs, getDoc} from "firebase/firestore";
const db = getFirestore();

export default function HomeScreen ({navigation, route}) {
    //const user = JSON.parse(route.params);
    //console.log(user.id)
    const [lended, setLended] = useState([]);
    const [borrowed, setBorrowed] = useState([]);
    const currentUser = useRef(null);
    const getCurrentUserData = async() => {

        const currentLoggedUser = firebase.auth().currentUser;
        const docRef = doc(db, "users", currentLoggedUser.uid);
        const docSnap = await getDoc(docRef);
        currentUser.current = docSnap.data();
        return docSnap.data();
    }

    const onLogoutPress =() => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                navigation.navigate('Login');
            })
            .catch(error => {
                alert(error);
            });
    }

    const onCreateTransactionPress = () => {
        navigation.navigate('Transaction')
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => onLogoutPress()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            ),

        });
    }, [navigation]);

    const getTransactions = async(currentUser) => {

        const borrowedMoney = [];
        const lendedMoney = [];
        console.log("currentUser",currentUser);
        const q = query(collection(db, "loans"),
            where("sender", "==", currentUser.id),
            where("isAccepted", "==", true),
            where("isPaid", "==", false),
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            borrowedMoney.push(doc.data());
        });

        const q2 = query(collection(db, "loans"),
            where("receiver", "==", currentUser.id),
            where("isAccepted", "==", true),
            where("isPaid", "==", false),
        );

        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
            lendedMoney.push(doc.data());
        });

        return [borrowedMoney, lendedMoney]
    }

    const listTransactions = (moneyArray) => {
        const borrowed = moneyArray[0];
        const lent = moneyArray[1];
        let borrowedRON = 0 , borrowedEUR = 0 , borrowedUSD = 0, borrowedHUF = 0, borrowedRSD = 0, borrowedGBP = 0;
        let lentRON = 0 , lentEUR = 0 , lentUSD = 0, lentHUF = 0, lentRSD = 0, lentGBP = 0;

        borrowed.forEach((transaction) => {
            if(transaction.currency === "RON" )
                borrowedRON += transaction.amount;
            if(transaction.currency === "HUF" )
                borrowedHUF += transaction.amount;
            if(transaction.currency === "GBP" )
                borrowedGBP += transaction.amount;
            if(transaction.currency === "USD" )
                borrowedUSD += transaction.amount;
            if(transaction.currency === "RSD" )
                borrowedRSD += transaction.amount;
            if(transaction.currency === "EUR" )
                borrowedEUR += transaction.amount;
        });

        lent.forEach((transaction) => {
            if(transaction.currency === "RON" )
                lentRON += transaction.amount;
            if(transaction.currency === "HUF" )
                lentHUF += transaction.amount;
            if(transaction.currency === "GBP" )
                lentGBP += transaction.amount;
            if(transaction.currency === "USD" )
                lentUSD += transaction.amount;
            if(transaction.currency === "RSD" )
                lentRSD += transaction.amount;
            if(transaction.currency === "EUR" )
                lentEUR += transaction.amount;
        });

        const borrowedMoney=[], lentMoney=[];
        borrowedMoney.push({currency: "RON", amount: borrowedRON});
        borrowedMoney.push({currency: "HUF", amount: borrowedHUF});
        borrowedMoney.push({currency: "EUR", amount: borrowedEUR});
        borrowedMoney.push({currency: "USD", amount: borrowedUSD});
        borrowedMoney.push({currency: "GBP", amount: borrowedGBP});
        borrowedMoney.push({currency: "RSD", amount: borrowedRSD});

        lentMoney.push({currency: "RON", amount: lentRON});
        lentMoney.push({currency: "HUF", amount: lentHUF});
        lentMoney.push({currency: "EUR", amount: lentEUR});
        lentMoney.push({currency: "USD", amount: lentUSD});
        lentMoney.push({currency: "GBP", amount: lentGBP});
        lentMoney.push({currency: "RSD", amount: lentRSD});

        console.log("borrowed",borrowedMoney);
        console.log("lent",lentMoney);
        setBorrowed(borrowedMoney);
        setLended(lentMoney);
    }

    useEffect(() => {
        getCurrentUserData()
            .then((user) => getTransactions(user)
                .then((moneyArray) => listTransactions(moneyArray))
            );
    },[]);

    return (
        <View style={{backgroundColor: 'lightgrey', flex: 1, alignItems: "center"}}>
            <ImageBackground
                source={require('../../../assets/dummy-pic.jpg')}
                style={styles.header}
            >
            </ImageBackground>
            <View style={styles.filter}></View>
            <View style={styles.headerText}>
                <Text style={styles.headerTitle}>LoanApp</Text>
                <Text style={styles.headerDescription}>Best platform for borrowing/ landing money from/ to your friends</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.containerTitle}>Your Account</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 50, display: "flex", flexDirection: "column"}}
            >
                <View style={styles.cardContainer}>
                    <Image
                        source={require('../../../assets/card-borrowed.png')}
                        style={styles.cardImg}
                    />
                    <View style={styles.cardDescriptionContainer}>
                        <View style={styles.cardDescriptionTitleContainer}>
                            <View style={{flexDirection: 'column'}}>
                                { borrowed.map((currency)=>{
                                    if(currency.amount !== 0){
                                        return(<Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                                            {currency.currency}: {currency.amount}
                                        </Text>
                                        )
                                    }
                                })}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <Image
                        source={require('../../../assets/card-landed.png')}
                        style={styles.cardImg}
                    />
                    <View style={styles.cardDescriptionContainer}>
                        <View style={styles.cardDescriptionTitleContainer}>
                            <View style={{flexDirection: 'row'}}>
                                { lended.map((currency)=>{
                                    if(currency.amount !== 0){
                                        return(<Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                                                {currency.currency}: {currency.amount}
                                            </Text>
                                        )
                                    }
                                })}
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.createButton} onPress={() => onCreateTransactionPress()}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Create a new transaction</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
};
