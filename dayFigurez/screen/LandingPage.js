import { Text, TouchableOpacity, View } from "react-native";
import {  landingPage } from "../styles/LandingPagestyles";


export default function LandingPage({navigation}){
    return(
        <View style={landingPage.landings}>

            <Text>Welcome to </Text>

            <View style={landingPage.name}>
                <Text style={{ color: "#fff", fontSize: 23}}>DayFigurez</Text>
            </View>

            
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Click here to register</Text>
            </TouchableOpacity>
        </View>
    )
}