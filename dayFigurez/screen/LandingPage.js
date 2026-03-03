import { Text, TouchableOpacity, View } from "react-native";
import {  landingPage } from "../styles/LandingPagestyles";


export default function LandingPage({navigation}){
    return(
        <View style={landingPage.landings}>

            <Text style={{fontSize: 18}}>Welcome to </Text>

            <View style={landingPage.name}>
                <Text style={{ color: "#fff", fontSize: 27}}>DayFigurez</Text>
            </View>

            <View style={landingPage.homeNav}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
             <Text style={landingPage.clickHereText}>
                        Click here to{' '}
                        <Text style={landingPage.highlightedText}>register</Text>
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
             <Text style={landingPage.clickHereText}>
                       {''} or{''}
                        <Text style={landingPage.highlightedText}> login</Text>
                    </Text>
            </TouchableOpacity>
            </View>

        </View>
    )
}