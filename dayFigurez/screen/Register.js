import { Text, TouchableOpacity, View } from "react-native";

export default function Register({navigation}){
    return(
        <View>
            <Text>Register</Text>
            <Text>Already have an account </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login") }>
               <Text> Login!</Text></TouchableOpacity>
        </View>
    )
}