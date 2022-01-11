import React, {useEffect, useState} from 'react'
import {ImageBackground, View, Text, FlatList} from 'react-native';
import styles from "../styles";
import {IconButton} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const db = getFirestore();

export default function ContactTransactionHistoryScreen({navigation, route}) {

    const [loading, setLoading] = useState(false);
    const { currentUser, friendUser } = route.params;
    const [pendingTransactions, setPendingTransactions] = useState([]);
    const [lended, setLended] = useState([]);
    const [borrowed, setBorrowed] = useState([]);

    const getTransactions = async(currentUser, friendUser) => {

        const allTransactions = [];
        const borrowedMoney = [];
        const lendedMoney = [];
        console.log("currentUser",currentUser);
        console.log("friendUser",friendUser);
        const q = query(collection(db, "loans"),
            where("sender", "==", currentUser.id),
            where("receiver", "==", friendUser.key),
            where("isAccepted", "==", true),
            where("isPaid", "==", false),
            );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            borrowedMoney.push(doc.data());
            allTransactions.push(doc.data())
        });

        const q2 = query(collection(db, "loans"),
            where("sender", "==", friendUser.key),
            where("receiver", "==", currentUser.id),
            where("isAccepted", "==", true),
            where("isPaid", "==", false),
        );

        const querySnapshot2 = await getDocs(q);
        querySnapshot.forEach((doc) => {
            lendedMoney.push(doc.data());
            allTransactions.push(doc.data())

        });
        console.log("lendedMoney", lendedMoney);
    }

    useEffect(() => {
        getTransactions(currentUser, friendUser)
    },[]);

    return (
        <View style={{backgroundColor: 'lightgrey', flex: 1, alignItems: "center"}}>
            <ImageBackground
                source={require('../../../../assets/dummy-pic.jpg')}
                style={styles.header}
            >
            </ImageBackground>
            <View style={styles.filter}/>
            <View style={styles.headerText}>
                <Text style={styles.headerTitle}>LoanApp</Text>
                <Text style={styles.headerDescription}>Best platform for borrowing/ landing money from/ to your friends</Text>
            </View>
            <View style={styles.pageTitle}>
                <IconButton
                    icon={'arrow-left-circle'}
                    onPress={() => { navigation.dispatch(CommonActions.goBack()) }}
                    color={'#77b3d4'}
                    // style={{ marginLeft: 20}}
                    size={35}
                />
                <Text style={styles.transactionHistoryTitle}>Transaction History</Text>
            </View>
            <View style={styles.summaryContainer} >
                <Text style={styles.transactionHistoryCardTitle}>Summary</Text>
            </View>
            {loading ? <Text style={{color: '#77b3d4'}}>Loading ...</Text> : null}
            <View style={styles.transactionsListContainer}>
                <Text style={styles.transactionHistoryCardTitle}>History</Text>

                {/*<FlatList*/}
                {/*    // data={friends}*/}
                {/*    renderItem={({item}) => (*/}
                {/*        <View style={styles.cardDescriptionContainer}>*/}
                {/*            <Text style={styles.headerDescription}>{item.fullName}</Text>*/}
                {/*        </View>*/}
                {/*    )}*/}
                {/*/>*/}
            </View>
        </View>
    )
};