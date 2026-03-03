import { Text, TouchableOpacity, View } from "react-native";

export default function Login({navigation}){
    return(
        <View>
            <Text>Don't have an account </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register") }>
                           <Text> Register!</Text></TouchableOpacity>
        </View>
    )
}