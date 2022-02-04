import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "yellow",
        paddingTop: 20
    },
    contextTodosJogadores:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    buttonDeletaJogador:{
        justifyContent:"center",
        paddingLeft: 20
    },
    textDescricaoJogador:{
        width:"82%",
        alignContent: "flex-start",
        backgroundColor: "#f5f5f5cf",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15
    },
    buttonCadastrarJogador:{
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "blue",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    iconButtonCadastrarJogador:{
        color:"#ffffff",
        fontSize: 20,
        fontWeight: "bold"
    },
    buttonLogout:{
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        right: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    iconButtonLogout:{
        color:"#ffffff",
        fontSize: 25,
        fontWeight: "bold"
    },
});

export default styles;