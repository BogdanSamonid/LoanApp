import React from 'react'
import {Text, TextInput, View} from 'react-native';
import styles from "../transactionScreen/styles";

export default function TransactionScreen({navigation}) {
    return (
        <View styles={styles.container}>
            <View>
                <Text>Create a new transaction !</Text>

                <View>
                    <Text>Account that owns money</Text>
                    <TextInput
                        placeholderTextColor="#aaaaaa"
                        placeholder='Sender'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Text>Account that is owned money</Text>
                    <TextInput
                        placeholderTextColor="#aaaaaa"
                        placeholder='Receiver'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Text>Amount to be sent</Text>
                    <TextInput
                        placeholderTextColor="#aaaaaa"
                        placeholder='Amount'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
            </View>
        </View>
    )
};

