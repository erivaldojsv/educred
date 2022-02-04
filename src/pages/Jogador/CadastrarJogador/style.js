import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: Platform.OS === "ios" ? 0 : 25
    },
    viewTitle1: {
        alignItems:'center',
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
    buttonCadastrar: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 50,
        marginTop: 30,
    },
    textButtonCadastrar: {
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
    login: {
        marginTop: 20,
        color: '#4d5156',
    },
    linkSubscribe: {
        color: "#1877f2",
        fontSize: 16,
    },
    textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: 35,
      justifyContent: 'center',
    },
    color_textPrivate: {
      fontSize: 13,
      fontWeight: '400',
      fontFamily: 'normal',
      color: 'grey',
    },
});

export default styles;