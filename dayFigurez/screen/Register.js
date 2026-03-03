import { Text, TextInput,TouchableOpacity, View } from "react-native";
import { registerStyle } from "../styles/RegisterStyles";
import AdvancedForm from "@/components/AdvanceForm";

export default function Register({navigation}){
    return(
        <View style={registerStyle.regPage}>
            <AdvancedForm navigation={navigation} />
        </View>
    )
}