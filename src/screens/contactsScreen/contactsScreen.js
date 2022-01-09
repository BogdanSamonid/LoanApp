import React, {useEffect,useRef, useState} from 'react'
import {
    ImageBackground,
    TextInput,
    View,
    Modal,
    TouchableOpacity
} from 'react-native';
import { firebase } from '../../firebase/config';
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
    doc,
    updateDoc,
    getDoc,
    deleteField,
    addDoc,
    setDoc
} from "firebase/firestore";
import {Text, FlatList} from "react-native";
import styles from "./styles";
import {IconButton, Searchbar} from "react-native-paper";
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore();

export default function ContactsScreen({navigation}) {
    const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
    const [friends, setFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([])
    const currentUser = useRef(null);
    const [text, onChangeText] = useState("");
    const [searchQuery, onSearchQuery] = useState("");

    const getCurrentUserData = async() => {
        const currentLoggedUser = firebase.auth().currentUser;

        const docRef = doc(db, "users", currentLoggedUser.uid);
        const docSnap = await getDoc(docRef);
        currentUser.current = docSnap.data();
        return docSnap.data();
    }

    const getFriends = async(currentUser) => {
        const friendsUids = Object.keys(currentUser.friends);

        if(!friendsUids.length){
            return;
        }
        const q = query(collection(db, "users"), where("id", "in", friendsUids));

        const querySnapshot = await getDocs(q);
        const friends = [];
         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("DOC: " + doc.id, " => ", doc.data());
            const friend = doc.data();
            friends.push({
                key: friend.id,
                fullName: friend.fullName,
                status: currentUser.friends[friend.id]
            })
        });

         setFriends(friends);
         setAllFriends(friends);
    }

    const addFriend = async (friendEmail) => {
        const q = query(collection(db, "users"), where("email", "==", friendEmail));

        const querySnapshot = await getDocs(q);

        const searchedUsers = [];
        querySnapshot.forEach((doc) => {
            searchedUsers.push(doc.data())
        });

        if(!currentUser.current){
            return;
        }

        if(!searchedUsers.length){
            alert('User not found!');
            return;
        }

        const alreadyFriends = friends?.find(user => user.key === searchedUsers[0].id)

        if(alreadyFriends){
            alert('You are already friends with this user');
            return;
        }

        const friendDocRef = doc(db, 'users',searchedUsers[0].id);
        const currentUserRef = doc(db, 'users', currentUser.current.id);

        // await updateDoc(friendDocRef, {
        //     [`friends.${currentUser.current.id}`]: false
        // });

        await updateDoc(currentUserRef, {
            [`friends.${searchedUsers[0].id}`]: false
        });

        const uid = uuidv4();
        const newInboxRef = doc(db, "inbox",uid);

        //send friend request message
        await setDoc(newInboxRef, {
            documentId: searchedUsers[0].id,
            pendingFriendId: currentUser.current.id,
            message: `${currentUser.current.fullName} wants to connect`,
            isAccepted: false,
            type: "friend request",
            id: uid,
        })

        setAddFriendModalVisible(!addFriendModalVisible);
        alert('Friend request sent!');
        onChangeText("");
        getCurrentUserData()
            .then((user) => getFriends(user));
    }

    const onDelete = async(friendId) => {
        const friendDocRef = doc(db, 'users', friendId);
        const currentUserRef = doc(db, 'users', currentUser.current.id);

        await updateDoc(friendDocRef, {
            [`friends.${currentUser.current.id}`]: deleteField()
        });

        await updateDoc(currentUserRef, {
            [`friends.${friendId}`]: deleteField()
        });

        const remainingFriends = friends?.filter((user) => user.key !== friendId);
        setFriends(remainingFriends);
        setAllFriends(remainingFriends);
        alert('Friend removed successfully!');
    }

    const onSeeTransactionHistoryPress = () => {
        navigation.navigate('ContactTransactionHistory')
    }

    useEffect(() => {
        getCurrentUserData()
            .then((user) => getFriends(user))
    },[]);

    useEffect(() => {
        if(searchQuery === ""){
            setFriends(allFriends);
        }
    },[searchQuery]);

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
                    onChangeText={onSearchQuery}
                    value={searchQuery}
                    onIconPress={() => {
                        const searchedFriends = friends.filter((friend) => friend.fullName.toLowerCase().includes(searchQuery.toLocaleLowerCase()));
                            setFriends(searchedFriends);
                    }}
                />
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={friends}
                    renderItem={({item}) => (
                        <View style={styles.cardDescriptionContainer}>
                            <Text style={styles.headerDescription}>{item.fullName}</Text>
                            { item.status ? (
                                <View style={styles.icon} >
                                    <IconButton
                                    icon={'arrow-right-box'}
                                    color={'white'}
                                    onPress={onSeeTransactionHistoryPress}
                                    />
                                    <IconButton
                                        icon={'trash-can'}
                                        color={'white'}
                                        onPress={() => onDelete(item.key)}
                                    />
                                </View>
                            ) :
                                <Text style={styles.textStyle}>Pending</Text>
                            }
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
                                selectionColor={'#77b3d4'}
                                style={styles.textInput}

                            />
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => addFriend(text)}
                            >
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Add Friend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setAddFriendModalVisible(!addFriendModalVisible)
                                    onChangeText("");
                                }}
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