import React, {useEffect, useRef, useState} from 'react'
import {
    ImageBackground,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "../inboxScreen/styles";
import {firebase} from "../../firebase/config";
import {
    doc,
    getDoc,
    setDoc,
    getFirestore,
    updateDoc,
    deleteField,
    deleteDoc
} from "firebase/firestore";
import {v4 as uuidv4} from "uuid";

const Icon = ({type, name, color, size=24, style}) => {
    const fontSize = 24;
    const Tag = type;
    return (
        <>
            {type && name && (
                <Tag name={name} size={size || fontSize} color={color} style={style} />
            )}
        </>
    )
}

const db = getFirestore();

export default function InboxScreen({navigation}) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const entriesCollectionRef = firebase.firestore().collection("inbox");
    const currentUser = useRef(null);

    const getCurrentUserData = async() => {
        const currentLoggedUser = firebase.auth().currentUser;

        const docRef = doc(db, "users", currentLoggedUser.uid);
        const docSnap = await getDoc(docRef);
        currentUser.current = docSnap.data();
        return docSnap.data();
    }

    function getInbox() {
        setLoading(true);
        entriesCollectionRef.where('documentId', '==', currentUser.current.id).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            const pendingMessages = items.filter((message) => message.isAccepted === false);
            setEntries(pendingMessages);
            setLoading(false);
        })
    }
    useEffect(() => {
        getCurrentUserData().then(() =>  getInbox());
    }, [])

    const acceptRequest = async(inboxMessage) => {

        if(inboxMessage.type === "friend request"){
            console.log("FRiend req");

            //get pending friend document
            const pendingFriendDocRef = doc(db, 'users', inboxMessage.pendingFriendId);
            const docSnap = await getDoc(pendingFriendDocRef);
            const pendingFriend = docSnap.data();
            const currentUserRef = doc(db, 'users', currentUser.current.id);

            await updateDoc(pendingFriendDocRef, {
                [`friends.${currentUser.current.id}`]: true
            });
            await updateDoc(currentUserRef, {
                [`friends.${pendingFriend.id}`]: true
            });

            //mark friend request as accepted
            console.log("inboxMessage",inboxMessage);
            const inboxMessageRef =  doc(db, 'inbox', inboxMessage.id);
            await updateDoc(inboxMessageRef, {
                [`isAccepted`]: true
            });

            alert(`You are now friends with ${pendingFriend.fullName}`);


        }
        else if(inboxMessage.type === "TRANSACTION"){
            console.log("TRANSACTION");

            const newTransactionRef = doc(db, "loans",inboxMessage.transactionId);


            //create loan
            await setDoc(newTransactionRef, {
                amount: inboxMessage.amount,
                currency: inboxMessage.currency,
                /*date*/
                isAccepted: true,
                isPaid: false,
                receiver: inboxMessage.receiver,
                sender: inboxMessage.sender,
                transactionId:  inboxMessage.transactionId,
            })

            //mark friend request as accepted
            console.log("inboxMessage",inboxMessage);
            const inboxMessageRef =  doc(db, 'inbox', inboxMessage.id);
            await updateDoc(inboxMessageRef, {
                isAccepted: true
            });

        }

        //clear inbox
        const remainingPendingMessages = entries.filter((message) => message.isAccepted === false);
        setEntries(remainingPendingMessages);

    }
    const declineRequest = async(inboxMessage) => {

        if(inboxMessage.type === "friend request"){
            //get pending friend document
            const pendingFriendDocRef = doc(db, 'users', inboxMessage.pendingFriendId);
            const docSnap = await getDoc(pendingFriendDocRef);
            const pendingFriend = docSnap.data();
            const currentUserRef = doc(db, 'users', currentUser.current.id);

            await updateDoc(pendingFriendDocRef, {
                [`friends.${currentUser.current.id}`]: deleteField()
            });
            await updateDoc(currentUserRef, {
                [`friends.${pendingFriend.id}`]: deleteField()
            });
        }

        //mark request as rejected
        console.log("inboxMessage",inboxMessage);
        const inboxMessageRef =  doc(db, 'inbox', inboxMessage.id);
        await deleteDoc(inboxMessageRef);

        //clear inbox
        const remainingPendingMessages = entries.filter((message) => message.id !== inboxMessageRef.id);
        setEntries(remainingPendingMessages);
    }

    return (
        <View style={{backgroundColor: 'lightgrey', flex: 1, alignItems: "center"}}>
            <ImageBackground source={require('../../../assets/dummy-pic.jpg')}
                             style={styles.header}
            >
            </ImageBackground>
            <View style={styles.filter}></View>
            <View style={styles.headerText}>
                <Text style={styles.headerTitle}>LoanApp</Text>
                <Text style={styles.headerDescription}>Best platform for borrowing/ landing money from/ to your friends</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.containerTitle}>Inbox</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 50, display: "flex", flexDirection: "column"}}
            >
                <View style={styles.cardContainer}>
                {loading ?
                    <Text style={{color: '#77b3d4'}}>
                        Loading ...
                    </Text>
                    : null
                }

                {entries.map((entry) => (
                    <View style={styles.cardContent}>
                        <View style={styles.cardDescriptionContainer}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{entry.type}</Text>
                            <Text style={{color: 'white', fontSize: 12}}>{entry.message}</Text>

                        </View>
                        <TouchableOpacity style={styles.responseButton}
                                          onPress={() => acceptRequest(entry)}>
                            <Icon type={Ionicons} name="checkmark-circle-outline" color='#00B300'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.responseButton}
                                          onPress={() => declineRequest(entry)}>
                            <Icon type={Ionicons} name="close-circle-outline" color='#B30000'/>
                        </TouchableOpacity>
                    </View>
                ))}
                </View>

            </ScrollView>
        </View>
    )

};
