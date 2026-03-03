import ForgotPasswordForm from "@/components/ui/ForgetPasswordForm";
import { forStyle } from "@/styles/ForgetStyles";
import { View } from "react-native";

export default function ForgetPassworScreen({navigation}){
    return(
        <View style={forStyle.forPage}>
            <ForgotPasswordForm navigation={navigation} />
        </View>
    ) 
}