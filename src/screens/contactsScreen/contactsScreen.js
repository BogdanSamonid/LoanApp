import React, {useEffect, useState} from 'react'
import {
    TextInput,
    View
} from 'react-native';
import { firebase } from '../../firebase/config';
import {collection, getDocs, getFirestore, query, where, doc, getDoc} from "firebase/firestore";
import {Button, FlatList, Text} from "react-native-web";

const db = getFirestore();

const Item = ({ title }) => (
    <View>
        <Text >{title}</Text>
    </View>
);

export default function ContactsScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [users, setUsers] = useState('');
    const renderItem = ({ item }) => (
        <Item title={item} />
    );
    const friends = [];

    const getCurrentUserData = async() => {
        const currentLoggedUser = firebase.auth().currentUser;

        const docRef = doc(db, "users", currentLoggedUser.uid);
        const docSnap = await getDoc(docRef);
        setCurrentUser(docSnap.data());
    }

    const getUsers = async() => {
        const users = await firebase.firestore().collection('users').get();
        setUsers(users.docs.map((doc => doc.data())));
    }

    const getFriends = () => {
        currentUser.friends.forEach((value) => {
            const friend = users.find((user) => user.id === value);
            friends.push({ id: friend.id, name: friend.fullName });
        })
    }

    const addFriend = async () => {
        const users = firebase.firestore().collection('users');

        const q = query(collection(db, 'users'), where('email', '==', email));

        const searchedUser = await getDocs(q);
        let searchedUserId;
        searchedUser.forEach(doc => searchedUserId = doc.id);

        users.doc(`gSbDHRz4j1h18goWIVc6u2aAmUI3`).update({
                [`friends.${searchedUserId}`]: true
            }
        ).then(function(){
            alert("Successfully updated!");
            console.log('chops')

        });
    }

    useEffect(() => {
        getCurrentUserData();
        getUsers();
        // addFriend();
    },[]);

    return (
        <View>
            <TextInput
                placeholder='Enter email'
                value={email}
                onChangeText={(value) => setEmail(value)}
            />

            <Button onPress={() => setFriend()}>Add Friend</Button>
            <FlatList
                data={currentUser.friends}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
};