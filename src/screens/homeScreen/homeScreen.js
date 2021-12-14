import React from 'react'
import {Text, TextComponent, TouchableOpacity, StyleSheet, View, Dimensions, ScrollView, FlatList, Image, ImageBackground} from 'react-native';
import { firebase } from '../../firebase/config';
/*import styles from './styles';*/
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({navigation}) {

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
        navigation.navigate('Create Transaction')
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
}

const styles = StyleSheet.create({
    button: {
        height: 25,
        width: 65,
        borderRadius: 5,
        backgroundColor: '#77b3d4',
        alignItems: "center",
        justifyContent: 'center',
        marginRight: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    header: {
        width: '100%',
        height: 225,
    },
    headerText: {
        width: '100%',
        height: 160,
        justifyContent: 'center',
        position: 'absolute',
    },
    filter: {
        width: '100%',
        height: 300,
        backgroundColor: '#77b3d4',
        position: 'absolute',
        opacity: .7
    },
    headerTitle: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 20
    },
    headerDescription: {
        fontSize: 18,
        color: 'white',
        marginLeft: 20,
        marginRight: 50
    },
    container: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: 'white',
        height: Dimensions.get('window').height - 200,
        width: '100%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        position: 'absolute',
        top: 160,
        flex: 1
    },
    containerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        color: '#77b3d4'
    },
    cardContainer: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImg: {
        width: 75,
        height: 75,
        margin: 15,
    },
    cardDescriptionContainer: {
        backgroundColor: '#77b3d4',
        padding: 10,
        paddingVertical: 15,
        margin: 15,
        borderRadius: 5,
    },
    cardDescriptionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    createButton: {
        marginTop: 50,
        height: 50,
        width: "100%",
        borderRadius: 5,
        backgroundColor: '#77b3d4',
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})

