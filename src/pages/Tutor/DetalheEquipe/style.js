import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "yellow",
        paddingTop: 20
    },
    contextTodasEquipes:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },
    buttonDeletaEquipe:{
        justifyContent:"center",
        paddingLeft: 20
    },
    textDescricaoEquipe:{
        width:"82%",
        alignContent: "flex-start",
        backgroundColor: "#f5f5f5cf",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15
    },
    buttonCadastrarEquipe:{
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
    iconButtonCadastrarEquipe:{
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
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    pickerStyle: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'blue',
      borderRadius: 5,
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginHorizontal: 8,
      marginVertical: 8,
      height: 40,
      width: 200,
    },
});

export default styles;