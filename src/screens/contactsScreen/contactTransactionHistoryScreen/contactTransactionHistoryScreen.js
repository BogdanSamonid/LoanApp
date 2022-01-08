import React from 'react'
import {ImageBackground, View, Text, FlatList} from 'react-native';
import styles from "../styles";
import {IconButton} from "react-native-paper";
import {CommonActions} from "@react-navigation/native";

export default function ContactTransactionHistoryScreen({navigation}) {

    const friends = [
        {
            key: 1,
            fullName: "Oana",
        },
        {
            key: 2,
            fullName: "Alex",
        },
        {
            key: 3,
            fullName: "Boogie",
        },
        {
            key: 4,
            fullName: "Oana",
        },
        {
            key: 5,
            fullName: "Alex",
        },
        {
            key: 6,
            fullName: "Boogie",
        },
        {
            key: 7,
            fullName: "Oana",
        },
        {
            key: 8,
            fullName: "Alex",
        },
        {
            key: 9,
            fullName: "Boogie",
        },
        {
            key: 10,
            fullName: "Oana",
        },
        {
            key: 11,
            fullName: "Alex",
        },
        {
            key: 12,
            fullName: "Boogie",
        },
        {
            key: 13,
            fullName: "Oana",
        },
        {
            key: 14,
            fullName: "Alex",
        },
        {
            key: 15,
            fullName: "Boogie",
        },
        {
            key: 16,
            fullName: "Oana",
        },
        {
            key: 17,
            fullName: "Alex",
        },
        {
            key: 18,
            fullName: "Boogie",
        }
    ];

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
            <View style={styles.flatListContainer}>
                <FlatList
                    data={friends}
                    renderItem={({item}) => (
                        <View style={styles.cardDescriptionContainer}>
                            <Text style={styles.headerDescription}>{item.fullName}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
};