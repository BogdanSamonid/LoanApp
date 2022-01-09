import React, {useEffect, useRef, useState} from 'react'
import {
    Image,
    ImageBackground,
    ImageBackgroundComponent,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "../inboxScreen/styles";
import * as Animatable from "react-native-animatable";
import {firebase} from "../../firebase/config";
import {getDocs} from "firebase/firestore";

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

export default function InboxScreen({navigation}) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const entriesCollectionRef = firebase.firestore().collection("inbox");

    const {uid} = firebase.auth().currentUser;
    const id = uid.toString();

    function getInbox() {
        setLoading(true);
        entriesCollectionRef.where('documentId', '==', id).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });

            setEntries(items);
            setLoading(false);
        })
    }
    useEffect(() => {
        getInbox();
    }, [])

    const acceptRequest = () => {
        alert('accept pressed');
    }
    const declineRequest = () => {
        alert('decline pressed');
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
                    {loading ? <Text style={{alignSelf: "center", color: "#77b3d4"}}>Loading ...</Text> : null}
                {entries.map((entry) => (
                    <View style={styles.cardContent}>
                        <View style={styles.cardDescriptionContainer}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>{entry.type}</Text>
                            <Text style={{color: 'white', fontSize: 12}}>{entry.message}</Text>

                        </View>
                        <TouchableOpacity style={styles.responseButton}
                                          onPress={() => acceptRequest()}>
                            <Icon type={Ionicons} name="checkmark-circle-outline" color='#00B300'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.responseButton}
                                          onPress={() => declineRequest()}>
                            <Icon type={Ionicons} name="close-circle-outline" color='#B30000'/>
                        </TouchableOpacity>
                    </View>
                ))}
                </View>

            </ScrollView>
        </View>
    )

};
