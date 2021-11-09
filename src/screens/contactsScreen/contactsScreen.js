import React from 'react'
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { firebase } from '../../firebase/config';
import styles from './styles';
import {SearchBar} from "react-native-screens";

export default function ContactsScreen({navigation}) {

    const onLogoutPress =() => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                navigation.navigate('Login')
            })
            .catch(error => {
                alert(error);
            });
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
    }, []);

    return (
        <View style={styles.container}>
            <SearchBar>
            >
            </SearchBar>
            <Button> Add</Button>
        </View>
    )
};