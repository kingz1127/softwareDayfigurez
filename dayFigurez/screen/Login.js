import LoginForm from "@/components/LoginForm";
import { loginStyle } from "@/styles/LoginStyles";
import { View } from "react-native";

export default function Login({ navigation }) {
    return(
        <View style={loginStyle.logPage}>
            <LoginForm navigation={navigation} />
        </View>
    )
}