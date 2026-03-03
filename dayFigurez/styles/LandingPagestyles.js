import { StyleSheet } from "react-native";

export const landingPage = StyleSheet.create({
    landings: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 20,
    },
    name: {
        width: 350,
        height: 120,
        backgroundColor: "#f5bf0c",alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
       
    },
    clickHereText:{
        fontSize:15
    },
   highlightedText:{
        color: 'blue'
    },
    homeNav: {
        flexDirection: 'row',
    }
});