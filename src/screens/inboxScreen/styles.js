import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
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
        height: Dimensions.get('window').height /*- 200*/,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    cardDescriptionContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#77b3d4',
        padding: 10,
        paddingVertical: 15,
        margin: 15,
        borderRadius: 5,
    },
    responseButton: {
        height: 50,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0)',
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})
