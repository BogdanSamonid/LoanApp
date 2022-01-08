import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { HomeScreen, InboxScreen } from '../../screens'
import ContactsScreen from "../../screens/contactsScreen/contactsScreen";

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

const TabArr = [
    { route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen },
    { route: 'Inbox', label: 'Inbox', type: Ionicons, activeIcon: 'mail', inActiveIcon: 'mail-outline', component: InboxScreen },
    { route: 'Contacts', label: 'Contacts', type: Ionicons, activeIcon: 'people', inActiveIcon: 'people-outline', component: ContactsScreen },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if(focused) {
            viewRef.current.animate({0: {scale: 0.75, rotate: '0deg'}, 1: {scale: 1, rotate: '360deg'}});
        } else {
            viewRef.current.animate({0: {scale: 1}, 1: {scale: 0.75}});
        }
    }, [focused])
    return (
        <TouchableOpacity style={styles.container}
                          activeOpacity={1}
                          onPress={onPress}>
            <Animatable.View style={styles.container}
                             ref={viewRef}
                             duration={1000}>
                <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? '#77b3d4' : '#c4ceda'}/>
            </Animatable.View>
        </TouchableOpacity>
    )
}

export default function BottomTab() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                height: 40,
                position: 'absolute',
                bottom: 16,
                right: 16,
                left: 16,
                borderRadius: 20
            }
        }}>
            {TabArr.map((item) => {
                return (
                    <Tab.Screen name={item.route}
                                component={item.component}
                                options={{
                                    headerShown: false,
                                    /*headerTitle: () => <HeaderBar page={item.label}/>,
                                    tabBarShowLabel: false,*/
                                    tabBarButton: (props) => <TabButton {...props} item={item}/>
                                }}/>
                        )
            })}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
