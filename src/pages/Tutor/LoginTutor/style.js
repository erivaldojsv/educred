import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : 50
    },
    title1: {
        fontSize: 35,
        color: "gray",
        fontWeight: "bold"
    },
    title2: {
        fontSize: 23,
        color: "blue",
        marginBottom: 10,
    },
    input: {
        width: 300,
        padding: 10,
        height: 50,
        color: "#2F4F4F",
    },
    inputOpacity: {
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderColor: "blue",
        borderRadius: 20,
        marginTop: 10,
    },
    buttonLogin: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 50,
        marginTop: 30,
    },
    textButtonLogin: {
        color: "#ffffff",
        fontSize: 20
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    warningAlert: {
        paddingLeft: 10,
        color: "#bdbdbd",
        fontSize: 16,
    },
    registration: {
        marginTop: 20,
        color: '#4d5156',
    },
    linkSubscribe: {
        color: "#1877f2",
        fontSize: 16,
    },
    containerActivityIndicator: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 70
    },
    activityIndicator: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       height: 80
    }
});

export default styles;