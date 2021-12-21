import React, {useState} from 'react'
import {Text, TextInput, View, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import styles from "../transactionScreen/styles";
import { firebase } from '../../firebase/config'

export default function TransactionScreen({navigation, route}) {
    const [sender, setSender] = useState('')
    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('')

    const onSubmitPress = () => {

        alert('new transaction: ' + ' ' + sender + ' ' + receiver + ' ' + amount + ' ' + currency);

        const dummyData = { hmm: 10 }
        /*const data = {
            amount: 10,
            currencyId: ,
            isAccepted: ,
            isPaid: ,
            receiverId:
            senderId: ,
            date:
        }*/
        const loansRef = firebase.firestore().collection('loans')
        loansRef
            .doc()
            .set(dummyData)
            .then(() => {
                alert('Transaction has been recorded')
                navigation.navigate('Main')
            })
            .catch(error => {
                alert(error.message)});
    }

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
                <Text style={styles.containerTitle}>Create transaction</Text>

            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 50, display: "flex", flexDirection: "column"}}
            >
                <View style={styles.cardDescriptionContainer}>
                    <Text style={styles.headerDescription}>Account that owns money</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Sender'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        onChangeText={(text) => setSender(text)}
                        value={sender}
                    />
                </View>

                <View style={styles.cardDescriptionContainer}>
                    <Text style={styles.headerDescription}>Account that is owned money</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        placeholder='Receiver'
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
                        placeholder='Amount'
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
                        placeholder='Currency'
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

