import React from 'react'
import {Text, TextComponent, TouchableOpacity, StyleSheet, View, Dimensions, ScrollView, FlatList, Image, ImageBackground} from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './styles';

export default function HomeScreen ({navigation, route}) {
    //const user = JSON.parse(route.params);
    //console.log(user.id)


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
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>$info-from-db$</Text>
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
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>$info-from-db$</Text>
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
