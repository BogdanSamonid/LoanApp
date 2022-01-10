import React, {useEffect, useRef, useState} from 'react'
import {Text, TextInput, View, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import styles from "../transactionScreen/styles";
import { firebase } from '../../firebase/config'
import BottomTab from "../../components/bottomTab/bottomTab";
import {IconButton} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";
import {collection, doc, getDoc, getDocs, getFirestore, query, where, setDoc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore();

export default function TransactionScreen({navigation, route}) {
    const currentUser = useRef(null);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');

    const getCurrentUserData = async() => {
        setLoading(true);
        const currentLoggedUser = firebase.auth().currentUser;

        const docRef = doc(db, "users", currentLoggedUser.uid);
        const docSnap = await getDoc(docRef);
        currentUser.current = docSnap.data();

        setLoading(true);
        return docSnap.data();
    }

    const getFriends = async(currentUser) => {
        setLoading(true);
        const friendsUids = Object.keys(currentUser.friends);

        if (!friendsUids.length) {
            return;
        }
        const q = query(collection(db, "users"), where("id", "in", friendsUids));

        const querySnapshot = await getDocs(q);
        const allFriends = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log("DOC: " + doc.id, " => ", doc.data());
            const friend = doc.data();
            allFriends.push({
                key: friend.id,
                fullName: friend.fullName,
                email: friend.email,
                status: currentUser.friends[friend.id]
            })
        });

        const acceptedFriends = allFriends.filter((value) => value.status === true);
        setFriends(acceptedFriends);
        setLoading(false);
    }
    useEffect(() => {
        getCurrentUserData().then((user) => getFriends(user));
    }, [])


    const onSubmitPress = async () => {
        let doc_id = 0;
        let sender_name = "";
        let receiver_name = "";

        if(sender.length === 0) {
            alert("Please fill the SENDER field");
            return;
        }
        if(receiver.length === 0) {
            alert("Please fill the RECEIVER field");
            return;
        }
        if(amount.length === 0) {
            alert("Please fill the AMOUNT field");
            return;
        }
        if(currency.length === 0) {
            alert("Please fill the CURRENCY field");
            return;
        }

        if(sender === currentUser.current.email) {
            let receiver_ok = 0;
            sender_name = currentUser.current.fullName;

            friends.forEach((friend) => {
                if(friend.email === receiver)
                    receiver_ok = 1;
                    receiver_name = friend.fullName,
                    doc_id= friend.key;
            })

            if(receiver_ok === 1)
                console.log("receiver is a friend");
            else {
                console.log("receiver is not a friend");
                alert("Please select a valid friend");
                return;
            }
        }
        else if(receiver === currentUser.current.email){
            let sender_ok = 0;
            receiver_name = currentUser.current.fullName;

            friends.forEach((friend) => {
                if(friend.email === sender)
                    sender_ok = 1;
                    sender_name = friend.fullName,
                    doc_id= friend.key;
            })

            if(sender_ok === 1)
                console.log("sender is a friend");
            else {
                console.log("sender is not a friend");
                alert("Please select a valid friend");
                return;
            }
        }
        else alert("Please fill your information in either sender or receiver field");

        const tx_id = uuidv4();
        const inboxID = uuidv4();
        const inboxRef = doc(db, "inbox", inboxID);
        await setDoc(inboxRef, {
            transactionId: tx_id,
            documentId: doc_id,
            type: "TRANSACTION",
            sender: sender,
            receiver: receiver,
            amount: amount,
            currency: currency,
            message: "" + sender_name + " owns " + receiver_name + " " + amount + " " + currency,
            isAccepted: false,
            id: inboxID,
        })



        //alert('new transaction: ' + ' ' + sender + ' ' + receiver + ' ' + amount + ' ' + currency);
        alert("Request submitted")
        navigation.navigate('Home');


        /*
        const dummyData = { hmm: 10 }*/
        /*const data = {
            amount: 10,
            currencyId: ,
            isAccepted: ,
            isPaid: ,
            receiverId:
            senderId: ,
            date:
        }*/
        /*const loansRef = firebase.firestore().collection('loans')
        loansRef
            .doc()
            .set(dummyData)
            .then(() => {
                alert('Transaction has been recorded')
                navigation.navigate('Main')
            })
            .catch(error => {
                alert(error.message)});*/
    }

    return (
        <View style={{backgroundColor: 'lightgrey', flex: 1, alignItems: "center"}}>
            <ImageBackground
                source={require('../../../assets/dummy-pic.jpg')}
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
                    style={{ marginLeft: 20}}
                    size={35}
                />
                <Text style={styles.containerTitle}>Create transaction</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 50, display: "flex", flexDirection: "column"}}
            >
                {loading ? <Text style={{alignSelf: "center", color: "#77b3d4"}}>Loading ...</Text> : null}
                <View style={styles.cardDescriptionContainer}>
                    <Text style={styles.headerDescription}>Sender</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder="Enter sender's username"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        onChangeText={(text) => setSender(text)}
                        value={sender}
                    />
                </View>
                <View style={styles.cardDescriptionContainer}>
                    <Text style={styles.headerDescription}>Receiver</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder="Enter receiver's username"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        onChangeText={(text) => setReceiver(text)}
                        value={receiver}
                    />
                </View>
                <View style={styles.cardDescriptionContainer}>
                    <Text style={styles.headerDescription}>Amount to be sent</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Enter amount'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        onChangeText={(text) => setAmount(text)}
                        value={amount}
                    />
                </View>
                <View style={styles.cardDescriptionContainer}>
                    <Text style={styles.headerDescription}>Currency</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Choose a currency'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        onChangeText={(text) => setCurrency(text)}
                        value={currency}
                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress = {() => onSubmitPress()}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

};

