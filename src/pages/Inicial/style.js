import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        /* paddingTop: Platform.OS === "ios" ? 0 : 25 */
    },

    containerActivityIndicator: {
       flex: 1,
       backgroundColor: 'yellow',
       justifyContent: 'center',
       alignItems: 'center'
    },

    activityIndicator: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       height: 80,
    },

    viewInicial:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor: 'yellow',
        paddingTop: '30%',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoInicial:{
        width:200,
        height:200
    },

    viewButtonInicial:{
        width:'80%',
        marginTop: 10

    },
    buttonInicial: {
        marginTop: 10,
        height: 50,
        borderWidth: 1,
        backgroundColor: "blue",
        borderColor: "black",
        borderRadius: 10,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonInicialText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default styles;