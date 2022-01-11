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
    transactionHistoryTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 0,
        marginTop: 10,
        marginBottom: 10,
        color: '#77b3d4'
    },
    containerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 7,
        // marginBottom: 10,
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
        alignItems: "center",
        backgroundColor: '#77b3d4',
        padding: 5,
        margin: 7,
        borderRadius: 5,
    },
    flatListContainer: {
        width: '80%',
        height: 470,
    },
    icon: {
        marginLeft: 'auto',
        display: "flex",
        flexDirection: "row"
    },
    pageTitle: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: 'center',
        backgroundColor: 'white',
        height: Dimensions.get('window').height /*- 200*/,
        width: '100%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        position: 'absolute',
        top: 160,
        flex: 1
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        marginTop: 100,
        position: "relative",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        height: "auto",
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    modalButton: {
        height: 50,
        width: "auto",
        borderRadius: 5,
        backgroundColor: '#77b3d4',
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 10,
    },
    modalTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 7,
        justifyContent: "center",
        color: '#77b3d4'
    },
    textInput: {
        paddingLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        borderColor: '#77b3d4',
        borderWidth: 1,
        height: 40,
    },
    textStyle: {
        fontStyle: "italic",
        fontSize: 16,
        color: 'white',
        marginLeft: "auto",
        marginRight: 22
    },
    summaryContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#77b3d4',
        padding: 5,
        margin: 7,
        borderRadius: 5,
        height: 'auto%',
        width: '80%',
        marginBottom: 20,
    },
    transactionHistoryCardTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
    },
    transactionsListContainer:{
        width: '80%',
        height: 470,
        borderRadius: 5,
        backgroundColor: '#77b3d4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    }

})