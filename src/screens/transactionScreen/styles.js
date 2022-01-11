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
        // marginRight: 50
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
    pageTitle: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "flex-start",
        // justifyContent: 'center',
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
        marginRight: 50,
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#77b3d4',
        padding: 10,
        paddingLeft: 20,
        paddingVertical: 15,
        margin: 15,
        borderRadius: 5,
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
    },
    input: {
        width: "auto",
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        // marginRight: 30,
        paddingLeft: 16,
        paddingRight: 16,
    },
    submitButton: {
        marginTop: 50,
        height: 50,
        width: "90%",
        borderRadius: 5,
        backgroundColor: '#77b3d4',
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    bottomTab: {
        width: '100%'
    },

    cardDescriptionContainer2: {
        backgroundColor: '#77b3d4',
        padding: 10,
        paddingVertical: 15,
        margin: 15,
        borderRadius: 5,
        width: '60%'
    },
})
