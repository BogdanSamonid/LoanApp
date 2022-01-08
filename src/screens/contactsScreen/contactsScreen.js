import React, {useEffect,useRef, useState} from 'react'
import {
    ImageBackground,
    TextInput,
    View,
    Modal,
    Pressable, TouchableOpacity
} from 'react-native';
import { firebase } from '../../firebase/config';
import {collection, getDocs, getFirestore, query, where, doc, updateDoc, getDoc} from "firebase/firestore";
import {Button, Text, FlatList, StyleSheet} from "react-native";
import styles from "./styles";
import {ScrollView} from "react-native-gesture-handler";
import {IconButton, Searchbar} from "react-native-paper";

const db = getFirestore();

export default function ContactsScreen({navigation}) {
    const [email, setEmail] = useState('');
    // const [currentUser, setCurrentUser] = useState(null);
    const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
    const [users, setUsers] = useState('');
    const [friends, setFriends] = useState([]);
    const currentUser = useRef(null);
    const [text, onChangeText] = React.useState("");

    const getCurrentUserData = async() => {
        const currentLoggedUser = firebase.auth().currentUser;

        const docRef = doc(db, "users", currentLoggedUser.uid);
        const docSnap = await getDoc(docRef);
        currentUser.current = docSnap.data();
        return docSnap.data();
    }

    const getUsers = async() => {
        const users = await firebase.firestore().collection('users').get();
        setUsers(users.docs.map((doc => doc.data())));
        console.log(users.docs.map((doc => doc.data())));
    }

    const getFriends = async(currentUser) => {
        const friendsUids = Object.keys(currentUser.friends);
        const q = query(collection(db, "users"), where("id", "in", friendsUids));

        const querySnapshot = await getDocs(q);
        const friends = [];
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("DOC: " + doc.id, " => ", doc.data());
            const friend = doc.data();
            friends.push({
                key: friend.id,
                fullName: friend.fullName
            })
        });

         setFriends(friends);
    }

    const addFriend = async (friendEmail) => {
        const q = query(collection(db, "users"), where("email", "==", friendEmail));

        const querySnapshot = await getDocs(q);

        const friends = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            friends.push(doc.data())
        });

        if(!currentUser.current){
            return;
        }

        if(!friends.length){
            alert('User not found!');
            return;
        }

        const friendDocRef = doc(db, 'users',friends[0].id);
        const currentUserRef = doc(db, 'users', currentUser.current.id);

        await updateDoc(friendDocRef, {
            [`friends.${currentUser.current.id}`]: true
        });

        await updateDoc(currentUserRef, {
            [`friends.${friends[0].id}`]: true
        });
    }

    // const onDelete = async (friendId) => {
    //
    // }

    const onSeeTransactionHistoryPress = () => {
        navigation.navigate('ContactTransactionHistory')
    }

    useEffect(() => {
        // getCurrentUserData()
        //     .then((user) => getFriends(user))
        // getUsers();
        // getFriends();
        // addFriend('tom@example.com');
    },[]);

    return (
        <View style={{backgroundColor: 'lightgrey', flex: 1, alignItems: "center"}}>
            <ImageBackground
                source={require('../../../assets/dummy-pic.jpg')}
                style={styles.header}
            />
            <View style={styles.filter}/>
            <View style={styles.headerText}>
                <Text style={styles.headerTitle}>LoanApp</Text>
                <Text style={styles.headerDescription}>Best platform for borrowing/ landing money from/ to your friends</Text>
            </View>
            <View style={styles.pageTitle}>
                <Text style={styles.containerTitle}>Contacts</Text>
                <IconButton
                    icon={'plus-circle'}
                    color={'#77b3d4'}
                    size={30}
                    onPress={() => setAddFriendModalVisible(true)}
                />
            </View>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Searchbar
                    iconColor={'#77b3d4'}
                    style={{width: "76%", marginBottom: 20}}
                />
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={friends}
                    renderItem={({item}) => (
                        <View style={styles.cardDescriptionContainer}>
                            <Text style={styles.headerDescription}>{item.fullName}</Text>
                            <IconButton
                                icon={'arrow-right-box'}
                                color={'white'}
                                style={styles.icon}
                                onPress={onSeeTransactionHistoryPress}
                            />
                            <IconButton
                                icon={'trash-can'}
                                color={'white'}
                            />
                        </View>
                    )}
                />
            </View>
            <Modal
                animation="slide"
                transparent={true}
                visible={addFriendModalVisible}
                onRequestClose={() => {
                    setAddFriendModalVisible(!addFriendModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.containerTitle}>Add a new friend</Text>
                        <View >
                            <TextInput
                                inlineImageLeft='search_icon'
                                onChangeText={onChangeText}
                                value={text}
                                placeholder={"Enter user email"}
                                placeholderTextColor={'#77b3d4'}
                                textContentType={'emailAddress'}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => addFriend()}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Add Friend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setAddFriendModalVisible(!addFriendModalVisible)}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Close</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
};